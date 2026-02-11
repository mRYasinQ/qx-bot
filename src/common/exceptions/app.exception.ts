interface AppErrorOptions {
  isOperational?: boolean;
  quitScene?: boolean;
}

class AppError extends Error {
  public readonly isOperational: boolean;
  public readonly quitScene: boolean;

  constructor(message: string, options?: AppErrorOptions) {
    super(message);

    this.message = message;
    this.isOperational = options?.isOperational ?? true;
    this.quitScene = options?.quitScene ?? true;

    Object.setPrototypeOf(this, AppError.prototype);
  }
}

export type { AppErrorOptions };
export default AppError;
