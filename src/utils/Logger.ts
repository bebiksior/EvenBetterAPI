export enum LogLevel {
  INFO = "info",
  ERROR = "error",
  WARN = "warn",
}

const DEBUG = false;

export class Logger {
  log(level: LogLevel, message: string) {
    if (!DEBUG) return;
    
    const date = new Date();
    const prefix = `${date.toString()} [EvenBetterAPI]`;

    switch (level) {
      case LogLevel.INFO:
        console.log(`${prefix} [INFO] ${message}`);
        break;
      case LogLevel.ERROR:
        console.error(`${prefix} [ERROR] ${message}`);
        break;
      case LogLevel.WARN:
        console.warn(`${prefix} [WARN] ${message}`);
        break;
      default:
        console.log(`${prefix} [UNKNOWN] ${message}`);
    }
  }

  info(message: string) {
    this.log(LogLevel.INFO, message);
  }

  error(message: string) {
    this.log(LogLevel.ERROR, message);
  }

  warn(message: string) {
    this.log(LogLevel.WARN, message);
  }
}

const log = new Logger();
export default log;
