// SideMenu.tsx

import Link from 'next/link';
import PlusMark from '../icons/PlusMark';

export default function SideMenu() {
  return (
    <div className="max-w-70 max-h-270">
      <Link href="/">
        <h1 className="typo-32-b text-primary-tw mb-10">Taskify</h1>
      </Link>

      <div className="flex items-center justify-between gap-4">
        <span className="text-xs font-bold text-muted-tw">Dash Boards</span>
        <Link href="/mydashboard">
          <PlusMark
            size={12}
            thickness={1}
            colorClass="bg-[#787486]"
            className="border border-gray-400 hover:bg-gray-500 cursor-pointer"
          />
        </Link>
      </div>
    </div>
  );
}

//TODO: 추후 이미지 추가 후 로고 완성
