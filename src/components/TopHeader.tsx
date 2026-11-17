import React from 'react';

export const TopHeader: React.FC = () => {
  return (
    <header className="h-[46px] shrink-0 bg-white border-b border-[#E8EAEE] px-5 flex items-center justify-between select-none">
      {/* Left Navigation Tabs */}
      <div className="flex items-center h-full gap-8">
        <button
          type="button"
          className="h-full flex items-center text-[13.5px] text-[#595959] hover:text-[#262626] whitespace-nowrap shrink-0 cursor-pointer"
        >
          流量分析
        </button>
        <button
          type="button"
          className="relative h-full flex items-center text-[13.5px] font-medium text-[#1677FF] whitespace-nowrap shrink-0 cursor-pointer"
        >
          工作台
          <span className="absolute bottom-0 left-0 right-0 h-[2.5px] bg-[#1677FF] rounded-t-[1px]" />
        </button>
      </div>

      {/* Right Time Range Picker & Refresh */}
      <div className="flex items-center gap-2 shrink-0">
        <div className="flex items-center h-[28px]">
          <button
            type="button"
            aria-label="历史时间"
            className="w-[30px] h-full border border-r-0 border-[#D9D9D9] rounded-l-[2px] bg-[#FAFAFA] flex items-center justify-center text-[#8C8C8C] hover:text-[#595959] cursor-pointer"
          >
            <svg viewBox="0 0 16 16" className="w-[13px] h-[13px]" fill="none" stroke="currentColor" strokeWidth="1.3">
              <circle cx="8" cy="8" r="5.8" />
              <path d="M8 4.8v3.4l2.2 1.3" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </button>
          <div className="h-full border border-[#D9D9D9] bg-white px-3 flex items-center text-[12.5px] text-[#333333] tabular-nums whitespace-nowrap">
            2026-10-14 05:00:00 ~ 2026-10-14 06:00:00
          </div>
          <button
            type="button"
            aria-label="查询"
            className="w-[30px] h-full bg-[#1677FF] hover:bg-[#0958D9] text-white rounded-r-[2px] flex items-center justify-center cursor-pointer"
          >
            <svg viewBox="0 0 16 16" className="w-[13px] h-[13px]" fill="none" stroke="currentColor" strokeWidth="1.5">
              <circle cx="7.2" cy="7.2" r="4.3" />
              <path d="M10.5 10.5L13.5 13.5" strokeLinecap="round" />
            </svg>
          </button>
        </div>

        <button
          type="button"
          aria-label="刷新"
          className="w-[28px] h-[28px] border border-[#D9D9D9] rounded-[2px] bg-white hover:bg-[#FAFAFA] flex items-center justify-center text-[#595959] cursor-pointer"
        >
          <svg viewBox="0 0 16 16" className="w-[13px] h-[13px]" fill="none" stroke="currentColor" strokeWidth="1.35">
            <path d="M13 8a5 5 0 1 1-1.35-3.42" strokeLinecap="round" />
            <path d="M13 2.8v2.5h-2.5" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </button>
      </div>
    </header>
  );
};
