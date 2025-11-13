export default function EmbLogo({ className = "" }) {
  return (
    <svg width="120" height="140" viewBox="0 0 120 140" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
      <defs>
        <linearGradient id="purpleGrad" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#f3e8ff" />
          <stop offset="50%" stopColor="#c084fc" />
          <stop offset="100%" stopColor="#9333ea" />
        </linearGradient>
      </defs>
      
      {/* E */}
      <g>
        {/* Barra vertical izquierda con gaps */}
        <rect x="10" y="5" width="18" height="12" fill="url(#purpleGrad)" />
        <rect x="10" y="20" width="18" height="12" fill="url(#purpleGrad)" />
        <rect x="10" y="35" width="18" height="12" fill="url(#purpleGrad)" />
        {/* Barra horizontal superior */}
        <rect x="10" y="5" width="90" height="12" fill="url(#purpleGrad)" />
        {/* Barra horizontal media */}
        <rect x="10" y="20.5" width="70" height="12" fill="url(#purpleGrad)" />
        {/* Barra horizontal inferior */}
        <rect x="10" y="35" width="90" height="12" fill="url(#purpleGrad)" />
      </g>
      
      {/* M */}
      <g>
        {/* Barra izquierda con gaps */}
        <rect x="10" y="57" width="18" height="12" fill="url(#purpleGrad)" />
        <rect x="10" y="72" width="18" height="12" fill="url(#purpleGrad)" />
        <rect x="10" y="87" width="18" height="12" fill="url(#purpleGrad)" />
        {/* Pico izquierdo */}
        <polygon points="28,57 40,72 46,57" fill="url(#purpleGrad)" />
        {/* Barra central izquierda con gaps */}
        <rect x="40" y="70" width="12" height="10" fill="url(#purpleGrad)" />
        <rect x="40" y="83" width="12" height="16" fill="url(#purpleGrad)" />
        {/* Barra central derecha con gaps */}
        <rect x="58" y="70" width="12" height="10" fill="url(#purpleGrad)" />
        <rect x="58" y="83" width="12" height="16" fill="url(#purpleGrad)" />
        {/* Pico derecho */}
        <polygon points="64,57 70,72 82,57" fill="url(#purpleGrad)" />
        {/* Barra derecha con gaps */}
        <rect x="82" y="57" width="18" height="12" fill="url(#purpleGrad)" />
        <rect x="82" y="72" width="18" height="12" fill="url(#purpleGrad)" />
        <rect x="82" y="87" width="18" height="12" fill="url(#purpleGrad)" />
      </g>
      
      {/* B */}
      <g>
        {/* Barra vertical izquierda con gaps */}
        <rect x="10" y="109" width="18" height="10" fill="url(#purpleGrad)" />
        <rect x="10" y="122" width="18" height="10" fill="url(#purpleGrad)" />
        {/* Curva superior */}
        <path d="M 28 109 L 75 109 Q 90 109 90 119 Q 90 122 82 124 L 28 124 L 28 109" fill="url(#purpleGrad)" />
        {/* Curva inferior */}
        <path d="M 28 124 L 82 124 Q 95 124 95 132 Q 95 137 75 137 L 28 137 L 28 124" fill="url(#purpleGrad)" />
      </g>
    </svg>
  )
}
