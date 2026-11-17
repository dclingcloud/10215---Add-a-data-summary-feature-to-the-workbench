import React from 'react';

interface DataSummaryBoxProps {
  children: React.ReactNode;
}

export const DataSummaryBox: React.FC<DataSummaryBoxProps> = ({ children }) => {
  return (
    <div className="relative mt-4 border border-[#F5D68E] bg-[#FFFDF5] rounded-[3px] px-4 pt-3.5 pb-2.5">
      <span className="absolute -top-[10px] left-3 px-1.5 text-[12px] font-medium text-[#D99B26] bg-gradient-to-b from-white via-[#FFFDF5] to-[#FFFDF5] leading-[18px]">
        数据总结
      </span>
      <div className="text-[12px] leading-[1.75] text-[#333333] tabular-nums">
        {children}
      </div>
    </div>
  );
};
