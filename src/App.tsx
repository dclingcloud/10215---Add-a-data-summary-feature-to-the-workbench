/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState } from 'react';
import { NavRail } from './components/NavRail';
import { TopHeader } from './components/TopHeader';
import { SidebarTree } from './components/SidebarTree';
import { WorkspaceToolbar } from './components/WorkspaceToolbar';
import { InterfaceMetricsCard } from './components/InterfaceMetricsCard';
import { ProtocolDistributionCard } from './components/ProtocolDistributionCard';
import { AddChartModal } from './components/AddChartModal';
import { DashboardCardConfig, DashboardRow, LayoutMode } from './types/dashboard';

const initialRows: DashboardRow[] = [
  {
    id: 'row-1',
    layout: 'single',
    cards: [
      {
        id: 'card-interface',
        title: '接口指标统计图',
        category: '接口指标统计图',
        visualType: 'line',
        topology: 'DataCenter-SH_Interface 1',
        metric: '流量(GB)',
        showSummary: true,
      },
    ],
  },
  {
    id: 'row-2',
    layout: 'single',
    cards: [
      {
        id: 'card-protocol',
        title: '应用协议分布占比',
        category: '应用协议分布占比',
        visualType: 'line',
        topology: 'DataCenter-SH_Interface 1',
        metric: '流量(GB)',
        showSummary: true,
      },
    ],
  },
];

export default function App() {
  const [rows, setRows] = useState<DashboardRow[]>(initialRows);
  const [modalOpen, setModalOpen] = useState(false);
  const [editingCard, setEditingCard] = useState<DashboardCardConfig | null>(null);

  const handleOpenAddModal = () => {
    setEditingCard(null);
    setModalOpen(true);
  };

  const handleOpenEditModal = (card: DashboardCardConfig) => {
    setEditingCard(card);
    setModalOpen(true);
  };

  const handleConfirmModal = ({
    layout,
    cards,
    editingCardId,
  }: {
    layout: LayoutMode;
    cards: Omit<DashboardCardConfig, 'id'>[];
    editingCardId?: string;
  }) => {
    if (editingCardId) {
      const updated = cards[0];
      setRows((prev) =>
        prev.map((row) => ({
          ...row,
          cards: row.cards.map((c) =>
            c.id === editingCardId ? { ...updated, id: c.id } : c
          ),
        }))
      );
    } else {
      const newRow: DashboardRow = {
        id: `row-${Date.now()}`,
        layout,
        cards: cards.map((c, idx) => ({
          ...c,
          id: `card-${Date.now()}-${idx}`,
        })),
      };
      setRows((prev) => [...prev, newRow]);
    }

    setModalOpen(false);
    setEditingCard(null);
  };

  const renderCard = (card: DashboardCardConfig) => {
    if (card.category === '应用协议分布占比') {
      return (
        <ProtocolDistributionCard
          key={card.id}
          title={card.title}
          topology={card.topology}
          showSummary={card.showSummary}
          onMoreClick={() => handleOpenEditModal(card)}
        />
      );
    }

    return (
      <InterfaceMetricsCard
        key={card.id}
        title={card.title}
        visualType={card.visualType}
        topology={card.topology}
        metric={card.metric}
        showSummary={card.showSummary}
        onMoreClick={() => handleOpenEditModal(card)}
      />
    );
  };

  return (
    <div className="h-screen w-full min-w-[1200px] flex bg-[#F0F2F5] overflow-hidden">
      {/* Leftmost Dark Navigation Rail */}
      <NavRail />

      {/* Main Right Area */}
      <div className="flex-1 flex flex-col min-w-0 h-full">
        {/* Top White Header */}
        <TopHeader />

        {/* Content Split: View Tree Sidebar + Dashboard Cards */}
        <div className="flex-1 min-h-0 p-3 flex gap-3 overflow-hidden">
          <SidebarTree />

          <main className="flex-1 min-w-0 overflow-y-auto pr-0.5 flex flex-col gap-3">
            <WorkspaceToolbar onAddChart={handleOpenAddModal} />

            {rows.map((row) => (
              <div
                key={row.id}
                className={
                  row.layout === 'double'
                    ? 'grid grid-cols-2 gap-3'
                    : 'flex flex-col gap-3'
                }
              >
                {row.cards.map(renderCard)}
              </div>
            ))}
          </main>
        </div>
      </div>

      {/* Add / Configure Chart Modal */}
      <AddChartModal
        isOpen={modalOpen}
        editingCard={editingCard}
        onClose={() => {
          setModalOpen(false);
          setEditingCard(null);
        }}
        onConfirm={handleConfirmModal}
      />
    </div>
  );
}
