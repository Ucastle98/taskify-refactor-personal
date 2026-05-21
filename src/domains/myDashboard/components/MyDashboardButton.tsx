import Crown from '@/assets/icons/crown.svg';
import Button from '@/components/ui/Button';
import { cn } from '@/lib/cn';

interface MyDashboardButton {
  dashboardName: string;
  isMadeByMe: boolean;
  colorDot: string;
  className?: string;
}

export default function MyDashboardButton({
  className,
  dashboardName,
  isMadeByMe,
  colorDot,
}: MyDashboardButton) {
  const baseStyle = 'flex justify-start pl-5 text-sm font-semibold md:text-base';

  return (
    <div>
      <Button className={cn(baseStyle, className)} variant="add">
        <div className="w-2 h-2 rounded-full" style={{ backgroundColor: colorDot }} />
        <p className="ml-2 md:ml-3 lg:ml-4">{dashboardName}</p>
        {isMadeByMe && (
          <div className="ml-1 text-[#F4B740] md:ml-1.5 lg:ml-2">
            <Crown className="h-3.5 w-4.5 md:h-4 md:w-5" aria-hidden="true" />
          </div>
        )}
      </Button>
    </div>
  );
}
