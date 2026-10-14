/**
 * Abstract ink circle (ensō) + moon. Pure SVG, drawn with stroke-dasharray so it can be "painted" in.
 * Use a unique `id` per instance (the rough-edge filter needs one).
 */
export default function Enso({ id = 'enso', className = '' }) {
  return (
    <svg className={`enso ${className}`} viewBox="0 0 600 600" aria-hidden="true" focusable="false">
      <defs>
        <filter id={`${id}-rough`} x="-10%" y="-10%" width="120%" height="120%">
          <feTurbulence type="fractalNoise" baseFrequency="0.03" numOctaves="2" seed="7" result="n" />
          <feDisplacementMap in="SourceGraphic" in2="n" scale="12" />
        </filter>
      </defs>
      <g filter={`url(#${id}-rough)`} fill="none" strokeLinecap="round" transform="rotate(-70 300 300)">
        <circle className="enso__a" cx="300" cy="300" r="236" pathLength="100" strokeDasharray="92 8" strokeWidth="15" stroke="#9665ff" />
        <circle className="enso__b" cx="300" cy="300" r="250" pathLength="100" strokeDasharray="58 42" strokeWidth="3" stroke="#f5f3ee" strokeOpacity="0.55" />
        <circle className="enso__c" cx="300" cy="300" r="222" pathLength="100" strokeDasharray="30 70" strokeWidth="2" stroke="#9665ff" strokeOpacity="0.6" />
      </g>
      <circle className="enso__moon" cx="398" cy="196" r="34" fill="#f5f3ee" />
    </svg>
  )
}
