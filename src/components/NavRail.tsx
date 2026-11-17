import React from 'react';

interface NavItem {
  id: string;
  label: string;
  active?: boolean;
  icon: React.ReactNode;
}

const navItems: NavItem[] = [
  {
    id: 'zhisou',
    label: '智搜',
    icon: (
      <svg viewBox="0 0 20 20" className="w-[17px] h-[17px]" fill="none" stroke="currentColor" strokeWidth="1.5">
        <circle cx="9" cy="9" r="5.5" />
        <path d="M13.2 13.2L17 17" strokeLinecap="round" />
      </svg>
    ),
  },
  {
    id: 'zhisu',
    label: '智溯',
    active: true,
    icon: (
      <svg viewBox="0 0 20 20" className="w-[17px] h-[17px]" fill="none" stroke="currentColor" strokeWidth="1.5">
        <rect x="2.5" y="3.5" width="15" height="11" rx="1.5" />
        <path d="M2.5 7h15" />
        <path d="M5.5 11.5l2.5-2 2.5 1.8 3.5-2.8" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M7.5 16.5h5" strokeLinecap="round" />
      </svg>
    ),
  },
  {
    id: 'yiyun',
    label: '逸云',
    icon: (
      <svg viewBox="0 0 20 20" className="w-[17px] h-[17px]" fill="none" stroke="currentColor" strokeWidth="1.5">
        <path d="M5.8 15h8.7a3.2 3.2 0 0 0 .5-6.36A4.5 4.5 0 0 0 6.4 7.4 3.5 3.5 0 0 0 5.8 15Z" strokeLinejoin="round" />
      </svg>
    ),
  },
  {
    id: 'daping',
    label: '大屏',
    icon: (
      <svg viewBox="0 0 20 20" className="w-[17px] h-[17px]" fill="none" stroke="currentColor" strokeWidth="1.5">
        <rect x="2.5" y="3.5" width="15" height="10.5" rx="1.2" />
        <path d="M6.5 16.5h7M10 14v2.5" strokeLinecap="round" />
        <path d="M6 10.5V8.5M10 10.5V7M14 10.5V9" strokeLinecap="round" />
      </svg>
    ),
  },
  {
    id: 'cmdb',
    label: 'CMDB',
    icon: (
      <svg viewBox="0 0 20 20" className="w-[17px] h-[17px]" fill="none" stroke="currentColor" strokeWidth="1.5">
        <circle cx="10" cy="4.8" r="2.1" />
        <circle cx="5.2" cy="14.5" r="2.1" />
        <circle cx="14.8" cy="14.5" r="2.1" />
        <path d="M8.8 6.6L6.3 12.6M11.2 6.6l2.5 6M7.3 14.5h5.4" strokeLinecap="round" />
      </svg>
    ),
  },
  {
    id: 'flow',
    label: 'Flow',
    icon: (
      <svg viewBox="0 0 20 20" className="w-[17px] h-[17px]" fill="none" stroke="currentColor" strokeWidth="1.5">
        <circle cx="10" cy="10" r="6.5" />
        <path d="M3.8 8.5c2.2 1.2 4.2 1.2 6.2 0s4-1.2 6.2 0" strokeLinecap="round" />
        <path d="M4.2 12c2.1 1 4 1 5.8 0s3.7-1 5.8 0" strokeLinecap="round" />
      </svg>
    ),
  },
  {
    id: 'tuopu',
    label: '拓扑',
    icon: (
      <svg viewBox="0 0 20 20" className="w-[17px] h-[17px]" fill="none" stroke="currentColor" strokeWidth="1.5">
        <rect x="8.2" y="3" width="3.6" height="3.2" rx="0.6" />
        <rect x="3" y="13.5" width="3.6" height="3.2" rx="0.6" />
        <rect x="13.4" y="13.5" width="3.6" height="3.2" rx="0.6" />
        <path d="M10 6.2V10M4.8 13.5V10h10.4v3.5" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
  },
  {
    id: 'gaojing',
    label: '告警',
    icon: (
      <svg viewBox="0 0 20 20" className="w-[17px] h-[17px]" fill="none" stroke="currentColor" strokeWidth="1.5">
        <path d="M6.5 14v-3.5a3.5 3.5 0 0 1 7 0V14" />
        <path d="M4.5 14h11v2h-11z" strokeLinejoin="round" />
        <path d="M10 3.2V4.8M4.5 6l1.1 1.1M15.5 6l-1.1 1.1" strokeLinecap="round" />
      </svg>
    ),
  },
  {
    id: 'peizhi',
    label: '配置',
    icon: (
      <svg viewBox="0 0 20 20" className="w-[17px] h-[17px]" fill="none" stroke="currentColor" strokeWidth="1.5">
        <path d="M3.5 5.5h13M3.5 10h13M3.5 14.5h13" strokeLinecap="round" />
        <circle cx="7" cy="5.5" r="1.4" fill="#1C2026" />
        <circle cx="13" cy="10" r="1.4" fill="#1C2026" />
        <circle cx="8.5" cy="14.5" r="1.4" fill="#1C2026" />
      </svg>
    ),
  },
  {
    id: 'jiaoyi',
    label: '交易',
    icon: (
      <svg viewBox="0 0 20 20" className="w-[17px] h-[17px]" fill="none" stroke="currentColor" strokeWidth="1.5">
        <path d="M5 3.5h10v13l-2-1.3-1.5 1.3L10 15.2l-1.5 1.3L7 15.2l-2 1.3v-13Z" strokeLinejoin="round" />
        <path d="M8 7.5l2 2.2 2-2.2M8 10.5h4M10 9.7v3.1" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
  },
  {
    id: 'fanghuoqiang',
    label: '防火墙',
    icon: (
      <svg viewBox="0 0 20 20" className="w-[17px] h-[17px]" fill="none" stroke="currentColor" strokeWidth="1.4">
        <rect x="3" y="4.5" width="14" height="11" rx="1" />
        <path d="M3 8.2h14M3 11.8h14M7.5 4.5v3.7M12.5 4.5v3.7M10 8.2v3.6M7.5 11.8v3.7M12.5 11.8v3.7" />
      </svg>
    ),
  },
  {
    id: 'jiema',
    label: '解码',
    icon: (
      <svg viewBox="0 0 20 20" className="w-[17px] h-[17px]" fill="none" stroke="currentColor" strokeWidth="1.5">
        <rect x="3" y="4.5" width="14" height="11" rx="1.5" />
        <path d="M7.5 8L5.5 10l2 2M12.5 8l2 2-2 2M10.7 7.5l-1.4 5" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
  },
  {
    id: 'fuzai',
    label: '负载',
    icon: (
      <svg viewBox="0 0 20 20" className="w-[17px] h-[17px]" fill="none" stroke="currentColor" strokeWidth="1.5">
        <rect x="3.5" y="4" width="13" height="4" rx="0.8" />
        <rect x="3.5" y="10" width="13" height="4" rx="0.8" />
        <path d="M6 6h1.5M6 12h1.5M10 14v2.5M6.5 16.5h7" strokeLinecap="round" />
      </svg>
    ),
  },
  {
    id: 'ai',
    label: 'AI',
    icon: (
      <svg viewBox="0 0 20 20" className="w-[17px] h-[17px]" fill="none" stroke="currentColor" strokeWidth="1.4">
        <polygon points="10,2.5 16.5,6.2 16.5,13.8 10,17.5 3.5,13.8 3.5,6.2" strokeLinejoin="round" />
        <text x="10" y="12.2" textAnchor="middle" fill="currentColor" stroke="none" fontSize="6.5" fontWeight="600" fontFamily="sans-serif">
          AI
        </text>
      </svg>
    ),
  },
  {
    id: 'shipin',
    label: '视频',
    icon: (
      <svg viewBox="0 0 20 20" className="w-[17px] h-[17px]" fill="none" stroke="currentColor" strokeWidth="1.4">
        <path d="M3 9.8s2.8-4.3 7-4.3 7 4.3 7 4.3-2.8 4.3-7 4.3-7-4.3-7-4.3Z" strokeLinejoin="round" />
        <circle cx="10" cy="9.8" r="1.8" />
        <path d="M6 16h8" strokeLinecap="round" />
      </svg>
    ),
  },
];

export const NavRail: React.FC = () => {
  return (
    <aside className="w-[54px] shrink-0 bg-[#1C2026] flex flex-col select-none overflow-y-auto [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
      <nav className="flex flex-col w-full">
        {navItems.map((item) => (
          <button
            key={item.id}
            type="button"
            className={`w-full h-[54px] shrink-0 flex flex-col items-center justify-center gap-[3px] transition-colors cursor-pointer ${
              item.active
                ? 'bg-[#1380F3] text-white'
                : 'text-[#9DA5B4] hover:text-[#D5DBE5] hover:bg-[#252A33]'
            }`}
          >
            {item.icon}
            <span className="text-[11px] leading-none tracking-tight whitespace-nowrap">
              {item.label}
            </span>
          </button>
        ))}
      </nav>
    </aside>
  );
};
