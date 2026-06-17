import streamlit as st
import pandas as pd
import plotly.express as px

# ── Page config ──────────────────────────────────────────────────────────────
st.set_page_config(
    page_title="Field Technician Dashboard",
    page_icon="🔧",
    layout="wide",
)

# ── Load data ─────────────────────────────────────────────────────────────────
@st.cache_data
def load_data():
    return pd.read_csv("Data/rasco_data.csv")

df = load_data()

# ── Header ────────────────────────────────────────────────────────────────────
st.title("🔧 Field Technician Visit Dashboard")
st.markdown("**RASCO Operations — Visit Performance Overview**")
st.divider()

# ── KPI Row: Pass / Fail / Total ──────────────────────────────────────────────
total   = len(df)
passes  = (df["Test_Result"] == "Pass").sum()
fails   = (df["Test_Result"] == "Fail").sum()
pass_pct = round(passes / total * 100, 1)
fail_pct = round(fails  / total * 100, 1)

col1, col2, col3, col4 = st.columns(4)

col1.metric("Total Visits", total)
col2.metric("✅ Passed", passes, f"{pass_pct}% of visits")
col3.metric("❌ Failed",  fails,  f"-{fail_pct}% of visits", delta_color="inverse")
col4.metric("Pass Rate", f"{pass_pct}%")

st.divider()

# ── Charts Row ────────────────────────────────────────────────────────────────
left, right = st.columns(2)

# --- Failures by Region ---
with left:
    st.subheader("Failures by Region")
    region_fails = (
        df[df["Test_Result"] == "Fail"]
        .groupby("Region", as_index=False)
        .size()
        .rename(columns={"size": "Failures"})
        .sort_values("Failures", ascending=False)
    )
    fig_region = px.bar(
        region_fails,
        x="Region",
        y="Failures",
        color="Failures",
        color_continuous_scale="Reds",
        text="Failures",
    )
    fig_region.update_traces(textposition="outside")
    fig_region.update_layout(
        coloraxis_showscale=False,
        plot_bgcolor="rgba(0,0,0,0)",
        paper_bgcolor="rgba(0,0,0,0)",
        yaxis_title="Number of Failures",
        margin=dict(t=20),
    )
    st.plotly_chart(fig_region, use_container_width=True)

# --- Failures by Equipment Type ---
with right:
    st.subheader("Failures by Equipment Type")
    equip_fails = (
        df[df["Test_Result"] == "Fail"]
        .groupby("Equipment_Type", as_index=False)
        .size()
        .rename(columns={"size": "Failures"})
        .sort_values("Failures", ascending=False)
    )
    fig_equip = px.bar(
        equip_fails,
        x="Equipment_Type",
        y="Failures",
        color="Failures",
        color_continuous_scale="Oranges",
        text="Failures",
    )
    fig_equip.update_traces(textposition="outside")
    fig_equip.update_layout(
        coloraxis_showscale=False,
        plot_bgcolor="rgba(0,0,0,0)",
        paper_bgcolor="rgba(0,0,0,0)",
        yaxis_title="Number of Failures",
        xaxis_title="Equipment Type",
        margin=dict(t=20),
    )
    st.plotly_chart(fig_equip, use_container_width=True)

st.divider()

# ── Technician Table ──────────────────────────────────────────────────────────
st.subheader("Average Visit Duration by Technician")

tech_stats = (
    df.groupby("Technician")
    .agg(
        Total_Visits=("Visit_ID", "count"),
        Passes=("Test_Result", lambda x: (x == "Pass").sum()),
        Fails=("Test_Result", lambda x: (x == "Fail").sum()),
        Avg_Duration_Min=("Duration_Minutes", "mean"),
    )
    .reset_index()
)
tech_stats["Avg_Duration_Min"] = tech_stats["Avg_Duration_Min"].round(1)
tech_stats["Pass Rate %"] = (
    (tech_stats["Passes"] / tech_stats["Total_Visits"] * 100).round(1)
)
tech_stats = tech_stats.rename(columns={
    "Technician":       "Technician",
    "Total_Visits":     "Total Visits",
    "Passes":           "Passes ✅",
    "Fails":            "Fails ❌",
    "Avg_Duration_Min": "Avg Duration (min)",
    "Pass Rate %":      "Pass Rate %",
})

st.dataframe(
    tech_stats,
    use_container_width=True,
    hide_index=True,
)

# ── Raw data expander ─────────────────────────────────────────────────────────
with st.expander("View raw data"):
    st.dataframe(df, use_container_width=True, hide_index=True)
