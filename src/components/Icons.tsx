import type { ProductFinish } from '../data/catalog';

export const WhatsAppIcon = ({
  size = 24,
  className = '',
}: {
  size?: number;
  className?: string;
}) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="currentColor"
    className={className}
    aria-hidden="true"
  >
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M12.04 2C6.58 2 2.13 6.45 2.13 11.91c0 1.75.46 3.45 1.32 4.95L2.05 22l5.25-1.38c1.45.79 3.08 1.21 4.74 1.21 5.46 0 9.91-4.45 9.91-9.91 0-2.65-1.03-5.14-2.9-7.01A9.816 9.816 0 0 0 12.04 2zm.01 1.67c2.2 0 4.26.86 5.82 2.42a8.225 8.225 0 0 1 2.41 5.83c0 4.54-3.7 8.23-8.24 8.23-1.48 0-2.93-.39-4.19-1.15l-.3-.18-3.12.82.83-3.04-.2-.31a8.18 8.18 0 0 1-1.26-4.38c.01-4.54 3.7-8.24 8.25-8.24z"
    />
    <path d="M8.53 7.33c-.16 0-.43.06-.66.31-.22.25-.87.85-.87 2.07 0 1.22.89 2.4 1.01 2.56.12.17 1.72 2.75 4.24 3.75 2.09.83 2.52.66 2.97.62.45-.04 1.47-.6 1.67-1.18.21-.58.21-1.08.15-1.18-.07-.1-.23-.17-.48-.29-.25-.13-1.47-.73-1.7-.81-.23-.08-.39-.12-.56.13-.17.25-.64.81-.79.97-.14.17-.29.19-.54.06-.25-.12-1.05-.39-2-1.23-.74-.66-1.24-1.47-1.38-1.72-.14-.25-.02-.38.11-.51.11-.11.25-.29.37-.43.12-.15.17-.25.25-.42.08-.17.04-.31-.02-.43-.06-.13-.54-1.34-.76-1.84-.19-.45-.39-.4-.55-.41h-.47z" />
  </svg>
);

export const WazeIcon = ({
  size = 20,
  className = '',
}: {
  size?: number;
  className?: string;
}) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="currentColor"
    className={className}
    aria-hidden="true"
  >
    <path d="M20.54 10.61C20.54 6.23 16.77 3 12.24 3 7.77 3 4.35 6.08 4.22 10.33c-.05 1.54-.52 2.47-1.56 2.91-.41.17-.66.58-.66 1.03 0 .74.59 1.24 1.22 1.43.82.25 1.77.59 2.75.9a2.35 2.35 0 0 0 4.53.55h2.28a2.35 2.35 0 0 0 4.55-.64c1.95-1.05 3.21-3.19 3.21-5.9zM8.25 18.6a1.1 1.1 0 1 1 0-2.2 1.1 1.1 0 0 1 0 2.2zm6.8 0a1.1 1.1 0 1 1 0-2.2 1.1 1.1 0 0 1 0 2.2zm.72-4.02c-.9.88-2.16 1.32-3.65 1.32-1.48 0-2.74-.44-3.64-1.32a.68.68 0 0 1 .95-.97c.64.62 1.56.94 2.69.94s2.06-.32 2.7-.94a.68.68 0 1 1 .95.97zM10.1 10.7a1.05 1.05 0 1 1 0-2.1 1.05 1.05 0 0 1 0 2.1zm4.6 0a1.05 1.05 0 1 1 0-2.1 1.05 1.05 0 0 1 0 2.1z" />
  </svg>
);

export function PhoneStudioVisual({
  modelName,
  finish,
  cameraLayout,
}: {
  modelName: string;
  finish: ProductFinish;
  cameraLayout: 'dual' | 'triple-pro';
}) {
  const isProMax = modelName.includes('Pro Max');
  const isLightBody = finish.name === 'Estelar';

  return (
    <div className="relative w-full h-full flex items-center justify-center bg-linear-to-b from-[#17171A] via-[#0E0E11] to-[#08080A] overflow-hidden select-none">
      {/* Soft warm studio rim glow matching Power Tec palette */}
      <div
        className="absolute w-52 h-52 rounded-full blur-3xl opacity-25 pointer-events-none transition-colors duration-500"
        style={{ background: finish.frameColor }}
      />
      <div className="absolute -bottom-12 w-56 h-24 rounded-full bg-brand-orange/20 blur-2xl pointer-events-none" />

      {/* Realistic precision smartphone hardware silhouette */}
      <svg
        viewBox="0 0 240 320"
        className={`relative z-10 drop-shadow-[0_24px_34px_rgba(0,0,0,0.75)] transition-transform duration-500 group-hover:scale-[1.04] ${
          isProMax ? 'w-[70%]' : 'w-[64%]'
        } h-auto`}
        role="img"
        aria-label={`${modelName} em acabamento ${finish.name}`}
      >
        <defs>
          <linearGradient id={`frame-${modelName}-${finish.name}`} x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor={finish.frameColor} />
            <stop offset="45%" stopColor={finish.bodyColor} />
            <stop offset="100%" stopColor={finish.frameColor} />
          </linearGradient>
          <linearGradient id={`glass-${modelName}-${finish.name}`} x1="15%" y1="0%" x2="85%" y2="100%">
            <stop offset="0%" stopColor={finish.frameColor} stopOpacity="0.35" />
            <stop offset="35%" stopColor={finish.bodyColor} stopOpacity="1" />
            <stop offset="100%" stopColor="#09090B" stopOpacity="0.45" />
          </linearGradient>
          <radialGradient id={`lens-${modelName}`} cx="35%" cy="32%" r="65%">
            <stop offset="0%" stopColor="#3B4D7A" />
            <stop offset="35%" stopColor="#121624" />
            <stop offset="75%" stopColor="#07080C" />
            <stop offset="100%" stopColor="#1B2233" />
          </radialGradient>
        </defs>

        {/* Side action/power buttons */}
        <rect x="206" y="96" width="3" height="32" rx="1.5" fill={finish.frameColor} />
        <rect x="31" y="84" width="3" height="16" rx="1.5" fill={finish.frameColor} />
        <rect x="31" y="110" width="3" height="26" rx="1.5" fill={finish.frameColor} />
        <rect x="31" y="142" width="3" height="26" rx="1.5" fill={finish.frameColor} />

        {/* Outer metallic frame */}
        <rect
          x="34"
          y="16"
          width="172"
          height="288"
          rx="32"
          fill={`url(#frame-${modelName}-${finish.name})`}
        />

        {/* Matte frosted rear glass */}
        <rect
          x="39"
          y="21"
          width="162"
          height="278"
          rx="28"
          fill={finish.bodyColor}
        />
        <rect
          x="39"
          y="21"
          width="162"
          height="278"
          rx="28"
          fill={`url(#glass-${modelName}-${finish.name})`}
        />

        {/* Subtle vertical light sheen */}
        <rect
          x="44"
          y="26"
          width="52"
          height="268"
          rx="22"
          fill="#FFFFFF"
          opacity={isLightBody ? '0.18' : '0.05'}
        />

        {/* Camera module */}
        {cameraLayout === 'triple-pro' ? (
          <g>
            {/* Pro plateau */}
            <rect
              x="51"
              y="33"
              width="78"
              height="78"
              rx="20"
              fill={finish.bodyColor}
              stroke={finish.frameColor}
              strokeOpacity="0.65"
              strokeWidth="1.5"
            />
            <rect
              x="52.5"
              y="34.5"
              width="75"
              height="75"
              rx="18.5"
              fill="#000000"
              fillOpacity="0.18"
            />

            {/* Lens 1 (top-left) */}
            <circle cx="71" cy="53" r="15" fill={finish.lensRing} />
            <circle cx="71" cy="53" r="12.5" fill="#0B0C10" />
            <circle cx="71" cy="53" r="8.2" fill={`url(#lens-${modelName})`} />
            <circle cx="68.5" cy="50.5" r="2" fill="#93C5FD" fillOpacity="0.5" />

            {/* Lens 2 (bottom-left) */}
            <circle cx="71" cy="91" r="15" fill={finish.lensRing} />
            <circle cx="71" cy="91" r="12.5" fill="#0B0C10" />
            <circle cx="71" cy="91" r="8.2" fill={`url(#lens-${modelName})`} />
            <circle cx="68.5" cy="88.5" r="2" fill="#93C5FD" fillOpacity="0.5" />

            {/* Lens 3 (right-middle) */}
            <circle cx="107" cy="72" r="15" fill={finish.lensRing} />
            <circle cx="107" cy="72" r="12.5" fill="#0B0C10" />
            <circle cx="107" cy="72" r="8.2" fill={`url(#lens-${modelName})`} />
            <circle cx="104.5" cy="69.5" r="2" fill="#93C5FD" fillOpacity="0.5" />

            {/* True Tone Flash & LiDAR */}
            <circle cx="107" cy="46" r="5" fill="#FDE68A" fillOpacity="0.8" />
            <circle cx="107" cy="98" r="5.5" fill="#18181B" stroke={finish.lensRing} strokeWidth="1" />
          </g>
        ) : (
          <g>
            {/* Vertical pill camera island */}
            <rect
              x="54"
              y="35"
              width="38"
              height="76"
              rx="19"
              fill={finish.bodyColor}
              stroke={finish.frameColor}
              strokeOpacity="0.65"
              strokeWidth="1.5"
            />
            <rect
              x="55.5"
              y="36.5"
              width="35"
              height="73"
              rx="17.5"
              fill="#000000"
              fillOpacity="0.2"
            />
            {/* Top lens */}
            <circle cx="73" cy="55" r="13.5" fill={finish.lensRing} />
            <circle cx="73" cy="55" r="11" fill="#0B0C10" />
            <circle cx="73" cy="55" r="7.2" fill={`url(#lens-${modelName})`} />
            <circle cx="70.5" cy="52.5" r="1.8" fill="#93C5FD" fillOpacity="0.5" />

            {/* Bottom lens */}
            <circle cx="73" cy="91" r="13.5" fill={finish.lensRing} />
            <circle cx="73" cy="91" r="11" fill="#0B0C10" />
            <circle cx="73" cy="91" r="7.2" fill={`url(#lens-${modelName})`} />
            <circle cx="70.5" cy="88.5" r="1.8" fill="#93C5FD" fillOpacity="0.5" />

            {/* Side Flash */}
            <circle cx="103" cy="73" r="4.5" fill="#FDE68A" fillOpacity="0.8" />
          </g>
        )}

        {/* Minimalist center emblem mark */}
        <circle
          cx="120"
          cy="168"
          r="13"
          fill={isLightBody ? '#18181B' : '#FFFFFF'}
          fillOpacity={isLightBody ? '0.12' : '0.1'}
        />
      </svg>

      {/* Subtle finish caption in corner */}
      <span className="absolute bottom-3 left-3 text-[11px] font-medium text-white/65 tracking-wide">
        {finish.name}
      </span>
    </div>
  );
}
