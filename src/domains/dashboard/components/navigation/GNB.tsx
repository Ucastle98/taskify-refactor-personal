export default function GNB() {
  return (
    <header className="flex h-[70px] items-center justify-between border-b border-gray-300 px-8">
      {/* 왼쪽 */}
      <div className="flex items-center gap-2">
        <h2 className="text-xl font-bold text-[#333236]">비브리지</h2>
        <span>👑</span>
      </div>

      {/* 오른쪽 */}
      <div className="flex items-center gap-6">
        {/* 버튼 영역(추후 공통컴포넌트로 제작) */}
        <div className="flex items-center gap-4">
          <button
            type="button"
            className="rounded-lg border border-gray-300 px-3 py-2 text-sm text-[#787486]"
          >
            관리
          </button>
          <button
            type="button"
            className="rounded-lg border border-gray-300 px-3 py-2 text-sm text-[#787486]"
          >
            초대하기
          </button>
        </div>

        {/*멤버 (추후 API연결 후 초대된 멤버 이름으로 변경)*/}
        <div className="flex items-center -space-x-2">
          <div className="flex h-8 w-8 items-center justify-center rounded-full bg-yellow-600 text-xs text-white">
            Y
          </div>
          <div className="flex h-8 w-8 items-center justify-center rounded-full bg-yellow-400 text-xs text-white">
            C
          </div>
          <div className="flex h-8 w-8 items-center justify-center rounded-full bg-blue-400 text-xs text-white">
            K
          </div>
        </div>

        {/* 프로필 (추후 API연결 후 로그인 유저 이름으로 가져오기) */}
        <div className="flex items-center gap-2 border-l border-gray-200 pl-4">
          <div className="flex h-8 w-8 items-center justify-center rounded-full bg-green-400 text-xs text-white">
            B
          </div>
          <span className="text-sm font-medium text-[#333236]">전유성</span>
        </div>
      </div>
    </header>
  );
}
