import React, { useState, useEffect } from 'react';
import {
  ChartCategory,
  ChartVisualType,
  DashboardCardConfig,
  LayoutMode,
} from '../types/dashboard';

interface AddChartModalProps {
  isOpen: boolean;
  editingCard?: DashboardCardConfig | null;
  onClose: () => void;
  onConfirm: (payload: {
    layout: LayoutMode;
    cards: Omit<DashboardCardConfig, 'id'>[];
    editingCardId?: string;
  }) => void;
}

interface DraftChartTab {
  name: string;
  category: ChartCategory;
  visualType: ChartVisualType;
  topology: string;
  metric: string;
  showSummary: boolean;
}

const createDefaultDraft = (): DraftChartTab => ({
  name: '',
  category: 'IP协议统计图',
  visualType: 'line',
  topology: '',
  metric: '',
  showSummary: false,
});

const categoryOptions: ChartCategory[] = [
  'IP协议统计图',
  '接口指标统计图',
  '应用协议分布占比',
];

const topologyOptions = [
  'DataCenter-SH_Interface 1',
  'DataCenter-BJ_Interface 2',
  'Core-Gateway-01',
];

const metricOptions = ['流量(GB)', '带宽利用率(%)', '包速率(pps)'];

export const AddChartModal: React.FC<AddChartModalProps> = ({
  isOpen,
  editingCard,
  onClose,
  onConfirm,
}) => {
  const [layout, setLayout] = useState<LayoutMode>('single');
  const [tabs, setTabs] = useState<DraftChartTab[]>([createDefaultDraft()]);
  const [activeTabIndex, setActiveTabIndex] = useState(0);
  const [configExpanded, setConfigExpanded] = useState(true);

  useEffect(() => {
    if (!isOpen) return;
    if (editingCard) {
      setLayout('single');
      setTabs([
        {
          name: editingCard.title,
          category: editingCard.category,
          visualType: editingCard.visualType,
          topology: editingCard.topology,
          metric: editingCard.metric,
          showSummary: editingCard.showSummary,
        },
      ]);
      setActiveTabIndex(0);
      setConfigExpanded(true);
    } else {
      setLayout('single');
      setTabs([createDefaultDraft()]);
      setActiveTabIndex(0);
      setConfigExpanded(true);
    }
  }, [isOpen, editingCard]);

  if (!isOpen) return null;

  const currentTab = tabs[activeTabIndex] ?? tabs[0];

  const updateCurrentTab = (patch: Partial<DraftChartTab>) => {
    setTabs((prev) =>
      prev.map((tab, idx) => (idx === activeTabIndex ? { ...tab, ...patch } : tab))
    );
  };

  const handleLayoutChange = (nextLayout: LayoutMode) => {
    setLayout(nextLayout);
    if (nextLayout === 'double' && tabs.length < 2) {
      setTabs((prev) => [...prev, createDefaultDraft()]);
    } else if (nextLayout === 'single' && tabs.length > 1) {
      setTabs((prev) => [prev[0]]);
      setActiveTabIndex(0);
    }
  };

  const handleAddTab = () => {
    if (tabs.length >= 2) return;
    setLayout('double');
    setTabs((prev) => [...prev, createDefaultDraft()]);
    setActiveTabIndex(tabs.length);
  };

  const handleRemoveTab = () => {
    if (tabs.length <= 1) return;
    setLayout('single');
    setTabs((prev) => [prev[0]]);
    setActiveTabIndex(0);
  };

  const handleConfirmClick = () => {
    const cardsToSave = tabs.map((tab) => ({
      title: tab.name.trim() || tab.category,
      category: tab.category,
      visualType: tab.visualType,
      topology: tab.topology || 'DataCenter-SH_Interface 1',
      metric: tab.metric || '流量(GB)',
      showSummary: tab.showSummary,
    }));

    onConfirm({
      layout,
      cards: cardsToSave,
      editingCardId: editingCard?.id,
    });
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/45 select-none"
      role="dialog"
      aria-modal="true"
      aria-labelledby="add-chart-modal-title"
    >
      <div className="w-[690px] max-w-[94vw] bg-white rounded-[4px] shadow-[0_8px_28px_rgba(0,0,0,0.18)] flex flex-col">
        {/* Modal Header */}
        <div className="px-6 pt-4 pb-3 flex items-center justify-between">
          <h3
            id="add-chart-modal-title"
            className="text-[15px] font-medium text-[#262626]"
          >
            {editingCard ? '编辑图表' : '添加图表'}
          </h3>
          <button
            type="button"
            onClick={onClose}
            aria-label="关闭"
            className="text-[#8C8C8C] hover:text-[#262626] p-1 cursor-pointer"
          >
            <svg viewBox="0 0 14 14" className="w-[12px] h-[12px]" fill="none" stroke="currentColor" strokeWidth="1.5">
              <path d="M2 2l10 10M12 2L2 12" strokeLinecap="round" />
            </svg>
          </button>
        </div>

        {/* Modal Body */}
        <div className="px-6 pb-6">
          {/* Chart Tabs Bar */}
          <div className="flex items-center justify-between border-b border-[#F0F0F0] mb-4">
            <div className="flex items-center gap-6">
              {tabs.map((_, idx) => {
                const isActive = idx === activeTabIndex;
                return (
                  <button
                    key={idx}
                    type="button"
                    onClick={() => setActiveTabIndex(idx)}
                    className={`relative pb-2 text-[13px] font-medium cursor-pointer transition-colors ${
                      isActive
                        ? 'text-[#1677FF]'
                        : 'text-[#595959] hover:text-[#262626]'
                    }`}
                  >
                    {`图表${idx + 1}`}
                    {isActive && (
                      <span className="absolute bottom-0 left-0 right-0 h-[2px] bg-[#1677FF]" />
                    )}
                  </button>
                );
              })}
            </div>

            {!editingCard && (
              <div className="flex items-center gap-2 pb-1.5">
                <button
                  type="button"
                  onClick={handleRemoveTab}
                  disabled={tabs.length <= 1}
                  aria-label="减少图表"
                  className={`w-[16px] h-[16px] rounded-full flex items-center justify-center text-white text-[12px] leading-none ${
                    tabs.length <= 1
                      ? 'bg-[#D9D9D9] cursor-not-allowed'
                      : 'bg-[#8C8C8C] hover:bg-[#595959] cursor-pointer'
                  }`}
                >
                  <span className="w-[7px] h-[1.4px] bg-white block" />
                </button>
                <button
                  type="button"
                  onClick={handleAddTab}
                  disabled={tabs.length >= 2}
                  aria-label="增加图表"
                  className={`w-[16px] h-[16px] rounded-full flex items-center justify-center text-white ${
                    tabs.length >= 2
                      ? 'bg-[#D9D9D9] cursor-not-allowed'
                      : 'bg-[#9CA3AF] hover:bg-[#1677FF] cursor-pointer'
                  }`}
                >
                  <svg viewBox="0 0 12 12" className="w-[9px] h-[9px]" fill="none" stroke="currentColor" strokeWidth="1.8">
                    <path d="M6 2.5v7M2.5 6h7" strokeLinecap="round" />
                  </svg>
                </button>
              </div>
            )}
          </div>

          {/* Layout Selection Row */}
          {!editingCard && (
            <div className="flex items-start mb-3">
              <div className="w-[72px] shrink-0 pt-1 text-[12.5px] text-[#595959]">
                布局选择
              </div>
              <div className="flex items-center gap-4">
                {/* Single Column Layout */}
                <button
                  type="button"
                  onClick={() => handleLayoutChange('single')}
                  className={`w-[178px] rounded-[3px] overflow-hidden border text-left cursor-pointer transition-colors ${
                    layout === 'single'
                      ? 'border-[#1677FF]'
                      : 'border-[#E5E7EB] hover:border-[#BFBFBF]'
                  }`}
                >
                  <div className="h-[88px] bg-[#F7F8FA] flex items-center justify-center p-2.5">
                    <div className="w-[116px] h-[68px] bg-white rounded-[2px] border border-[#EBEDF0] p-1.5 flex flex-col gap-1">
                      <div className="h-[7px] flex items-center justify-between px-0.5">
                        <div className="w-[14px] h-[3px] rounded-full bg-[#1677FF]" />
                        <div className="flex gap-0.5">
                          <span className="w-[3px] h-[3px] rounded-full bg-[#1677FF]" />
                          <span className="w-[3px] h-[3px] rounded-full bg-[#91CAFF]" />
                        </div>
                      </div>
                      <div className="flex-1 flex gap-1.5">
                        <div className="w-[18px] bg-[#F2F3F5] rounded-[1px] flex flex-col gap-1 p-1">
                          <span className="h-[2.5px] w-full bg-[#D9D9D9] rounded-full" />
                          <span className="h-[2.5px] w-full bg-[#D9D9D9] rounded-full" />
                          <span className="h-[2.5px] w-4/5 bg-[#D9D9D9] rounded-full" />
                        </div>
                        <div className="flex-1 bg-[#E6F4FF] rounded-[1px]" />
                      </div>
                    </div>
                  </div>
                  <div className="px-3 py-2 bg-white border-t border-[#F0F0F0] flex items-center gap-2">
                    <span
                      className={`w-[13px] h-[13px] rounded-full border flex items-center justify-center ${
                        layout === 'single' ? 'border-[#1677FF]' : 'border-[#D9D9D9]'
                      }`}
                    >
                      {layout === 'single' && (
                        <span className="w-[6.5px] h-[6.5px] rounded-full bg-[#1677FF]" />
                      )}
                    </span>
                    <span className="text-[12px] text-[#333333]">单行单列布局</span>
                  </div>
                </button>

                {/* Double Column Layout */}
                <button
                  type="button"
                  onClick={() => handleLayoutChange('double')}
                  className={`w-[178px] rounded-[3px] overflow-hidden border text-left cursor-pointer transition-colors ${
                    layout === 'double'
                      ? 'border-[#1677FF]'
                      : 'border-[#E5E7EB] hover:border-[#BFBFBF]'
                  }`}
                >
                  <div className="h-[88px] bg-[#F7F8FA] flex items-center justify-center p-2.5">
                    <div className="w-[116px] h-[68px] bg-white rounded-[2px] border border-[#EBEDF0] p-1.5 flex flex-col gap-1">
                      <div className="h-[7px] flex items-center justify-between px-0.5">
                        <div className="w-[14px] h-[3px] rounded-full bg-[#1677FF]" />
                        <div className="flex gap-0.5">
                          <span className="w-[3px] h-[3px] rounded-full bg-[#1677FF]" />
                          <span className="w-[3px] h-[3px] rounded-full bg-[#91CAFF]" />
                        </div>
                      </div>
                      <div className="flex-1 flex gap-1.5">
                        <div className="w-[18px] bg-[#F2F3F5] rounded-[1px] flex flex-col gap-1 p-1">
                          <span className="h-[2.5px] w-full bg-[#D9D9D9] rounded-full" />
                          <span className="h-[2.5px] w-full bg-[#D9D9D9] rounded-full" />
                          <span className="h-[2.5px] w-4/5 bg-[#D9D9D9] rounded-full" />
                        </div>
                        <div className="flex-1 flex gap-1">
                          <div className="flex-1 bg-[#E6F4FF] rounded-[1px]" />
                          <div className="flex-1 bg-[#E6F4FF] rounded-[1px]" />
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="px-3 py-2 bg-white border-t border-[#F0F0F0] flex items-center gap-2">
                    <span
                      className={`w-[13px] h-[13px] rounded-full border flex items-center justify-center ${
                        layout === 'double' ? 'border-[#1677FF]' : 'border-[#D9D9D9]'
                      }`}
                    >
                      {layout === 'double' && (
                        <span className="w-[6.5px] h-[6.5px] rounded-full bg-[#1677FF]" />
                      )}
                    </span>
                    <span className="text-[12px] text-[#333333]">单行双列布局</span>
                  </div>
                </button>
              </div>
            </div>
          )}

          {/* Chart Config Divider */}
          <div className="flex items-center justify-between py-2.5">
            <span className="text-[13px] font-medium text-[#262626] shrink-0">
              图表配置
            </span>
            <span className="flex-1 border-b border-dashed border-[#E5E7EB] mx-3" />
            <button
              type="button"
              onClick={() => setConfigExpanded((prev) => !prev)}
              className="text-[12px] text-[#1677FF] flex items-center gap-1 shrink-0 cursor-pointer"
            >
              <span>{configExpanded ? '收起' : '展开'}</span>
              <svg
                viewBox="0 0 12 12"
                className={`w-[10px] h-[10px] transition-transform ${
                  configExpanded ? '' : 'rotate-180'
                }`}
                fill="none"
                stroke="currentColor"
                strokeWidth="1.5"
              >
                <path d="M2.5 7.5L6 4l3.5 3.5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </button>
          </div>

          {/* Chart Configuration Fields */}
          {configExpanded && (
            <div className="space-y-3.5 pt-1">
              {/* 图表名称 */}
              <div className="flex items-center">
                <label className="w-[72px] shrink-0 text-[12.5px] text-[#595959]">
                  图表名称
                </label>
                <input
                  type="text"
                  value={currentTab.name}
                  onChange={(e) => updateCurrentTab({ name: e.target.value })}
                  placeholder="请输入"
                  className="flex-1 h-[32px] border border-[#D9D9D9] focus:border-[#1677FF] rounded-[2px] px-3 text-[12.5px] text-[#333333] placeholder:text-[#BFBFBF] outline-none bg-white"
                />
              </div>

              {/* 图表类型 */}
              <div className="flex items-start">
                <label className="w-[72px] shrink-0 pt-1.5 text-[12.5px] text-[#595959]">
                  图表类型
                </label>
                <div className="flex-1 space-y-3">
                  <div className="relative">
                    <select
                      value={currentTab.category}
                      onChange={(e) =>
                        updateCurrentTab({ category: e.target.value as ChartCategory })
                      }
                      className="w-full h-[32px] appearance-none border border-[#D9D9D9] focus:border-[#1677FF] rounded-[2px] px-3 pr-8 text-[12.5px] text-[#333333] bg-white outline-none cursor-pointer"
                    >
                      {categoryOptions.map((opt) => (
                        <option key={opt} value={opt}>
                          {opt}
                        </option>
                      ))}
                    </select>
                    <svg
                      viewBox="0 0 12 12"
                      className="w-[11px] h-[11px] text-[#8C8C8C] absolute right-2.5 top-1/2 -translate-y-1/2 pointer-events-none"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="1.4"
                    >
                      <path d="M2.5 4.5L6 8l3.5-3.5" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </div>

                  {/* Visual Sub-type Cards */}
                  <div className="flex items-start gap-5">
                    {/* 折线图 */}
                    <button
                      type="button"
                      onClick={() => updateCurrentTab({ visualType: 'line' })}
                      className="flex flex-col items-center gap-1.5 cursor-pointer"
                    >
                      <div
                        className={`relative w-[54px] h-[54px] rounded-[3px] border flex items-center justify-center bg-white ${
                          currentTab.visualType === 'line'
                            ? 'border-[#1677FF]'
                            : 'border-[#E5E7EB] hover:border-[#BFBFBF]'
                        }`}
                      >
                        <svg viewBox="0 0 32 32" className="w-[34px] h-[34px]" fill="none">
                          <rect x="4" y="4" width="24" height="24" rx="2" fill="#E6F4FF" />
                          <path
                            d="M7 22l5-6 4.5 3.5L22 11l3 3.5V24H7v-2Z"
                            fill="#69B1FF"
                            fillOpacity="0.45"
                          />
                          <path
                            d="M7 22l5-6 4.5 3.5L22 11l3 3.5"
                            stroke="#1677FF"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                        </svg>
                        {currentTab.visualType === 'line' && (
                          <span className="absolute right-0 bottom-0 w-[14px] h-[14px] overflow-hidden">
                            <span
                              className="absolute right-0 bottom-0 w-0 h-0 border-solid"
                              style={{
                                borderWidth: '0 0 14px 14px',
                                borderColor: 'transparent transparent #1677FF transparent',
                              }}
                            />
                            <svg
                              viewBox="0 0 10 10"
                              className="w-[7px] h-[7px] text-white absolute right-[1px] bottom-[1px]"
                              fill="none"
                              stroke="currentColor"
                              strokeWidth="1.8"
                            >
                              <path d="M2 5.2L4.2 7.4L8.2 2.8" strokeLinecap="round" strokeLinejoin="round" />
                            </svg>
                          </span>
                        )}
                      </div>
                      <span className="text-[12px] text-[#333333]">折线图</span>
                    </button>

                    {/* 柱状图 */}
                    <button
                      type="button"
                      onClick={() => updateCurrentTab({ visualType: 'bar' })}
                      className="flex flex-col items-center gap-1.5 cursor-pointer"
                    >
                      <div
                        className={`relative w-[54px] h-[54px] rounded-[3px] border flex items-center justify-center bg-white ${
                          currentTab.visualType === 'bar'
                            ? 'border-[#1677FF]'
                            : 'border-[#E5E7EB] hover:border-[#BFBFBF]'
                        }`}
                      >
                        <svg viewBox="0 0 32 32" className="w-[34px] h-[34px]" fill="none">
                          <rect x="4" y="4" width="24" height="24" rx="2" fill="#F2F8FF" />
                          <rect x="8" y="17" width="4" height="7" rx="0.5" fill="#1677FF" />
                          <rect x="14" y="13" width="4" height="11" rx="0.5" fill="#1677FF" />
                          <rect x="20" y="9" width="4" height="15" rx="0.5" fill="#1677FF" />
                        </svg>
                        {currentTab.visualType === 'bar' && (
                          <span className="absolute right-0 bottom-0 w-[14px] h-[14px] overflow-hidden">
                            <span
                              className="absolute right-0 bottom-0 w-0 h-0 border-solid"
                              style={{
                                borderWidth: '0 0 14px 14px',
                                borderColor: 'transparent transparent #1677FF transparent',
                              }}
                            />
                            <svg
                              viewBox="0 0 10 10"
                              className="w-[7px] h-[7px] text-white absolute right-[1px] bottom-[1px]"
                              fill="none"
                              stroke="currentColor"
                              strokeWidth="1.8"
                            >
                              <path d="M2 5.2L4.2 7.4L8.2 2.8" strokeLinecap="round" strokeLinejoin="round" />
                            </svg>
                          </span>
                        )}
                      </div>
                      <span className="text-[12px] text-[#333333]">柱状图</span>
                    </button>

                    {/* 表格 */}
                    <button
                      type="button"
                      onClick={() => updateCurrentTab({ visualType: 'table' })}
                      className="flex flex-col items-center gap-1.5 cursor-pointer"
                    >
                      <div
                        className={`relative w-[54px] h-[54px] rounded-[3px] border flex items-center justify-center bg-white ${
                          currentTab.visualType === 'table'
                            ? 'border-[#1677FF]'
                            : 'border-[#E5E7EB] hover:border-[#BFBFBF]'
                        }`}
                      >
                        <svg viewBox="0 0 32 32" className="w-[34px] h-[34px]" fill="none">
                          <rect x="4" y="4" width="24" height="24" rx="2" fill="#F2F8FF" />
                          <rect x="7" y="8" width="18" height="16" rx="1" stroke="#69B1FF" strokeWidth="1.5" fill="#FFFFFF" />
                          <path d="M7 13h18M7 18h18M13 13v11M19 13v11" stroke="#69B1FF" strokeWidth="1.2" />
                          <rect x="7.6" y="8.6" width="16.8" height="3.8" fill="#69B1FF" fillOpacity="0.4" />
                        </svg>
                        {currentTab.visualType === 'table' && (
                          <span className="absolute right-0 bottom-0 w-[14px] h-[14px] overflow-hidden">
                            <span
                              className="absolute right-0 bottom-0 w-0 h-0 border-solid"
                              style={{
                                borderWidth: '0 0 14px 14px',
                                borderColor: 'transparent transparent #1677FF transparent',
                              }}
                            />
                            <svg
                              viewBox="0 0 10 10"
                              className="w-[7px] h-[7px] text-white absolute right-[1px] bottom-[1px]"
                              fill="none"
                              stroke="currentColor"
                              strokeWidth="1.8"
                            >
                              <path d="M2 5.2L4.2 7.4L8.2 2.8" strokeLinecap="round" strokeLinejoin="round" />
                            </svg>
                          </span>
                        )}
                      </div>
                      <span className="text-[12px] text-[#333333]">表格</span>
                    </button>
                  </div>
                </div>
              </div>

              {/* 拓扑选择 */}
              <div className="flex items-center">
                <label className="w-[72px] shrink-0 text-[12.5px] text-[#595959]">
                  拓扑选择
                </label>
                <div className="flex-1 relative">
                  <select
                    value={currentTab.topology}
                    onChange={(e) => updateCurrentTab({ topology: e.target.value })}
                    className={`w-full h-[32px] appearance-none border border-[#D9D9D9] focus:border-[#1677FF] rounded-[2px] px-3 pr-8 text-[12.5px] bg-white outline-none cursor-pointer ${
                      currentTab.topology ? 'text-[#333333]' : 'text-[#BFBFBF]'
                    }`}
                  >
                    <option value="">请选择</option>
                    {topologyOptions.map((opt) => (
                      <option key={opt} value={opt} className="text-[#333333]">
                        {opt}
                      </option>
                    ))}
                  </select>
                  <svg
                    viewBox="0 0 12 12"
                    className="w-[11px] h-[11px] text-[#8C8C8C] absolute right-2.5 top-1/2 -translate-y-1/2 pointer-events-none"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.4"
                  >
                    <path d="M2.5 4.5L6 8l3.5-3.5" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </div>
              </div>

              {/* 指标选择 */}
              <div className="flex items-center">
                <label className="w-[72px] shrink-0 text-[12.5px] text-[#595959]">
                  指标选择
                </label>
                <div className="flex-1 relative">
                  <select
                    value={currentTab.metric}
                    onChange={(e) => updateCurrentTab({ metric: e.target.value })}
                    className={`w-full h-[32px] appearance-none border border-[#D9D9D9] focus:border-[#1677FF] rounded-[2px] px-3 pr-8 text-[12.5px] bg-white outline-none cursor-pointer ${
                      currentTab.metric ? 'text-[#333333]' : 'text-[#BFBFBF]'
                    }`}
                  >
                    <option value="">请选择</option>
                    {metricOptions.map((opt) => (
                      <option key={opt} value={opt} className="text-[#333333]">
                        {opt}
                      </option>
                    ))}
                  </select>
                  <svg
                    viewBox="0 0 12 12"
                    className="w-[11px] h-[11px] text-[#8C8C8C] absolute right-2.5 top-1/2 -translate-y-1/2 pointer-events-none"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.4"
                  >
                    <path d="M2.5 4.5L6 8l3.5-3.5" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </div>
              </div>

              {/* 数据总结开关（新增，默认关闭） */}
              <div className="flex items-center pt-0.5">
                <span className="w-[72px] shrink-0 text-[12.5px] text-[#595959]">
                  数据总结
                </span>
                <div className="flex items-center gap-2.5">
                  <button
                    type="button"
                    role="switch"
                    aria-checked={currentTab.showSummary}
                    aria-label="数据总结开关"
                    onClick={() =>
                      updateCurrentTab({ showSummary: !currentTab.showSummary })
                    }
                    className={`relative w-[36px] h-[20px] rounded-full transition-colors cursor-pointer ${
                      currentTab.showSummary ? 'bg-[#1677FF]' : 'bg-[#BFBFBF]'
                    }`}
                  >
                    <span
                      className={`absolute top-[2px] left-[2px] w-[16px] h-[16px] rounded-full bg-white shadow-xs transition-transform ${
                        currentTab.showSummary ? 'translate-x-[16px]' : 'translate-x-0'
                      }`}
                    />
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* Footer Buttons */}
          <div className="flex items-center justify-center gap-3 pt-7">
            <button
              type="button"
              onClick={onClose}
              className="h-[30px] px-5 bg-[#F2F3F5] hover:bg-[#E5E6EB] text-[#595959] text-[12.5px] rounded-[2px] cursor-pointer"
            >
              取消
            </button>
            <button
              type="button"
              onClick={handleConfirmClick}
              className="h-[30px] px-5 bg-[#1677FF] hover:bg-[#0958D9] text-white text-[12.5px] rounded-[2px] cursor-pointer"
            >
              确定
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
