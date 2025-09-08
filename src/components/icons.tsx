import type { SVGProps } from 'react';

export function ScentSenseiLogo(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}
    >
      <path d="M4 12.25C4 11.2835 4.39491 10.3551 5.08579 9.66421C5.77667 8.97333 6.70508 8.57842 7.67157 8.57842H16.3284C17.2949 8.57842 18.2233 8.97333 18.9142 9.66421C19.6051 10.3551 20 11.2835 20 12.25V19.25C20 20.2165 19.6051 21.1449 18.9142 21.8358C18.2233 22.5267 17.2949 22.9216 16.3284 22.9216H7.67157C6.70508 22.9216 5.77667 22.5267 5.08579 21.8358C4.39491 21.1449 4 20.2165 4 19.25V12.25Z" />
      <path d="M12 2V8.57842" />
      <path d="M9.87891 5.42108H14.1215" />
      <path d="M8 8.57842H16" />
    </svg>
  );
}
