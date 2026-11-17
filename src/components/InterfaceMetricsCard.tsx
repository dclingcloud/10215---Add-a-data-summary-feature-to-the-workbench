import React from 'react';
import { CardHeader } from './CardHeader';
import { DataSummaryBox } from './DataSummaryBox';

interface Point {
  t: number; // 0..60 minutes
  v: number; // 0..8 GB
}

interface SeriesConfig {
  id: string;
  label: string;
  color: string;
  points: Point[];
  markerValueAt15: number;
}

const seriesList: SeriesConfig[] = [
  {
    id: 'tcp',
    label: 'TCP',
    color: '#38B000',
    markerValueAt15: 6.7,
    points: [
      { t: 0, v: 3.15 },
      { t: 2, v: 4.35 },
      { t: 4, v: 4.05 },
      { t: 6.5, v: 5.65 },
      { t: 8.5, v: 5.05 },
      { t: 10.5, v: 6.15 },
      { t: 12.5, v: 5.55 },
      { t: 14, v: 6.35 },
      { t: 15, v: 6.7 },
      { t: 16, v: 3.65 },
      { t: 17.5, v: 4.55 },
      { t: 19, v: 3.85 },
      { t: 21, v: 4.7 },
      { t: 23.5, v: 3.35 },
      { t: 25, v: 4.05 },
      { t: 27.5, v: 2.85 },
      { t: 29.5, v: 3.05 },
      { t: 31.5, v: 3.7 },
      { t: 34, v: 6.25 },
      { t: 35.2, v: 3.75 },
      { t: 36.2, v: 5.65 },
      { t: 38, v: 2.35 },
      { t: 40, v: 3.45 },
      { t: 42.5, v: 4.25 },
      { t: 44.5, v: 4.65 },
      { t: 46.5, v: 3.85 },
      { t: 48.2, v: 4.85 },
      { t: 50.5, v: 3.25 },
      { t: 52.5, v: 3.75 },
      { t: 54.5, v: 4.65 },
      { t: 56.5, v: 3.9 },
      { t: 58.5, v: 3.35 },
      { t: 60, v: 3.6 },
    ],
  },
  {
    id: 'ipsec',
    label: 'IPSec_ESP',
    color: '#22B8CF',
    markerValueAt15: 2.55,
    points: [
      { t: 0, v: 1.95 },
      { t: 4, v: 2.15 },
      { t: 8, v: 3.25 },
      { t: 11.5, v: 2.3 },
      { t: 15, v: 2.55 },
      { t: 17.5, v: 2.0 },
      { t: 20.5, v: 2.35 },
      { t: 23, v: 1.95 },
      { t: 26, v: 3.55 },
      { t: 29, v: 2.25 },
      { t: 32, v: 2.45 },
      { t: 35, v: 2.35 },
      { t: 38, v: 2.0 },
      { t: 41.5, v: 2.15 },
      { t: 45, v: 4.15 },
      { t: 48.5, v: 3.05 },
      { t: 52, v: 2.4 },
      { t: 55.5, v: 2.75 },
      { t: 58, v: 2.15 },
      { t: 60, v: 1.85 },
    ],
  },
  {
    id: 'udp',
    label: 'UDP',
    color: '#FA8C16',
    markerValueAt15: 2.05,
    points: [
      { t: 0, v: 1.35 },
      { t: 3, v: 2.4 },
      { t: 7, v: 2.05 },
      { t: 11, v: 2.25 },
      { t: 15, v: 2.05 },
      { t: 18, v: 1.3 },
      { t: 21, v: 1.45 },
      { t: 24, v: 1.8 },
      { t: 28, v: 1.25 },
      { t: 32, v: 1.75 },
      { t: 36, v: 1.3 },
      { t: 40, v: 1.45 },
      { t: 43, v: 1.35 },
      { t: 46, v: 2.35 },
      { t: 50, v: 2.0 },
      { t: 54, v: 2.15 },
      { t: 57, v: 1.7 },
      { t: 60, v: 1.4 },
    ],
  },
  {
    id: 'icmp',
    label: 'ICMP',
    color: '#EB2F96',
    markerValueAt15: 4.15,
    points: [
      { t: 0, v: 2.6 },
      { t: 3, v: 3.1 },
      { t: 6, v: 4.45 },
      { t: 9, v: 4.15 },
      { t: 11.5, v: 4.35 },
      { t: 13.5, v: 4.05 },
      { t: 15, v: 4.15 },
      { t: 16.5, v: 3.1 },
      { t: 18.5, v: 3.8 },
      { t: 21, v: 3.25 },
      { t: 23.5, v: 3.95 },
      { t: 25.5, v: 3.65 },
      { t: 28.5, v: 2.3 },
      { t: 31.5, v: 2.8 },
      { t: 34.5, v: 3.75 },
      { t: 37.5, v: 3.3 },
      { t: 41, v: 3.55 },
      { t: 44.5, v: 4.85 },
      { t: 47.5, v: 4.25 },
      { t: 50.5, v: 3.85 },
      { t: 53.5, v: 4.4 },
      { t: 57, v: 4.75 },
      { t: 60, v: 4.0 },
    ],
  },
];

const xLabels = [
  '05:00',
  '05:05',
  '05:10',
  '05:15',
  '05:20',
  '05:25',
  '05:30',
  '05:35',
  '05:40',
  '05:45',
  '05:50',
  '05:55',
  '06:00',
];

const yTicks = [0, 2, 4, 6, 8];

// Chart coordinate constants
const SVG_W = 1000;
const SVG_H = 192;
const PAD_LEFT = 36;
const PAD_RIGHT = 18;
const PAD_TOP = 10;
const PAD_BOTTOM = 26;
const PLOT_W = SVG_W - PAD_LEFT - PAD_RIGHT;
const PLOT_H = SVG_H - PAD_TOP - PAD_BOTTOM;

function toX(t: number): number {
  return PAD_LEFT + (t / 60) * PLOT_W;
}

function toY(v: number): number {
  return PAD_TOP + (1 - v / 8) * PLOT_H;
}

function buildSmoothPath(pts: Point[]): string {
  const coords = pts.map((p) => ({ x: toX(p.t), y: toY(p.v) }));
  if (coords.length < 2) return '';
  let d = `M ${coords[0].x.toFixed(2)} ${coords[0].y.toFixed(2)}`;
  const tension = 0.22;

  for (let i = 0; i < coords.length - 1; i++) {
    const p0 = coords[Math.max(0, i - 1)];
    const p1 = coords[i];
    const p2 = coords[i + 1];
    const p3 = coords[Math.min(coords.length - 1, i + 2)];

    const cp1x = p1.x + (p2.x - p0.x) * tension;
    const cp1y = p1.y + (p2.y - p0.y) * tension;
    const cp2x = p2.x - (p3.x - p1.x) * tension;
    const cp2y = p2.y - (p3.y - p1.y) * tension;

    d += ` C ${cp1x.toFixed(2)} ${cp1y.toFixed(2)}, ${cp2x.toFixed(2)} ${cp2y.toFixed(2)}, ${p2.x.toFixed(2)} ${p2.y.toFixed(2)}`;
  }
  return d;
}

export interface InterfaceMetricsCardProps {
  title?: string;
  visualType?: 'line' | 'bar' | 'table';
  topology?: string;
  metric?: string;
  showSummary?: boolean;
  onMoreClick?: () => void;
}

const barSlots = ['05:00', '05:05', '05:10', '05:15', '05:20', '05:25', '05:30', '05:35', '05:40', '05:45', '05:50', '05:55', '06:00'];

export const InterfaceMetricsCard: React.FC<InterfaceMetricsCardProps> = ({
  title = '接口指标统计图',
  visualType = 'line',
  topology = 'DataCenter-SH_Interface 1',
  metric = '流量(GB)',
  showSummary = true,
  onMoreClick,
}) => {
  const uid = React.useId().replace(/:/g, '');
  const xAt15 = toX(15);
  const yBottom = toY(0);

  return (
    <section className="bg-white rounded-[3px] border border-[#EAECEF] shadow-[0_1px_2px_rgba(0,0,0,0.02)] px-4 pt-3 pb-4">
      <CardHeader title={title} onMoreClick={onMoreClick} />

      {/* Chart Subheader: Y-unit & Legend */}
      <div className="flex items-center justify-between pt-1 pb-1 px-1 select-none">
        <span className="text-[11.5px] text-[#8C8C8C]">{metric}</span>

        <div className="flex items-center gap-5 mr-20 text-[12px] text-[#595959] flex-wrap">
          {seriesList.map((s) => (
            <div key={s.id} className="flex items-center gap-1.5">
              <span className="relative inline-flex items-center justify-center w-[16px] h-[10px]">
                <span
                  className="w-full h-[1.5px] block"
                  style={{ backgroundColor: s.color }}
                />
                <span
                  className="absolute w-[6px] h-[6px] rounded-full bg-white border-[1.5px]"
                  style={{ borderColor: s.color }}
                />
              </span>
              <span>{s.label}</span>
            </div>
          ))}
        </div>

        <span className="w-[20px]" />
      </div>

      {visualType === 'line' && (
        <div className="w-full">
          <svg
            viewBox={`0 0 ${SVG_W} ${SVG_H}`}
            className="w-full h-[192px] block overflow-visible"
            preserveAspectRatio="none"
          >
            <defs>
              {seriesList.map((s) => (
                <linearGradient
                  key={s.id}
                  id={`grad-${uid}-${s.id}`}
                  x1="0"
                  y1="0"
                  x2="0"
                  y2="1"
                >
                  <stop offset="0%" stopColor={s.color} stopOpacity="0.16" />
                  <stop offset="85%" stopColor={s.color} stopOpacity="0.03" />
                  <stop offset="100%" stopColor={s.color} stopOpacity="0.0" />
                </linearGradient>
              ))}
            </defs>

            {/* Horizontal Gridlines & Y Labels */}
            {yTicks.map((tick) => {
              const y = toY(tick);
              return (
                <g key={tick}>
                  <line
                    x1={PAD_LEFT}
                    y1={y}
                    x2={SVG_W - PAD_RIGHT}
                    y2={y}
                    stroke={tick === 0 ? '#D9D9D9' : '#F0F0F0'}
                    strokeWidth="1"
                  />
                  <text
                    x={PAD_LEFT - 10}
                    y={y + 3.5}
                    textAnchor="end"
                    fill="#666666"
                    fontSize="11"
                    className="tabular-nums"
                  >
                    {tick}
                  </text>
                </g>
              );
            })}

            {/* Vertical Dashed Crosshair at 05:15 */}
            <line
              x1={xAt15}
              y1={PAD_TOP}
              x2={xAt15}
              y2={yBottom}
              stroke="#BFBFBF"
              strokeWidth="1"
              strokeDasharray="3 3"
            />

            {/* Area Fills & Lines */}
            {seriesList.map((s) => {
              const linePath = buildSmoothPath(s.points);
              const firstX = toX(s.points[0].t);
              const lastX = toX(s.points[s.points.length - 1].t);
              const areaPath = `${linePath} L ${lastX.toFixed(2)} ${yBottom.toFixed(2)} L ${firstX.toFixed(2)} ${yBottom.toFixed(2)} Z`;

              return (
                <g key={s.id}>
                  <path d={areaPath} fill={`url(#grad-${uid}-${s.id})`} />
                  <path
                    d={linePath}
                    fill="none"
                    stroke={s.color}
                    strokeWidth="1.65"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </g>
              );
            })}

            {/* Crosshair Ring Markers at 05:15 */}
            {seriesList.map((s) => (
              <circle
                key={`marker-${s.id}`}
                cx={xAt15}
                cy={toY(s.markerValueAt15)}
                r="3.8"
                fill="#FFFFFF"
                stroke={s.color}
                strokeWidth="1.8"
              />
            ))}

            {/* X-axis Labels */}
            {xLabels.map((label, idx) => {
              const x = toX(idx * 5);
              return (
                <text
                  key={label}
                  x={x}
                  y={SVG_H - 6}
                  textAnchor="middle"
                  fill="#595959"
                  fontSize="11"
                  className="tabular-nums"
                >
                  {label}
                </text>
              );
            })}
          </svg>
        </div>
      )}

      {visualType === 'bar' && (
        <div className="w-full">
          <svg
            viewBox={`0 0 ${SVG_W} ${SVG_H}`}
            className="w-full h-[192px] block overflow-visible"
            preserveAspectRatio="none"
          >
            {yTicks.map((tick) => {
              const y = toY(tick);
              return (
                <g key={tick}>
                  <line
                    x1={PAD_LEFT}
                    y1={y}
                    x2={SVG_W - PAD_RIGHT}
                    y2={y}
                    stroke={tick === 0 ? '#D9D9D9' : '#F0F0F0'}
                    strokeWidth="1"
                  />
                  <text
                    x={PAD_LEFT - 10}
                    y={y + 3.5}
                    textAnchor="end"
                    fill="#666666"
                    fontSize="11"
                    className="tabular-nums"
                  >
                    {tick}
                  </text>
                </g>
              );
            })}

            {barSlots.map((slot, idx) => {
              const t = idx * 5;
              const centerX = toX(t);
              const barW = 8;
              const vals = seriesList.map((s) => {
                const closest = s.points.reduce((best, p) =>
                  Math.abs(p.t - t) < Math.abs(best.t - t) ? p : best
                );
                return { color: s.color, v: closest.v };
              });

              return (
                <g key={slot}>
                  {vals.map((item, sIdx) => {
                    const bx = centerX - (vals.length * barW) / 2 + sIdx * barW;
                    const by = toY(item.v);
                    const bh = Math.max(0, yBottom - by);
                    return (
                      <rect
                        key={sIdx}
                        x={bx}
                        y={by}
                        width={barW - 1.5}
                        height={bh}
                        rx="1"
                        fill={item.color}
                        fillOpacity="0.88"
                      />
                    );
                  })}
                  <text
                    x={centerX}
                    y={SVG_H - 6}
                    textAnchor="middle"
                    fill="#595959"
                    fontSize="11"
                    className="tabular-nums"
                  >
                    {slot}
                  </text>
                </g>
              );
            })}
          </svg>
        </div>
      )}

      {visualType === 'table' && (
        <div className="pt-1">
          <table className="w-full border-collapse text-left">
            <thead>
              <tr className="bg-[#F7F8FA] text-[#8C8C8C] text-[12px] h-[34px]">
                <th className="font-normal pl-4 pr-3">协议类型</th>
                <th className="font-normal px-3">平均值</th>
                <th className="font-normal px-3">最大值(分钟)</th>
                <th className="font-normal px-3">峰值时间</th>
              </tr>
            </thead>
            <tbody className="text-[12.5px] text-[#333333] tabular-nums">
              {[
                { name: 'TCP', color: '#38B000', avg: '369.66 MB', max: '6.85 GB', time: '11:58:00 ~ 11:59:00' },
                { name: 'IPSec_ESP', color: '#22B8CF', avg: '114.76 MB', max: '6.43 GB', time: '11:58:00 ~ 11:59:00' },
                { name: 'UDP', color: '#FA8C16', avg: '254.17 MB', max: '5.09 GB', time: '10:29:00 ~ 10:30:00' },
                { name: 'ICMP', color: '#EB2F96', avg: '4.44 MB', max: '3.12 GB', time: '10:29:00 ~ 10:30:00' },
              ].map((row) => (
                <tr key={row.name} className="h-[34px] border-b border-[#F2F3F5]">
                  <td className="relative pl-4 pr-3">
                    <span
                      aria-hidden="true"
                      className="absolute left-0 top-[5px] bottom-[5px] w-[3px]"
                      style={{ backgroundColor: row.color }}
                    />
                    {row.name}
                  </td>
                  <td className="px-3">{row.avg}</td>
                  <td className="px-3">{row.max}</td>
                  <td className="px-3 text-[#595959]">{row.time}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Data Summary */}
      {showSummary && (
        <DataSummaryBox>
          <p className="font-semibold text-[#262626]">
            2026-10-14 05:00:00 ~ 2026-10-14 06:00:00时间段内{topology}链路:
          </p>
          <p>
            TCP平均值为<strong className="font-semibold text-[#262626]">369.66MB</strong>，IPSec_ESP平均值为<strong className="font-semibold text-[#262626]">114.76MB</strong>，UDP平均值为<strong className="font-semibold text-[#262626]">254.17MB</strong>，ICMP平均值为<strong className="font-semibold text-[#262626]">4.44MB</strong>；
          </p>
          <p>
            TCP最大值(分钟)发生在2026-10-14 11:58:00至2026-10-14 11:59:00，最大值（分钟）为6.85GB；
          </p>
          <p>
            IPSec_ESP最大值(分钟)发生在2026-10-14 11:58:00至2026-10-14 11:59:00，最大值（分钟）为6.43GB；
          </p>
          <p>
            UDP最大值(分钟)发生在2026-10-14 10:29:00至2026-10-14 10:30:00，最大值（分钟）为5.09GB；
          </p>
          <p>
            ICMP最大值(分钟)发生在2026-10-14 10:29:00至2026-10-14 10:30:00，最大值（分钟）为3.12GB；
          </p>
        </DataSummaryBox>
      )}
    </section>
  );
};
