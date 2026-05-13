// SideMenu.tsx

import Link from 'next/link';

import PlusMark from '@/components/icons/PlusMark';

export default function SideMenu() {
  // const [page, setPage] = useState(1);
  const totalPages = 10; // 임시 추후 API 확인 또는 팀원 상의

  return (
    <div className="flex flex-col h-full">
      <Link href="/">
        <h1 className="typo-32-b text-primary-tw mb-10">Taskify</h1>
      </Link>

      <div className="flex items-center justify-between gap-4">
        <span className="text-sm font-bold text-muted-tw">Dash Boards</span>
        <Link href="/mydashboard">
          <PlusMark
            size={13}
            thickness={1}
            colorClass="bg-[#787486]"
            className="border border-gray-400 hover:bg-gray-500 cursor-pointer"
          />
        </Link>
      </div>

      <div className="mt-4 flex-1 overflow-y-auto">{/* DashboardList(추후 추가) */}</div>

      <div className="mt-4">
        {/* <PagiNation page={page} totalPages={totalPages} onPageChange={setPage} /> */}
      </div>
    </div>
  );
}

//TODO: 추후 페이지 상태관리 추가
