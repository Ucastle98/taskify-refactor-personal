'use client';

import Button from '@/components/ui/Button';
import InvitedDashboard from '@/domains/myDashboard/components/InvitedDashboard';

export default function Page() {
  return (
    <div>
      <section className="mt-10 flex w-full flex-col gap-8 px-4 md:px-10 lg:max-w-240">
        <Button variant="add" className="h-14.5 w-65 md:h-17 md:w-61.75 lg:h-17.5 lg:w-83">
          <p className="text-sm font-semibold md:text-base">새로운 대시보드</p>
        </Button>
        <InvitedDashboard className="lg:mt-8" />
      </section>
    </div>
  );
}
