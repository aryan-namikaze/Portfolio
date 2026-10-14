import { useState } from 'react'

// Abstract artwork shown whenever a project image is missing. Easy to replace by adding the real image.
function Art({ kind }) {
  return (
    <svg className="art" viewBox="0 0 400 500" preserveAspectRatio="xMidYMid slice" aria-hidden="true" focusable="false">
      <g fill="none" stroke="#9665ff" strokeWidth="2">
        {kind === 'sun' && (
          <>
            <circle cx="200" cy="230" r="120" fill="#9665ff" fillOpacity="0.9" stroke="none" />
            {[0, 1, 2, 3, 4, 5].map((i) => (
              <rect key={i} x="60" y={210 + i * 22} width="280" height={4 + i * 2.5} fill="#000" stroke="none" />
            ))}
            <circle cx="200" cy="230" r="150" strokeOpacity="0.5" />
            <circle cx="200" cy="230" r="182" strokeOpacity="0.25" />
          </>
        )}
        {kind === 'ripple' && (
          <>
            {[30, 70, 110, 150, 190].map((r, i) => (
              <circle key={r} cx={150 + i * 22} cy="250" r={r} strokeOpacity={1 - i * 0.17} />
            ))}
            <circle cx="150" cy="250" r="14" fill="#f5f3ee" stroke="none" />
          </>
        )}
        {kind === 'wind' && (
          <>
            {[0, 1, 2, 3, 4, 5, 6].map((i) => (
              <path key={i} d={`M-20 ${120 + i * 40} C 90 ${60 + i * 40}, 190 ${210 + i * 40}, 420 ${110 + i * 40}`} strokeOpacity={0.9 - i * 0.1} strokeWidth={i === 3 ? 6 : 2} />
            ))}
            <circle cx="300" cy="110" r="26" fill="#f5f3ee" stroke="none" />
          </>
        )}
      </g>
    </svg>
  )
}

export default function ProjectVisual({ project }) {
  const [failed, setFailed] = useState(false)
  const showImage = project.image && !failed
  return (
    <div className="proj__media">
      {showImage ? (
        <img
          src={project.image}
          alt={`${project.title}: app interface preview`}
          decoding="async"
          onError={() => setFailed(true)}
        />
      ) : (
        <>
          <Art kind={project.art} />
          {import.meta.env.DEV && project.image && <small className="proj__missing">Add {project.image} to /public</small>}
        </>
      )}
    </div>
  )
}
