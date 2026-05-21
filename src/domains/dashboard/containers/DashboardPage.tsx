'use client';

import ActionChip from '@/components/chip/actionchip/ActionChip';
import GNB from '../components/navigation/GNB';
import SideMenu from '../components/navigation/SideMenu';

export default function DashboardPage() {
  return (
    <div>
      <div className="flex">
        <SideMenu />

        <div className="flex flex-1 flex-col gap-4">
          <GNB />

          <main className="p-4">
            <ActionChip onClick={() => console.log('click')} variant="column" />
          </main>
        </div>
      </div>
    </div>
  );
}
