import React from 'react';
import { CardHeader } from './CardHeader';
import { DataSummaryBox } from './DataSummaryBox';

interface ProtocolRow {
  name: string;
  shortName: string;
  traffic: string;
  percent: number;
  percentText: string;
  color: string;
  labelColor: string;
}

const protocolRows: ProtocolRow[] = [
  {
    name: 'TCP_Other',
    shortName: 'TCP_Other',
    traffic: '48.20 GB',
    percent: 74.53,
    percentText: '74.53%',
    color: '#3B8BF6',
    labelColor: '#3B8BF6',
  },
  {
    name: '副本-HTTP App1',
    shortName: '副本-HTTP...',
    traffic: '5.79 GB',
    percent: 13.79,
    percentText: '13.79%',
    color: '#67C23A',
    labelColor: '#67C23A',
  },
  {
    name: 'SSL_l7',
    shortName: 'SSL_l7',
    traffic: '3.70 GB',
    percent: 5.72,
    percentText: '5.72%',
    color: '#F7B500',
    labelColor: '#E6A23C',
  },
  {
    name: 'vpn',
    shortName: 'vpn',
    traffic: '2.14 GB',
    percent: 3.31,
    percentText: '3.31%',
    color: '#FF5252',
    labelColor: '#FF5252',
  },
  {
    name: 'SSH',
    shortName: 'SSH',
    traffic: '1.72 GB',
    percent: 2.65,
    percentText: '2.65%',
    color: '#47C1FF',
    labelColor: '#36B3F5',
  },
];

// Donut geometry helpers
const CX = 152;
const CY = 104;
const OUTER_R = 58;
const INNER_R = 34;

function polarToCartesian(cx: number, cy: number, r: number, angleDeg: number) {
  const rad = ((angleDeg - 90) * Math.PI) / 180;
  return {
    x: cx + r * Math.cos(rad),
    y: cy + r * Math.sin(rad),
  };
}

function describeDonutSlice(
  cx: number,
  cy: number,
  outerR: number,
  innerR: number,
  startAngle: number,
  endAngle: number
): string {
  const outerStart = polarToCartesian(cx, cy, outerR, startAngle);
  const outerEnd = polarToCartesian(cx, cy, outerR, endAngle);
  const innerEnd = polarToCartesian(cx, cy, innerR, endAngle);
  const innerStart = polarToCartesian(cx, cy, innerR, startAngle);
  const largeArcFlag = endAngle - startAngle <= 180 ? '0' : '1';

  return [
    'M',
    outerStart.x.toFixed(2),
    outerStart.y.toFixed(2),
    'A',
    outerR,
    outerR,
    0,
    largeArcFlag,
    1,
    outerEnd.x.toFixed(2),
    outerEnd.y.toFixed(2),
    'L',
    innerEnd.x.toFixed(2),
    innerEnd.y.toFixed(2),
    'A',
    innerR,
    innerR,
    0,
    largeArcFlag,
    0,
    innerStart.x.toFixed(2),
    innerStart.y.toFixed(2),
    'Z',
  ].join(' ');
}

export interface ProtocolDistributionCardProps {
  title?: string;
  topology?: string;
  showSummary?: boolean;
  onMoreClick?: () => void;
}

export const ProtocolDistributionCard: React.FC<ProtocolDistributionCardProps> = ({
  title = '应用协议分布占比',
  topology = 'DataCenter-SH_Interface 1',
  showSummary = true,
  onMoreClick,
}) => {
  // Build slices starting at 0 deg (12 o'clock)
  let currentAngle = 0;
  const slices = protocolRows.map((row) => {
    const sweep = (row.percent / 100) * 360;
    const startAngle = currentAngle;
    const endAngle = currentAngle + sweep;
    currentAngle = endAngle;
    return {
      ...row,
      startAngle,
      endAngle,
      path: describeDonutSlice(CX, CY, OUTER_R, INNER_R, startAngle, endAngle),
    };
  });

  // Exact callout leader lines matching screenshot placement
  const tcpAnchor = polarToCartesian(CX, CY, OUTER_R, 148);
  const httpAnchor = polarToCartesian(CX, CY, OUTER_R, 286);
  const sslAnchor = polarToCartesian(CX, CY, OUTER_R, 325);
  const vpnAnchor = polarToCartesian(CX, CY, OUTER_R, 344);
  const sshAnchor = polarToCartesian(CX, CY, OUTER_R, 355);

  return (
    <section className="bg-white rounded-[3px] border border-[#EAECEF] shadow-[0_1px_2px_rgba(0,0,0,0.02)] px-4 pt-3 pb-4">
      <CardHeader title={title} onMoreClick={onMoreClick} />

      {/* Two-Column Split: Donut Chart + Protocol Table */}
      <div className="flex items-center gap-6 pt-1 pb-2">
        {/* Left: Donut Chart with Callouts */}
        <div className="w-[340px] shrink-0 flex items-center justify-center">
          <svg viewBox="0 0 340 202" className="w-[340px] h-[202px] overflow-visible select-none">
            {slices.map((s) => (
              <path key={s.name} d={s.path} fill={s.color} stroke="#FFFFFF" strokeWidth="0.6" />
            ))}

            {/* 1. TCP_Other 74.53% (Bottom-right) */}
            <polyline
              points={`${tcpAnchor.x.toFixed(1)},${tcpAnchor.y.toFixed(1)} 198,176 310,176`}
              fill="none"
              stroke="#3B8BF6"
              strokeWidth="1"
            />
            <text x="200" y="170" fontSize="11.5" fill="#333333">
              TCP_Other{' '}
              <tspan fill="#3B8BF6" className="tabular-nums">
                74.53%
              </tspan>
            </text>

            {/* 2. 副本-HTTP... (Left) */}
            <polyline
              points={`${httpAnchor.x.toFixed(1)},${httpAnchor.y.toFixed(1)} 82,86 12,86`}
              fill="none"
              stroke="#67C23A"
              strokeWidth="1"
            />
            <text x="12" y="80" fontSize="11.5" fill="#333333">
              副本-HTTP...
            </text>

            {/* 3. SSL_l7 5.72% (Upper-left) */}
            <polyline
              points={`${sslAnchor.x.toFixed(1)},${sslAnchor.y.toFixed(1)} 104,54 24,54`}
              fill="none"
              stroke="#F7B500"
              strokeWidth="1"
            />
            <text x="24" y="48" fontSize="11.5" fill="#333333">
              SSL_l7{' '}
              <tspan fill="#E6A23C" className="tabular-nums">
                5.72%
              </tspan>
            </text>

            {/* 4. vpn 3.31% (Top-left) */}
            <polyline
              points={`${vpnAnchor.x.toFixed(1)},${vpnAnchor.y.toFixed(1)} 124,25 56,25`}
              fill="none"
              stroke="#FF5252"
              strokeWidth="1"
            />
            <text x="56" y="19" fontSize="11.5" fill="#333333">
              vpn{' '}
              <tspan fill="#FF5252" className="tabular-nums">
                3.31%
              </tspan>
            </text>

            {/* 5. SSH 2.65% (Top-right) */}
            <polyline
              points={`${sshAnchor.x.toFixed(1)},${sshAnchor.y.toFixed(1)} 154,25 224,25`}
              fill="none"
              stroke="#47C1FF"
              strokeWidth="1"
            />
            <text x="158" y="19" fontSize="11.5" fill="#333333">
              SSH{' '}
              <tspan fill="#36B3F5" className="tabular-nums">
                2.65%
              </tspan>
            </text>
          </svg>
        </div>

        {/* Right: Data Table */}
        <div className="flex-1 min-w-0">
          <table className="w-full border-collapse text-left">
            <thead>
              <tr className="bg-[#F7F8FA] text-[#8C8C8C] text-[12px] h-[34px]">
                <th className="font-normal pl-4 pr-3 w-[44%]">应用名称</th>
                <th className="font-normal px-3 w-[32%]">流量</th>
                <th className="font-normal px-3 w-[24%]">占比</th>
              </tr>
            </thead>
            <tbody className="text-[12.5px] text-[#333333] tabular-nums">
              {protocolRows.map((row) => (
                <tr key={row.name} className="h-[35px] border-b border-[#F2F3F5] hover:bg-[#FAFAFA]">
                  <td className="relative pl-4 pr-3">
                    <span
                      aria-hidden="true"
                      className="absolute left-0 top-[5px] bottom-[5px] w-[3px]"
                      style={{ backgroundColor: row.color }}
                    />
                    {row.name}
                  </td>
                  <td className="px-3 text-[#333333]">{row.traffic}</td>
                  <td className="px-3 text-[#333333]">{row.percentText}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Data Summary */}
      {showSummary && (
        <DataSummaryBox>
          <p className="font-semibold text-[#262626]">
            2026-10-14 05:00:00 ~ 2026-10-14 06:00:00时间段内{topology}链路:
          </p>
          <p>
            流量占比最大的应用为TCP_Other，占比为<strong className="font-semibold text-[#262626]">74.53%</strong>，占比第二的应用为副本-HTTP App1，占比为<strong className="font-semibold text-[#262626]">13.79%</strong>，占比第三的应用为SSL_l7，占比为<strong className="font-semibold text-[#262626]">5.72%</strong>；
          </p>
        </DataSummaryBox>
      )}
    </section>
  );
};
