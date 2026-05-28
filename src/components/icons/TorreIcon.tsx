export function TorreIcon({ size = 24, className }: { size?: number; className?: string }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={size}
      height={size}
      viewBox="-5 0 20 20"
      fill="currentColor"
      className={className}
    >
      <path d="M6.325 18.225C4.1 18.225 2.525 17.25 2.525 14.35V7.4H0.85V4.8H2.525V1.175H5.55V4.8H9.1V7.4H5.55V13.875C5.55 15.05 6.15 15.525 7.175 15.525C7.85 15.525 8.45 15.375 9.05 15.075V17.55C8.3 17.975 7.475 18.225 6.325 18.225Z" />
    </svg>
  );
}
