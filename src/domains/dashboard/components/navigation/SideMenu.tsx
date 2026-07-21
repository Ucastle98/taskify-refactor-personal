// SideMenu.tsx

import Link from 'next/link';
import { useQuery } from '@tanstack/react-query';

import PlusMark from '@/components/icons/PlusMark';
import Crown from '@/assets/icons/crown.svg';
import { getDashboards } from '@/services/dashboard';

export default function SideMenu() {
  // const [page, setPage] = useState(1);
  const totalPages = 10; // 임시 추후 API 확인 또는 팀원 상의

  const { data } = useQuery({
    queryKey: ['dashboards'],
    queryFn: getDashboards,
  });

  const dashboards = data?.dashboards ?? [];

  return (
    <div className="flex flex-col h-full">
      <Link href="/" className="flex ml-2 mt-4 mb-10 gap-1">
        <img src="/images/taskifylogo.svg" alt="Taskify 로고" className="w-8 h-8" />
        <h1 className="text-2xl font-black tracking-tighter leading-none text-[#5534DA]">
          Taskify
        </h1>
      </Link>

      <div className="flex items-center gap-42">
        <span className="text-sm font-bold text-muted-tw px-2">Dash Boards</span>
        <Link href="/mydashboard">
          <PlusMark
            size={13}
            thickness={1}
            colorClass="bg-[#787486]"
            className="border border-gray-400 hover:bg-gray-500 cursor-pointer"
          />
        </Link>
      </div>

      <div className="mt-4 flex-1 overflow-y-auto">
        {dashboards.map((dashboard) => (
          <Link
            key={dashboard.id}
            href={`/dashboard/${dashboard.id}`}
            className="flex items-center gap-2.5 px-3 py-1 text-xl text-[#333236] hover:bg-gray-100 rounded"
          >
            <span
              className="h-2.5 w-2.5 shrink-0 rounded-full"
              style={{ backgroundColor: dashboard.color }}
            />
            <span className="truncate">{dashboard.title}</span>
            {dashboard.createdByMe && (
              <div className="ml-1 text-[#F4B740] md:ml-1.5 lg:ml-2">
                <Crown className="h-3.5 w-4.5 md:h-4 md:w-5" aria-hidden="true" />
              </div>
            )}
          </Link>
        ))}
      </div>

      <div className="mt-4">
        {/* <PagiNation page={page} totalPages={totalPages} onPageChange={setPage} /> */}
      </div>
    </div>
  );
}

//TODO: 추후 페이지 상태관리 추가
