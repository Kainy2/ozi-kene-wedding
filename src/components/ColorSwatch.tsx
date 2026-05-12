interface ColorSwatchProps {
  name: string;
  hex: string;
  role?: 'primary' | 'secondary' | 'accent';
}

export default function ColorSwatch({ name, hex, role }: ColorSwatchProps) {
  const isPrimary = role === 'primary';
  const isSecondary = role === 'secondary';

  return (
    <div className="flex flex-col items-center gap-3">
      <div
        className={`rounded-full transition-all ${
          isPrimary || isSecondary
            ? 'w-28 h-28 md:w-32 md:h-32 shadow-xl'
            : 'w-20 h-20 md:w-24 md:h-24 shadow-lg'
        }`}
        style={{ backgroundColor: hex }}
      />
      <div className="text-center">
        <p
          className={`font-serif ${
            isPrimary || isSecondary
              ? 'text-lg md:text-xl font-semibold'
              : 'text-base md:text-lg'
          }`}
        >
          {name}
        </p>
        {isPrimary && (
          <span className="text-xs text-wedding-primary font-semibold uppercase tracking-wide">
            Primary
          </span>
        )}
        {isSecondary && (
          <span className="text-xs text-wedding-secondary font-semibold uppercase tracking-wide">
            Secondary
          </span>
        )}
        <p className="text-sm text-gray-600 mt-1">{hex}</p>
      </div>
    </div>
  );
}
