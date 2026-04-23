export interface Logger {
  info(msg: string): void;
  error(msg: string): void;
  warn(msg: string): void;
  debug(msg: string): void;
}

const LOG_LEVELS = { debug: 0, info: 1, warn: 2, error: 3 } as const;
type LogLevel = keyof typeof LOG_LEVELS;

function getLogLevel(): LogLevel {
  const env = process.env.LOG_LEVEL?.toLowerCase();
  if (env && env in LOG_LEVELS) return env as LogLevel;
  if (process.env.DEBUG) return "debug";
  return "info";
}

const currentLevel = getLogLevel();
const shouldLog = (level: LogLevel) => LOG_LEVELS[level] >= LOG_LEVELS[currentLevel];

export const logger: Logger = {
  info: (msg) => { if (shouldLog("info")) console.log(`[INFO] ${msg}`); },
  error: (msg) => { if (shouldLog("error")) console.error(`[ERROR] ${msg}`); },
  warn: (msg) => { if (shouldLog("warn")) console.warn(`[WARN] ${msg}`); },
  debug: (msg) => { if (shouldLog("debug")) console.log(`[DEBUG] ${msg}`); },
};
