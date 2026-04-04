import Image from 'next/image';

export default function AssigneeCard({
  name,
  profileImg,
  dueDate,
}: {
  name: string;
  profileImg: string;
  dueDate: string;
}) {
  return (
    <div className="md:w-50 md:h-39 w-73.75 h-16 border border-[#D9D9D9] rounded-lg flex flex-col justify-center pl-4">
      <div className="flex md:flex-col gap-16 md:gap-4">
        <div className="flex flex-col md:gap-1.5">
          <div className="h-5 flex items-center">
            <span className="text-sm font-semibold leading-none text-black">담당자</span>
          </div>
          <div className="h-8.5 flex items-center gap-2">
            <Image
              src={profileImg}
              alt={`${name} profile`}
              width={34}
              height={34}
              sizes="(max-width: 767px) 26px, 34px"
              className="h-6.5 w-6.5 rounded-full md:h-8.5 md:w-8.5"
            />
            <span className="text-xs md:text-sm leading-none text-[#333236]">{name}</span>
          </div>
        </div>
        <div className="flex flex-col gap-2 md:gap-1.5">
          <div className="h-5 flex items-center">
            <span className="text-sm font-semibold leading-none text-black">마감일</span>
          </div>
          <div className="h-6 flex items-center">
            <span className="text-xs md:text-sm leading-none text-[#333236]">{dueDate}</span>
          </div>
        </div>
      </div>
    </div>
  );
}
