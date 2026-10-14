/**
 * Headline split into masked lines (and optionally characters) for reveal animations.
 * The visible pieces are aria-hidden; the heading itself carries the full text.
 */
export default function Lines({ lines, as: Tag = 'span', className = '', chars = false }) {
  return (
    <Tag className={className} aria-label={lines.join(' ')}>
      {lines.map((line, i) => (
        <span className="line" key={i} aria-hidden="true">
          <span className="line__in">
            {chars
              ? line.split(' ').map((word, w) => (
                  <span className="word" key={w}>
                    {word.split('').map((c, k) => (
                      <span className="ch" key={k}>
                        {c}
                      </span>
                    ))}
                  </span>
                ))
              : line}
          </span>
        </span>
      ))}
    </Tag>
  )
}
