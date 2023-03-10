type Props = {
  width?: number
  height?: number
  strokeWidth?: number
  className?: string
}

export default function Logo({
  width = 100,
  height = 100,
  strokeWidth = 2,
  className,
}: Props) {
  let logoClassName = 'fill-none stroke-slate-700'

  if (className) {
    logoClassName += ` ${className}`
  }

  return (
    <svg
      height={`${height}px`}
      width={`${width}px`}
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 270 270"
      strokeWidth={strokeWidth}
      className={logoClassName}
    >
      <g>
        <path
          d="M47.943,110.943l12.109,145.303C60.7,264.02,67.199,270,75,270h120c7.802,0,14.301-5.98,14.949-13.754
		l12.107-145.303C233.176,102.538,240,89.229,240,75c0-11.634-4.507-22.693-12.367-30.976l2.316-27.778
		c0.348-4.181-1.07-8.316-3.91-11.403C223.199,1.756,219.195,0,215,0H55c-4.194,0-8.197,1.756-11.037,4.843
		c-2.841,3.087-4.259,7.222-3.91,11.402l2.314,27.779C34.508,52.308,30,63.367,30,75C30,89.229,36.824,102.538,47.943,110.943z"
        />
      </g>
    </svg>
  )
}
