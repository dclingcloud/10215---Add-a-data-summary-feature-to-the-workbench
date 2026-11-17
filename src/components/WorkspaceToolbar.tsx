import React from 'react';

interface WorkspaceToolbarProps {
  onAddChart: () => void;
}

export const WorkspaceToolbar: React.FC<WorkspaceToolbarProps> = ({ onAddChart }) => {
  return (
    <div className="bg-white rounded-[3px] border border-[#EAECEF] shadow-[0_1px_2px_rgba(0,0,0,0.02)] px-4 h-[42px] shrink-0 flex items-center justify-between select-none">
      {/* Left: Precision & Real-time Update */}
      <div className="flex items-center gap-3 text-[12.5px]">
        <div className="flex items-center gap-1.5 cursor-pointer">
          <span className="text-[#8C8C8C]">数据精度</span>
          <span className="text-[#262626]">分钟</span>
          <svg viewBox="0 0 10 6" className="w-[8px] h-[5px] text-[#8C8C8C]" fill="currentColor">
            <path d="M0 0h10L5 6 0 0Z" />
          </svg>
        </div>

        <span className="h-[13px] w-[1px] bg-[#E5E7EB]" />

        <label className="flex items-center gap-1.5 text-[#333333] cursor-pointer">
          <span className="w-[13px] h-[13px] rounded-[2px] border border-[#D9D9D9] bg-white inline-block" />
          <span>实时更新</span>
        </label>
      </div>

      {/* Center: View Title */}
      <div className="text-[13.5px] font-medium text-[#262626]">交易监控</div>

      {/* Right: Action Buttons */}
      <div className="flex items-center gap-4 text-[12.5px]">
        <button
          type="button"
          className="flex items-center gap-1 text-[#333333] hover:text-[#1677FF] whitespace-nowrap cursor-pointer"
        >
          <svg viewBox="0 0 16 16" className="w-[13.5px] h-[13.5px] text-[#1677FF]" fill="currentColor">
            <rect x="2.5" y="2" width="11" height="12" rx="1.2" />
            <path d="M5 5.5h6M5 8h6M5 10.5h3.5" stroke="#FFFFFF" strokeWidth="1.2" strokeLinecap="round" />
          </svg>
          <span>结论配置</span>
        </button>

        <button
          type="button"
          className="flex items-center gap-1 text-[#333333] hover:text-[#1677FF] whitespace-nowrap cursor-pointer"
        >
          <svg viewBox="0 0 16 16" className="w-[13.5px] h-[13.5px] text-[#1677FF]" fill="currentColor">
            <rect x="1.8" y="3.2" width="12.4" height="9.6" rx="1.2" />
            <path d="M2.2 4l5.8 4.4L13.8 4" fill="none" stroke="#FFFFFF" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
          <span>邮件发送</span>
        </button>

        <button
          type="button"
          className="flex items-center gap-1 text-[#333333] hover:text-[#1677FF] whitespace-nowrap cursor-pointer"
        >
          <svg viewBox="0 0 16 16" className="w-[13.5px] h-[13.5px] text-[#1677FF]" fill="none" stroke="currentColor" strokeWidth="1.5">
            <path d="M8 10.5V3M5.2 5.5L8 2.8l2.8 2.7" strokeLinecap="round" strokeLinejoin="round" />
            <path d="M3 10.5v2.3a.7.7 0 0 0 .7.7h8.6a.7.7 0 0 0 .7-.7v-2.3" strokeLinecap="round" />
          </svg>
          <span>导出</span>
        </button>

        <button
          type="button"
          onClick={onAddChart}
          className="h-[28px] px-2.5 bg-[#1677FF] hover:bg-[#0958D9] text-white rounded-[2px] flex items-center gap-1 text-[12.5px] whitespace-nowrap cursor-pointer"
        >
          <span className="w-[12px] h-[12px] rounded-[2px] bg-white text-[#1677FF] inline-flex items-center justify-center text-[11px] font-bold leading-none">
            +
          </span>
          <span>添加图表</span>
        </button>
      </div>
    </div>
  );
};
