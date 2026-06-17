import './globals.css';

export const metadata = {
  title: 'Field Technician Dashboard — RASCO Operations',
  description: 'Visit performance overview for RASCO field operations.',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="grain">{children}</body>
    </html>
  );
}
