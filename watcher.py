"""
watcher.py
==========
Background daemon that watches the  inbox/  folder and automatically
triggers the pipeline whenever a new CSV file is dropped there.

How to use:
  1. Open a terminal and run:  python watcher.py
  2. Leave it running in the background.
  3. Drop any CSV file into the  inbox/  folder.
  4. Within a few seconds the pipeline runs automatically.
  5. Press Ctrl+C to stop the watcher.

Requires:  pip install watchdog
"""

import sys
import time
import logging
import threading
from pathlib import Path
from datetime import datetime

# ── Check watchdog is installed before importing anything else ──
try:
    from watchdog.observers import Observer
    from watchdog.events import FileSystemEventHandler
except ImportError:
    print(
        "\n[ERROR]  The 'watchdog' library is not installed.\n"
        "  Fix it by running this command in your terminal:\n\n"
        "      pip install watchdog\n\n"
        "  Then run this script again.\n"
    )
    sys.exit(1)

# ── Import our pipeline ─────────────────────────────────────────
try:
    from customer_pipeline import Pipeline, INBOX_DIR, LOG_DIR, log
except ImportError:
    print(
        "\n[ERROR]  Could not import customer_pipeline.py.\n"
        "  Make sure watcher.py and customer_pipeline.py are in the same folder.\n"
    )
    sys.exit(1)

# ─────────────────────────────────────────────────────────────────
# DEBOUNCE HELPER
# ─────────────────────────────────────────────────────────────────
# When you copy a large file into inbox/, the OS fires several
# "file modified" events as the data streams in.  Without debouncing
# we would trigger the pipeline multiple times for one file.
# The debounce waits until the file has been stable for DEBOUNCE_SECS
# before processing it.

DEBOUNCE_SECS = 3   # seconds of quiet before we treat the file as ready

class _Debouncer:
    """Fires a callback after a file has been stable for DEBOUNCE_SECS."""

    def __init__(self, callback):
        self._callback = callback
        self._timers: dict[str, threading.Timer] = {}
        self._lock = threading.Lock()

    def trigger(self, filepath: str) -> None:
        with self._lock:
            # Cancel any existing timer for this file
            if filepath in self._timers:
                self._timers[filepath].cancel()
            # Set a fresh timer
            t = threading.Timer(DEBOUNCE_SECS, self._fire, args=[filepath])
            self._timers[filepath] = t
            t.start()

    def _fire(self, filepath: str) -> None:
        with self._lock:
            self._timers.pop(filepath, None)
        self._callback(filepath)


# ─────────────────────────────────────────────────────────────────
# FILE SYSTEM EVENT HANDLER
# ─────────────────────────────────────────────────────────────────
class InboxHandler(FileSystemEventHandler):
    """
    Reacts to file-system events inside the  inbox/  folder.

    We care about two events:
      on_created — a brand-new file appeared
      on_moved   — a file was moved/renamed INTO the inbox
                   (common when saving from Excel or another app)
    """

    def __init__(self):
        super().__init__()
        self._pipeline  = Pipeline()
        self._debouncer = _Debouncer(self._handle)

    def on_created(self, event):
        if not event.is_directory and event.src_path.lower().endswith(".csv"):
            log.info(f"[WATCHER]  New file detected: {Path(event.src_path).name}")
            self._debouncer.trigger(event.src_path)

    def on_moved(self, event):
        # Handles the pattern where a temp file is renamed to .csv
        if not event.is_directory and event.dest_path.lower().endswith(".csv"):
            log.info(f"[WATCHER]  File moved in: {Path(event.dest_path).name}")
            self._debouncer.trigger(event.dest_path)

    def _handle(self, filepath: str) -> None:
        """Called once per file after debounce settles."""
        p = Path(filepath)
        if not p.exists():
            log.warning(f"[WATCHER]  File disappeared before processing: {p.name}")
            return

        log.info(f"[WATCHER]  Starting pipeline for: {p.name}")
        try:
            self._pipeline.run(files=[p])
        except Exception as exc:
            log.error(f"[WATCHER]  Pipeline error for '{p.name}': {exc}", exc_info=True)


# ─────────────────────────────────────────────────────────────────
# MAIN  (starts the watcher loop)
# ─────────────────────────────────────────────────────────────────
def main() -> None:
    LOG_DIR.mkdir(parents=True, exist_ok=True)
    INBOX_DIR.mkdir(parents=True, exist_ok=True)

    print(f"""
╔══════════════════════════════════════════════════════╗
║         CUSTOMER PIPELINE  —  FILE WATCHER           ║
╠══════════════════════════════════════════════════════╣
║  Watching:  {str(INBOX_DIR):<40s}║
║  Press Ctrl+C to stop.                               ║
╚══════════════════════════════════════════════════════╝
""")

    log.info("[WATCHER]  Starting — watching inbox/ for new CSV files.")

    handler  = InboxHandler()
    observer = Observer()
    observer.schedule(handler, str(INBOX_DIR), recursive=False)
    observer.start()

    try:
        while True:
            time.sleep(1)
    except KeyboardInterrupt:
        log.info("[WATCHER]  Stopping (Ctrl+C received).")
        observer.stop()

    observer.join()
    log.info("[WATCHER]  Stopped cleanly.")


if __name__ == "__main__":
    main()
