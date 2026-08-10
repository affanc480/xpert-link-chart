'use client';

export function Divider({ label = 'OR' }) {
  return (
    <div className="flex items-center gap-4 my-7">
      <span className="h-px flex-1 bg-gradient-to-r from-transparent via-black/10 dark:via-white/15 to-black/10 dark:to-white/15" />
      <span className="text-xs font-medium tracking-wider text-gray-400 dark:text-gray-500">
        {label}
      </span>
      <span className="h-px flex-1 bg-gradient-to-r from-black/10 dark:from-white/15 via-black/10 dark:via-white/15 to-transparent" />
    </div>
  );
}
