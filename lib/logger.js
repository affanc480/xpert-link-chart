const levels = ["debug", "info", "warn", "error"];

function log(level, message, meta) {
  const entry = {
    level,
    message,
    ...(meta ? { meta } : {}),
    timestamp: new Date().toISOString(),
  };
  const line = JSON.stringify(entry);
  if (level === "error") console.error(line);
  else if (level === "warn") console.warn(line);
  else console.log(line);
}

export const logger = Object.fromEntries(
  levels.map((level) => [level, (message, meta) => log(level, message, meta)])
);
