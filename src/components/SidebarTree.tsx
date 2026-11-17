import React from 'react';

interface TreeGroup {
  id: string;
  label: string;
  items: {
    id: string;
    label: string;
    active?: boolean;
  }[];
}

const treeGroups: TreeGroup[] = [
  {
    id: 'default',
    label: '默认目录',
    items: [
      { id: 'tx-monitor', label: '交易监控', active: true },
      { id: 'custom-drill', label: '自定义视图下钻' },
      { id: 'app-group', label: '应用组' },
    ],
  },
  {
    id: 'test-link',
    label: 'test-应用链路分析',
    items: [
      { id: 'link-analysis', label: '链路分析' },
      { id: 'dedicated-report', label: '专线报表对数' },
    ],
  },
  {
    id: 'cmbc-test',
    label: '中移金科测试',
    items: [{ id: 'jinke-view', label: '金科视图' }],
  },
];

const BlueFolderIcon = () => (
  <svg viewBox="0 0 16 16" className="w-[14px] h-[14px] shrink-0" fill="none">
    <path
      d="M1.5 3.5a1 1 0 0 1 1-1h3.6l1.3 1.5h6.1a1 1 0 0 1 1 1v7.5a1 1 0 0 1-1 1h-11a1 1 0 0 1-1-1v-9Z"
      fill="#1677FF"
    />
    <path d="M1.5 5.5h13" stroke="#FFFFFF" strokeWidth="0.9" strokeOpacity="0.65" />
  </svg>
);

const BlueDocIcon = () => (
  <svg viewBox="0 0 16 16" className="w-[13px] h-[13px] shrink-0" fill="none">
    <rect x="2.5" y="2" width="11" height="12" rx="1.2" fill="#1677FF" />
    <path d="M5 5.5h6M5 8h6M5 10.5h4.2" stroke="#FFFFFF" strokeWidth="1.2" strokeLinecap="round" />
  </svg>
);

const MinusSquareIcon = () => (
  <span className="w-[11px] h-[11px] border border-[#BFBFBF] rounded-[1.5px] bg-white inline-flex items-center justify-center shrink-0">
    <span className="w-[6px] h-[1px] bg-[#8C8C8C]" />
  </span>
);

export const SidebarTree: React.FC = () => {
  return (
    <aside className="w-[228px] shrink-0 bg-white rounded-[3px] border border-[#EAECEF] shadow-[0_1px_2px_rgba(0,0,0,0.02)] flex flex-col select-none">
      {/* Top Tabs */}
      <div className="px-3.5 pt-2.5 pb-2 border-b border-[#F0F0F0] flex items-center gap-4">
        <button
          type="button"
          className="px-2.5 py-1 rounded-[2px] bg-[#E6F4FF] text-[#1677FF] text-[12.5px] font-medium whitespace-nowrap cursor-pointer"
        >
          自定义视图
        </button>
        <button
          type="button"
          className="px-1 py-1 text-[#595959] hover:text-[#262626] text-[12.5px] whitespace-nowrap cursor-pointer"
        >
          场景报表
        </button>
      </div>

      {/* Search & New View */}
      <div className="px-3 pt-3 pb-2 space-y-2.5">
        <div className="h-[28px] border border-[#D9D9D9] rounded-[2px] px-2.5 flex items-center gap-1.5 bg-white">
          <svg viewBox="0 0 16 16" className="w-[13px] h-[13px] text-[#BFBFBF] shrink-0" fill="none" stroke="currentColor" strokeWidth="1.4">
            <circle cx="7" cy="7" r="4.5" />
            <path d="M10.5 10.5L13.5 13.5" strokeLinecap="round" />
          </svg>
          <input
            type="text"
            readOnly
            placeholder="搜索"
            className="w-full text-[12px] text-[#333333] placeholder:text-[#BFBFBF] bg-transparent outline-none"
          />
        </div>

        <button
          type="button"
          className="w-full h-[28px] border border-[#D9D9D9] rounded-[2px] bg-white hover:bg-[#FAFAFA] flex items-center justify-center gap-1.5 text-[12px] text-[#333333] cursor-pointer"
        >
          <span className="w-[12px] h-[12px] rounded-[2px] bg-[#595959] text-white inline-flex items-center justify-center text-[11px] leading-none font-bold">
            +
          </span>
          <span>新建视图</span>
        </button>
      </div>

      {/* Section Header */}
      <div className="px-3 py-2 flex items-center justify-between">
        <span className="text-[12px] font-medium text-[#333333]">自定义视图</span>
        <div className="flex items-center gap-2 text-[#8C8C8C]">
          {/* Clock icon */}
          <button type="button" aria-label="最近视图" className="hover:text-[#595959] cursor-pointer">
            <svg viewBox="0 0 16 16" className="w-[13px] h-[13px]" fill="currentColor">
              <path d="M8 1.5a6.5 6.5 0 1 0 0 13 6.5 6.5 0 0 0 0-13Zm.5 3.3v3.1l2.2 1.3-.6 1-2.8-1.6V4.8h1.2Z" />
            </svg>
          </button>
          {/* Pin / Location icon */}
          <button type="button" aria-label="常用位置" className="hover:text-[#595959] cursor-pointer">
            <svg viewBox="0 0 16 16" className="w-[13px] h-[13px]" fill="currentColor">
              <path d="M8 1.5a4.5 4.5 0 0 0-4.5 4.5c0 3.2 4.5 8.5 4.5 8.5s4.5-5.3 4.5-8.5A4.5 4.5 0 0 0 8 1.5Zm0 6.1a1.6 1.6 0 1 1 0-3.2 1.6 1.6 0 0 1 0 3.2Z" />
            </svg>
          </button>
          {/* Add square icon */}
          <button type="button" aria-label="添加目录" className="hover:text-[#595959] cursor-pointer">
            <svg viewBox="0 0 16 16" className="w-[13px] h-[13px]" fill="currentColor">
              <rect x="2" y="2" width="12" height="12" rx="1.8" />
              <path d="M8 5v6M5 8h6" stroke="#FFFFFF" strokeWidth="1.4" strokeLinecap="round" />
            </svg>
          </button>
        </div>
      </div>

      {/* Tree Navigation */}
      <div className="flex-1 overflow-y-auto pb-4 text-[12.5px]">
        {treeGroups.map((group) => (
          <div key={group.id} className="mb-1">
            {/* Folder Row */}
            <div className="h-[30px] px-3 flex items-center gap-1.5 text-[#333333] hover:bg-[#F5F7FA] cursor-pointer">
              <MinusSquareIcon />
              <BlueFolderIcon />
              <span className="truncate">{group.label}</span>
            </div>

            {/* Child Items */}
            <div className="relative">
              {/* Vertical tree connector line */}
              <span
                aria-hidden="true"
                className="absolute left-[17.5px] top-0 bottom-3 w-[1px] bg-[#E8EAEE]"
              />
              {group.items.map((item) => (
                <div
                  key={item.id}
                  className={`h-[30px] pl-7 pr-3 flex items-center justify-between cursor-pointer ${
                    item.active
                      ? 'bg-[#E6F7FF] text-[#262626]'
                      : 'text-[#333333] hover:bg-[#F5F7FA]'
                  }`}
                >
                  <div className="flex items-center gap-1.5 min-w-0">
                    <BlueDocIcon />
                    <span className="truncate">{item.label}</span>
                  </div>
                  {item.active && (
                    <span className="text-[#8C8C8C] tracking-widest text-[11px] shrink-0 ml-1">
                      ···
                    </span>
                  )}
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </aside>
  );
};
