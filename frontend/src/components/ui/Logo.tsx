import { cn } from "@/lib/utils";

/**
 * Logo - Simple 3-rectangles version (Campus Connect)
 * Animates vertically "one-by-one" on hover
 */
export function Logo({ className }: { className?: string }) {
  return (
    <svg
      className={cn("group", className)}
      width="80"
      height="40"
      viewBox="0 0 80 40"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <rect
        className="group-hover:animate-v-loader"
        width="24"
        height="40"
        rx="12"
        fill="#F59E0B"
        fillOpacity="0.8"
      />
      <rect
        className="group-hover:animate-v-loader [animation-delay:0.4s]"
        x="28"
        width="24"
        height="40"
        rx="12"
        fill="#F59E0B"
      />
      <rect
        className="group-hover:animate-v-loader [animation-delay:0.8s]"
        x="56"
        width="24"
        height="40"
        rx="12"
        fill="#F59E0B"
        fillOpacity="0.8"
      />
    </svg>
  );
}

/**
 * LogoSkolae - Full Skolae logo with text
 * Animates its 4 icon quadrants vertically "one-by-one" on hover
 */
export function LogoSkolae({ className }: { className?: string }) {
  return (
    <svg
      className={"group h-12 w-auto" + className}
      viewBox="0 0 240 68"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <g className="fill-foreground">
        <path
          className="group-hover:rotate-360"
          fillRule="evenodd"
          clipRule="evenodd"
          d="M16.8,0C7.6,0,0.1,7.4,0.1,16.5V17c0,8.8,7.3,16,16.2,16s16.2-7.2,16.2-16V0H16.8z"
        />
        <path
          className="group-hover:rotate-360 [animation-delay:0.3s]"
          fillRule="evenodd"
          clipRule="evenodd"
          d="M35.3,0.1H53c7.7,0,13.9,6.1,13.9,13.7v17C57.2,31,37.5,25.3,35.3,0.1z"
        />
        <path
          className="group-hover:rotate-360 [animation-delay:0.6s]"
          fillRule="evenodd"
          clipRule="evenodd"
          d="M67.7,50.7c0,9.1-7.5,16.5-16.7,16.5H35.2V50.2c0-8.8,7.3-16,16.2-16s16.2,7.2,16.2,16L67.7,50.7z"
        />
        <path
          className="group-hover:rotate-360 [animation-delay:0.9s]"
          fillRule="evenodd"
          clipRule="evenodd"
          d="M32.4,67H14.8C7.1,67,0.9,60.9,0.9,53.3v-17C10.5,36.1,30.3,41.8,32.4,67z"
        />
      </g>
      <path
        className="fill-foreground"
        fillRule="evenodd"
        clipRule="evenodd"
        d="M117.2,24.4c1.2,0.6,2,1.6,2.6,2.9l6.4-0.8c-0.7-2.8-2.1-4.8-4.3-6.1c-2.2-1.3-5.3-2-9.3-2c-2.9,0-5.4,0.4-7.5,1.1c-2.1,0.7-3.7,1.6-4.8,2.9c-1.1,1.3-1.6,2.8-1.6,4.5c0,2.6,0.9,4.5,2.7,6c1.8,1.4,4.8,2.4,8.8,2.9l4.9,0.7c1.8,0.2,3,0.6,3.8,1.2c0.8,0.6,1.2,1.4,1.2,2.3c0,1.2-0.6,2.2-1.8,2.8c-1.2,0.6-3,0.9-5.4,0.9c-2.7,0-4.7-0.4-6-1.3c-1.3-0.9-2.2-2.3-2.4-4.2h-6.6c0.2,2.4,0.9,4.3,2,5.9c1.2,1.5,2.8,2.7,4.9,3.4c2.2,0.8,4.9,1.1,8.1,1.1c4.5,0,7.9-0.8,10.3-2.3c2.4-1.6,3.7-3.7,3.7-6.5c0-2.5-0.8-4.4-2.5-5.8c-1.7-1.4-4.3-2.4-7.9-3l-6-0.9c-2-0.3-3.4-0.7-4.1-1.2c-0.7-0.5-1.1-1.2-1.1-2.3c0-1.1,0.6-1.9,1.8-2.5c1.2-0.6,3-0.8,5.3-0.8C114.5,23.4,116.1,23.8,117.2,24.4z M139.7,37l7.7,11h6.9l-10.1-14.3l9.2-6.8h-7.9l-9.9,7.4V19.2h-6.1V48h6.1v-8L139.7,37z M178.5,37.4c0,3.4-1.2,6.2-3.5,8.2c-2.4,2-5.5,3-9.5,3c-4,0-7.1-1-9.4-2.9c-2.2-2-3.4-4.7-3.4-8.2c0-2.2,0.5-4.2,1.6-5.9c1-1.7,2.5-3,4.5-4c2-0.9,4.3-1.4,7-1.4c4,0,7.1,1,9.3,2.9C177.4,31.2,178.5,33.9,178.5,37.4z M172.2,37.5c0-2.1-0.6-3.7-1.7-4.8c-1.1-1.2-2.7-1.7-4.8-1.7c-2.1,0-3.7,0.6-4.8,1.7c-1.1,1.2-1.7,2.8-1.7,4.8c0,2.1,0.6,3.7,1.7,4.9c1.2,1.1,2.8,1.7,4.8,1.7s3.7-0.6,4.8-1.7C171.6,41.2,172.2,39.6,172.2,37.5z M181.1,19.2V48h6.1V19.2H181.1z M207.3,48v-2.9c-1.3,1.2-2.6,2.1-4.1,2.6c-1.4,0.5-3.1,0.8-4.9,0.8c-2.8,0-5-0.5-6.5-1.7c-1.5-1.1-2.3-2.7-2.3-4.8c0-2.3,1-4,3-5.2c2-1.1,5.1-1.7,9.3-1.9l5.2-0.1v-0.8c0-1.2-0.4-2.1-1.3-2.7c-0.9-0.6-2.1-1-3.7-1c-3.1,0-4.9,0.9-5.5,2.6l-5.5-0.5c0.4-2.1,1.6-3.7,3.4-4.7c1.9-1,4.5-1.5,7.8-1.5c7.1,0,10.7,2.8,10.7,8.3V48H207.3z M207.1,38.5l-5.1,0.1c-2.2,0-3.8,0.3-4.9,0.8c-1,0.5-1.5,1.2-1.5,2.2c0,0.9,0.4,1.5,1.1,2c0.8,0.5,1.9,0.7,3.3,0.7c1.1,0,2.2-0.1,3.2-0.4c1-0.3,1.8-0.7,2.4-1.3c1-0.8,1.6-1.8,1.6-3.1L207.1,38.5L207.1,38.5z M222,41.7c-0.6-0.8-0.8-1.7-0.9-2.8v0h18.6v-1.8c0-3.4-1.1-6.1-3.2-8c-2.1-1.9-5-2.9-8.9-2.9c-2.5,0-4.7,0.5-6.6,1.5c-1.9,1-3.3,2.3-4.3,4.1c-1,1.7-1.5,3.7-1.5,5.9c0,3.4,1.1,6.1,3.2,8c2.2,1.9,5.2,2.9,9.1,2.9c3.4,0,6.1-0.6,8-1.8c2-1.2,3.2-3,3.8-5.4h-5.7c-0.8,1.9-2.8,2.9-5.9,2.9c-1.3,0-2.5-0.2-3.5-0.7C223.3,43.2,222.6,42.5,222,41.7z M232.3,31.8c1.1,0.8,1.7,1.9,1.8,3.4h-12.8c0.1-1.3,0.8-2.5,2-3.4c1.2-0.9,2.6-1.3,4.4-1.3C229.6,30.6,231.2,31,232.3,31.8z"
      />
    </svg>
  );
}
