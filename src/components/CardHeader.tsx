import React from 'react';

interface CardHeaderProps {
  title: string;
  onMoreClick?: () => void;
}

export const CardHeader: React.FC<CardHeaderProps> = ({ title, onMoreClick }) => {
  return (
    <div className="flex items-center justify-between gap-2 pb-3 flex-wrap">
      {/* Left: Title + Time Pill + Reset */}
      <div className="flex items-center gap-2.5 min-w-0">
        <h2 className="text-[13.5px] font-medium text-[#262626] whitespace-nowrap truncate">
          {title}
        </h2>
        <span className="bg-[#F2F3F5] text-[#595959] text-[12px] px-2.5 py-[2px] rounded-[2px] tabular-nums whitespace-nowrap">
          2026-10-14 05:00:00 ~ 2026-10-14 06:00:00
        </span>
        <button
          type="button"
          className="flex items-center gap-1 text-[12px] text-[#595959] hover:text-[#1677FF] whitespace-nowrap cursor-pointer shrink-0"
        >
          <svg viewBox="0 0 16 16" className="w-[12.5px] h-[12.5px]" fill="none" stroke="currentColor" strokeWidth="1.4">
            <path d="M13 8a5 5 0 1 1-1.35-3.42" strokeLinecap="round" />
            <path d="M13 2.8v2.5h-2.5" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
          <span>重置</span>
        </button>
      </div>

      {/* Right: Precision + Real-time + Card Action Icons */}
      <div className="flex items-center gap-2.5 text-[12px] text-[#595959] shrink-0">
        <div className="flex items-center gap-1 cursor-pointer">
          <span className="text-[#8C8C8C]">数据精度</span>
          <span className="text-[#262626]">分钟</span>
          <svg viewBox="0 0 10 6" className="w-[7px] h-[4.5px] text-[#8C8C8C]" fill="currentColor">
            <path d="M0 0h10L5 6 0 0Z" />
          </svg>
        </div>

        <span className="h-[12px] w-[1px] bg-[#E5E7EB]" />

        <label className="flex items-center gap-1.5 text-[#333333] cursor-pointer whitespace-nowrap">
          <span className="w-[12px] h-[12px] rounded-[2px] border border-[#D9D9D9] bg-white inline-block" />
          <span>实时更新</span>
        </label>

        {/* Solid Gray Clock Icon */}
        <button
          type="button"
          aria-label="时间设置"
          className="text-[#8C8C8C] hover:text-[#595959] ml-0.5 cursor-pointer"
        >
          <svg viewBox="0 0 16 16" className="w-[13.5px] h-[13.5px]" fill="currentColor">
            <path d="M8 1.5a6.5 6.5 0 1 0 0 13 6.5 6.5 0 0 0 0-13Zm.5 3.3v3.1l2.2 1.3-.6 1-2.8-1.6V4.8h1.2Z" />
          </svg>
        </button>

        {/* More Dots */}
        <button
          type="button"
          onClick={onMoreClick}
          aria-label="编辑图表配置"
          title="编辑图表配置"
          className="text-[#8C8C8C] hover:text-[#1677FF] tracking-wider text-[12px] leading-none cursor-pointer"
        >
          ···
        </button>

        {/* Indent / Collapse List Icon */}
        <button
          type="button"
          aria-label="布局选项"
          className="text-[#8C8C8C] hover:text-[#595959] cursor-pointer"
        >
          <svg viewBox="0 0 16 16" className="w-[13px] h-[13px]" fill="none" stroke="currentColor" strokeWidth="1.3">
            <path d="M2.5 3.5h11M6.5 6.8h7M6.5 9.8h7M2.5 13h11" strokeLinecap="round" />
            <path d="M2.5 6.5l2 1.8-2 1.8" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </button>
      </div>
    </div>
  );
};
