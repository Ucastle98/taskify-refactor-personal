// NothingInvitedDashboard.tsx

type NothingInvitedDashboardProps = {
  className?: string;
};

export default function NothingInvitedDashboard({ className = '' }: NothingInvitedDashboardProps) {
  return (
    <svg
      className={className}
      viewBox="0 0 100 100"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      <rect x="15" y="35" width="70" height="45" rx="6" fill="#F1F3F5" />
      <rect x="15" y="35" width="70" height="14" rx="6" fill="#E9ECEF" />
      <circle cx="50" cy="60" r="12" fill="#E9ECEF" />
      <path
        d="M44 60L48 64L57 55"
        stroke="#ADB5BD"
        strokeWidth="2.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <rect x="30" y="20" width="40" height="6" rx="3" fill="#DEE2E6" />
    </svg>
  );
}
