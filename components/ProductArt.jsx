// Original SVG product illustrations (no external images needed).
export default function ProductArt({ shape = "bottle", tint = "#caa07f", className = "" }) {
  const glass = "#f3ece4";
  const dark = "#2a2220";
  const shapes = {
    pump: (<g><rect x="78" y="40" width="44" height="14" rx="4" fill={dark}/><rect x="94" y="54" width="12" height="18" fill={dark}/><rect x="60" y="72" width="80" height="140" rx="16" fill={tint}/><rect x="72" y="110" width="56" height="50" rx="6" fill={glass} opacity=".85"/></g>),
    bottle: (<g><rect x="86" y="40" width="28" height="26" rx="4" fill={dark}/><rect x="66" y="66" width="68" height="146" rx="18" fill={tint}/><rect x="76" y="116" width="48" height="50" rx="6" fill={glass} opacity=".85"/></g>),
    dropper: (<g><ellipse cx="100" cy="46" rx="12" ry="22" fill={dark}/><rect x="80" y="64" width="40" height="16" rx="3" fill="#c9a86a"/><rect x="66" y="80" width="68" height="132" rx="14" fill={tint}/><rect x="76" y="120" width="48" height="46" rx="5" fill={glass} opacity=".8"/></g>),
    tube: (<g><path d="M72 212 L82 56 H118 L128 212 Z" fill={tint}/><rect x="80" y="40" width="40" height="20" rx="4" fill={dark}/><rect x="84" y="110" width="32" height="46" rx="4" fill={glass} opacity=".85"/></g>),
    jar: (<g><rect x="56" y="100" width="88" height="22" rx="6" fill={dark}/><rect x="60" y="122" width="80" height="84" rx="14" fill={tint}/><rect x="74" y="146" width="52" height="34" rx="5" fill={glass} opacity=".85"/></g>),
    crayon: (<g><path d="M82 54 L100 28 L118 54 Z" fill={tint}/><rect x="82" y="54" width="36" height="150" rx="5" fill={glass}/><rect x="82" y="150" width="36" height="54" rx="5" fill={tint} opacity=".35"/></g>),
    soap: (<g><rect x="46" y="130" width="108" height="64" rx="8" fill={tint}/><rect x="58" y="96" width="86" height="40" rx="6" fill="#d9bfd0"/><rect x="72" y="152" width="56" height="20" rx="3" fill={glass} opacity=".8"/></g>),
    brush: (<g><rect x="96" y="120" width="8" height="90" rx="4" fill={dark}/><path d="M84 124 Q100 40 116 124 Z" fill={tint}/><ellipse cx="62" cy="196" rx="30" ry="12" fill={tint} opacity=".6"/></g>),
  };
  return (
    <svg viewBox="0 0 200 240" className={className} role="img" aria-hidden="true">
      <ellipse cx="100" cy="218" rx="48" ry="7" fill="#000" opacity=".08" />
      {shapes[shape] || shapes.bottle}
    </svg>
  );
}
