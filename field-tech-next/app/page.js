'use client';

import { useState } from 'react';
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid,
  Tooltip, ResponsiveContainer, Cell,
} from 'recharts';
import { kpis, regionFailures, equipFailures, techStats, visits } from '../lib/data';

/* ── Design tokens ───────────────────────────────────────── */
const C = {
  copper:  '#D4834A',
  copperDim: 'rgba(212,131,74,0.15)',
  pass:    '#3DD68C',
  passDim: 'rgba(61,214,140,0.15)',
  fail:    '#F06060',
  failDim: 'rgba(240,96,96,0.15)',
  card:    '#17202E',
  elevated:'#1E2A3A',
  border:  'rgba(255,255,255,0.06)',
  text1:   '#EDF0F5',
  text2:   '#7A8699',
  text3:   '#4A5568',
};

/* ── Custom tooltip ───────────────────────────────────────── */
function CustomTooltip({ active, payload, label }) {
  if (!active || !payload?.length) return null;
  return (
    <div style={{
      background: C.elevated,
      border: `1px solid ${C.border}`,
      borderRadius: 10,
      padding: '10px 16px',
      boxShadow: '0 8px 32px rgba(0,0,0,0.5)',
    }}>
      <p style={{ color: C.text2, fontSize: 11, marginBottom: 4, fontFamily: 'Inter' }}>{label}</p>
      <p style={{ color: C.copper, fontSize: 16, fontWeight: 600, fontFamily: 'IBM Plex Mono' }}>
        {payload[0].value} failures
      </p>
    </div>
  );
}

/* ── KPI Card ─────────────────────────────────────────────── */
function KPICard({ label, value, sub, accent }) {
  return (
    <div
      className="kpi-card"
      style={{
        background: `linear-gradient(135deg, ${C.card} 0%, #131c28 100%)`,
        border: `1px solid ${C.border}`,
        borderRadius: 16,
        padding: '28px 24px',
        position: 'relative',
        overflow: 'hidden',
        flex: 1,
        minWidth: 0,
        boxShadow: '0 1px 3px rgba(0,0,0,0.4), 0 4px 16px rgba(0,0,0,0.3), 0 0 0 1px rgba(255,255,255,0.04)',
      }}
    >
      {/* Accent top bar */}
      <div style={{
        position: 'absolute', top: 0, left: 24, right: 24, height: 2,
        background: `linear-gradient(90deg, ${accent}, transparent)`,
        borderRadius: '0 0 2px 2px',
      }} />
      {/* Glow blob */}
      <div style={{
        position: 'absolute', top: -20, right: -20, width: 80, height: 80,
        borderRadius: '50%',
        background: `radial-gradient(circle, ${accent}22 0%, transparent 70%)`,
        pointerEvents: 'none',
      }} />
      <p style={{
        fontFamily: 'Inter',
        fontSize: 11,
        fontWeight: 500,
        letterSpacing: '0.08em',
        textTransform: 'uppercase',
        color: C.text2,
        marginBottom: 12,
      }}>{label}</p>
      <p style={{
        fontFamily: 'IBM Plex Mono',
        fontSize: 40,
        fontWeight: 500,
        color: accent,
        lineHeight: 1,
        marginBottom: 8,
        letterSpacing: '-0.03em',
      }}>{value}</p>
      {sub && (
        <p style={{ fontFamily: 'Inter', fontSize: 12, color: C.text3 }}>{sub}</p>
      )}
    </div>
  );
}

/* ── Section header ───────────────────────────────────────── */
function SectionTitle({ children }) {
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 20 }}>
      <div style={{ width: 3, height: 18, background: C.copper, borderRadius: 2 }} />
      <h2 style={{
        fontFamily: 'Playfair Display',
        fontSize: 18,
        fontWeight: 600,
        color: C.text1,
        letterSpacing: '-0.02em',
      }}>{children}</h2>
    </div>
  );
}

/* ── Chart Card ───────────────────────────────────────────── */
function ChartCard({ title, data, dataKey, nameKey, barColor }) {
  return (
    <div style={{
      background: C.card,
      border: `1px solid ${C.border}`,
      borderRadius: 16,
      padding: '28px 24px',
      flex: 1,
      minWidth: 0,
      boxShadow: '0 1px 3px rgba(0,0,0,0.4), 0 8px 24px rgba(0,0,0,0.3)',
    }}>
      <SectionTitle>{title}</SectionTitle>
      <ResponsiveContainer width="100%" height={240}>
        <BarChart data={data} barCategoryGap="35%" margin={{ top: 4, right: 4, bottom: 0, left: -12 }}>
          <CartesianGrid vertical={false} stroke="rgba(255,255,255,0.04)" />
          <XAxis
            dataKey={nameKey}
            tick={{ fontFamily: 'Inter', fontSize: 12, fill: C.text2 }}
            axisLine={false}
            tickLine={false}
          />
          <YAxis
            tick={{ fontFamily: 'IBM Plex Mono', fontSize: 11, fill: C.text3 }}
            axisLine={false}
            tickLine={false}
            allowDecimals={false}
          />
          <Tooltip content={<CustomTooltip />} cursor={{ fill: 'rgba(255,255,255,0.03)' }} />
          <Bar dataKey={dataKey} radius={[6, 6, 0, 0]}>
            {data.map((entry, i) => (
              <Cell
                key={i}
                fill={barColor}
                style={{ filter: `drop-shadow(0 0 6px ${barColor}44)` }}
              />
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}

/* ── Pass rate ring ───────────────────────────────────────── */
function PassRing({ rate }) {
  const r = 36;
  const circ = 2 * Math.PI * r;
  const dash = (rate / 100) * circ;
  return (
    <svg width={90} height={90} viewBox="0 0 90 90" style={{ transform: 'rotate(-90deg)' }}>
      <circle cx={45} cy={45} r={r} fill="none" stroke={C.elevated} strokeWidth={6} />
      <circle
        cx={45} cy={45} r={r} fill="none"
        stroke={rate >= 60 ? C.pass : C.fail}
        strokeWidth={6}
        strokeDasharray={`${dash} ${circ}`}
        strokeLinecap="round"
        style={{ filter: `drop-shadow(0 0 4px ${rate >= 60 ? C.pass : C.fail}88)` }}
      />
    </svg>
  );
}

/* ── Main page ────────────────────────────────────────────── */
export default function Dashboard() {
  const [showRaw, setShowRaw] = useState(false);

  return (
    <div style={{
      minHeight: '100vh',
      background: '#0B0E14',
      position: 'relative',
      overflow: 'hidden',
    }}>

      {/* Background radial gradients */}
      <div style={{
        position: 'fixed', inset: 0, pointerEvents: 'none', zIndex: 0,
        background: `
          radial-gradient(ellipse 70% 50% at 15% 0%, rgba(212,131,74,0.07) 0%, transparent 60%),
          radial-gradient(ellipse 50% 40% at 85% 100%, rgba(61,214,140,0.04) 0%, transparent 60%),
          radial-gradient(ellipse 60% 60% at 50% 50%, rgba(30,42,58,0.5) 0%, transparent 80%)
        `,
      }} />

      <div style={{ position: 'relative', zIndex: 1, maxWidth: 1200, margin: '0 auto', padding: '40px 24px 80px' }}>

        {/* ── Header ─────────────────────────────────────────── */}
        <header style={{ marginBottom: 48 }}>
          <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', flexWrap: 'wrap', gap: 16 }}>
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 10 }}>
                <div style={{
                  width: 32, height: 32, borderRadius: 8,
                  background: `linear-gradient(135deg, ${C.copper}, #a85e2e)`,
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  boxShadow: `0 0 16px rgba(212,131,74,0.3)`,
                  fontSize: 16,
                }}>⚙</div>
                <span style={{
                  fontFamily: 'Inter', fontSize: 12, fontWeight: 500,
                  letterSpacing: '0.1em', textTransform: 'uppercase',
                  color: C.copper,
                }}>RASCO Operations</span>
              </div>
              <h1 style={{
                fontFamily: 'Playfair Display',
                fontSize: 'clamp(28px, 5vw, 44px)',
                fontWeight: 700,
                color: C.text1,
                letterSpacing: '-0.03em',
                lineHeight: 1.1,
                marginBottom: 10,
              }}>Field Technician<br />Visit Dashboard</h1>
              <p style={{ fontFamily: 'Inter', fontSize: 14, color: C.text2, lineHeight: 1.7 }}>
                Operations performance overview · Jan – Feb 2024
              </p>
            </div>
            <div style={{
              background: C.card,
              border: `1px solid ${C.border}`,
              borderRadius: 12,
              padding: '12px 18px',
              display: 'flex',
              alignItems: 'center',
              gap: 8,
              alignSelf: 'flex-start',
            }}>
              <div style={{ width: 8, height: 8, borderRadius: '50%', background: C.pass, boxShadow: `0 0 8px ${C.pass}` }} />
              <span style={{ fontFamily: 'Inter', fontSize: 12, color: C.text2 }}>Live data</span>
            </div>
          </div>
        </header>

        {/* ── KPI Row ────────────────────────────────────────── */}
        <section style={{ display: 'flex', gap: 16, marginBottom: 32, flexWrap: 'wrap' }}>
          <KPICard label="Total Visits"  value={kpis.total}   sub="Jan – Feb 2024"       accent={C.copper} />
          <KPICard label="Passed"        value={kpis.passes}  sub={`${kpis.passRate}% pass rate`} accent={C.pass} />
          <KPICard label="Failed"        value={kpis.fails}   sub="Require follow-up"    accent={C.fail} />
          <KPICard label="Pass Rate"     value={`${kpis.passRate}%`} sub="Fleet average"  accent={C.copper} />
        </section>

        {/* Divider */}
        <div style={{ height: 1, background: C.border, marginBottom: 32 }} />

        {/* ── Charts Row ─────────────────────────────────────── */}
        <section style={{ display: 'flex', gap: 20, marginBottom: 32, flexWrap: 'wrap' }}>
          <ChartCard
            title="Failures by Region"
            data={regionFailures}
            dataKey="failures"
            nameKey="region"
            barColor={C.fail}
          />
          <ChartCard
            title="Failures by Equipment Type"
            data={equipFailures}
            dataKey="failures"
            nameKey="type"
            barColor="#E8925A"
          />
        </section>

        {/* ── Technician Table ───────────────────────────────── */}
        <section style={{ marginBottom: 32 }}>
          <div style={{
            background: C.card,
            border: `1px solid ${C.border}`,
            borderRadius: 16,
            overflow: 'hidden',
            boxShadow: '0 1px 3px rgba(0,0,0,0.4), 0 8px 24px rgba(0,0,0,0.3)',
          }}>
            {/* Table header */}
            <div style={{
              padding: '24px 28px 20px',
              borderBottom: `1px solid ${C.border}`,
              background: `linear-gradient(90deg, rgba(212,131,74,0.06) 0%, transparent 60%)`,
            }}>
              <SectionTitle>Technician Performance</SectionTitle>
            </div>

            {/* Column headers */}
            <div style={{
              display: 'grid',
              gridTemplateColumns: '1.8fr 1fr 1fr 1fr 1.2fr 1.4fr',
              padding: '12px 28px',
              borderBottom: `1px solid ${C.border}`,
            }}>
              {['Technician', 'Visits', 'Passed', 'Failed', 'Avg. Duration', 'Pass Rate'].map(h => (
                <span key={h} style={{
                  fontFamily: 'Inter', fontSize: 11, fontWeight: 500,
                  letterSpacing: '0.06em', textTransform: 'uppercase',
                  color: C.text3,
                }}>{h}</span>
              ))}
            </div>

            {/* Rows */}
            {techStats.map((t, i) => (
              <div
                key={t.name}
                className="table-row"
                style={{
                  display: 'grid',
                  gridTemplateColumns: '1.8fr 1fr 1fr 1fr 1.2fr 1.4fr',
                  padding: '18px 28px',
                  borderBottom: i < techStats.length - 1 ? `1px solid ${C.border}` : 'none',
                  alignItems: 'center',
                }}
              >
                {/* Name */}
                <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                  <div style={{
                    width: 34, height: 34, borderRadius: '50%',
                    background: `linear-gradient(135deg, ${C.elevated}, #253345)`,
                    border: `1px solid ${C.border}`,
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    fontFamily: 'Inter', fontSize: 12, fontWeight: 600, color: C.copper,
                    flexShrink: 0,
                  }}>
                    {t.name.split(' ').map(n => n[0]).join('')}
                  </div>
                  <span style={{ fontFamily: 'Inter', fontSize: 14, fontWeight: 500, color: C.text1 }}>{t.name}</span>
                </div>

                {/* Visits */}
                <span style={{ fontFamily: 'IBM Plex Mono', fontSize: 14, color: C.text1 }}>{t.visits}</span>

                {/* Passes */}
                <span style={{ fontFamily: 'IBM Plex Mono', fontSize: 14, color: C.pass }}>{t.passes}</span>

                {/* Fails */}
                <span style={{ fontFamily: 'IBM Plex Mono', fontSize: 14, color: C.fail }}>{t.fails}</span>

                {/* Avg duration */}
                <span style={{ fontFamily: 'IBM Plex Mono', fontSize: 14, color: C.text2 }}>{t.avgDuration} min</span>

                {/* Pass rate with ring */}
                <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                  <div style={{ position: 'relative', width: 42, height: 42 }}>
                    <PassRing rate={t.passRate} />
                    <div style={{
                      position: 'absolute', inset: 0,
                      display: 'flex', alignItems: 'center', justifyContent: 'center',
                    }}>
                      <span style={{
                        fontFamily: 'IBM Plex Mono',
                        fontSize: 9,
                        fontWeight: 500,
                        color: t.passRate >= 60 ? C.pass : C.fail,
                      }}>{t.passRate}%</span>
                    </div>
                  </div>
                  <div style={{ flex: 1 }}>
                    <div style={{
                      height: 4, background: C.elevated, borderRadius: 2, overflow: 'hidden',
                    }}>
                      <div style={{
                        width: `${t.passRate}%`, height: '100%', borderRadius: 2,
                        background: t.passRate >= 60
                          ? `linear-gradient(90deg, ${C.pass}, #2ab875)`
                          : `linear-gradient(90deg, ${C.fail}, #d04040)`,
                        transition: 'width 0.8s cubic-bezier(0.34,1.56,0.64,1)',
                        boxShadow: `0 0 6px ${t.passRate >= 60 ? C.pass : C.fail}66`,
                      }} />
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* ── Raw Data Expander ──────────────────────────────── */}
        <section>
          <button
            onClick={() => setShowRaw(v => !v)}
            style={{
              display: 'flex', alignItems: 'center', gap: 10,
              background: C.card,
              border: `1px solid ${C.border}`,
              borderRadius: 10,
              padding: '12px 20px',
              cursor: 'pointer',
              color: C.text2,
              fontFamily: 'Inter',
              fontSize: 13,
              fontWeight: 500,
              width: '100%',
              justifyContent: 'space-between',
              transition: 'background 0.15s ease',
            }}
            onMouseEnter={e => e.currentTarget.style.background = C.elevated}
            onMouseLeave={e => e.currentTarget.style.background = C.card}
          >
            <span>View raw visit data ({visits.length} records)</span>
            <span style={{
              display: 'inline-block',
              transform: showRaw ? 'rotate(180deg)' : 'rotate(0deg)',
              transition: 'transform 0.2s ease',
            }}>▾</span>
          </button>

          {showRaw && (
            <div style={{
              marginTop: 12,
              background: C.card,
              border: `1px solid ${C.border}`,
              borderRadius: 12,
              overflow: 'auto',
            }}>
              <table style={{ width: '100%', borderCollapse: 'collapse', fontFamily: 'IBM Plex Mono', fontSize: 12 }}>
                <thead>
                  <tr style={{ background: C.elevated }}>
                    {['Visit ID','Date','Technician','Region','Equipment','Result','Duration','Site'].map(h => (
                      <th key={h} style={{
                        padding: '12px 16px',
                        textAlign: 'left',
                        color: C.text3,
                        fontWeight: 500,
                        fontSize: 10,
                        letterSpacing: '0.06em',
                        textTransform: 'uppercase',
                        borderBottom: `1px solid ${C.border}`,
                        whiteSpace: 'nowrap',
                      }}>{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {visits.map((v, i) => (
                    <tr
                      key={v.Visit_ID}
                      className="table-row"
                      style={{ borderBottom: `1px solid ${C.border}` }}
                    >
                      {[v.Visit_ID, v.Date, v.Technician, v.Region, v.Equipment_Type].map((val, j) => (
                        <td key={j} style={{ padding: '10px 16px', color: C.text2 }}>{val}</td>
                      ))}
                      <td style={{ padding: '10px 16px' }}>
                        <span style={{
                          display: 'inline-flex', alignItems: 'center', gap: 6,
                          padding: '2px 10px', borderRadius: 20,
                          background: v.Test_Result === 'Pass' ? C.passDim : C.failDim,
                          color: v.Test_Result === 'Pass' ? C.pass : C.fail,
                          fontSize: 11, fontWeight: 500,
                        }}>
                          {v.Test_Result === 'Pass' ? '✓' : '✗'} {v.Test_Result}
                        </span>
                      </td>
                      <td style={{ padding: '10px 16px', color: C.text2 }}>{v.Duration_Minutes} min</td>
                      <td style={{ padding: '10px 16px', color: C.text3 }}>{v.Site_ID}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </section>

        {/* Footer */}
        <footer style={{
          marginTop: 64,
          borderTop: `1px solid ${C.border}`,
          paddingTop: 24,
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          flexWrap: 'wrap',
          gap: 8,
        }}>
          <span style={{ fontFamily: 'Inter', fontSize: 12, color: C.text3 }}>
            RASCO Field Operations · Q1 2024
          </span>
          <span style={{ fontFamily: 'IBM Plex Mono', fontSize: 11, color: C.text3 }}>
            30 visits · 4 technicians · 4 regions
          </span>
        </footer>

      </div>
    </div>
  );
}
