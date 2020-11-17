import ExtendableError from 'es6-error';

const ERROR_PREFIX = 'Error: ';

export const ErrorCodes = {
  INVALID_PROJECT_DIR: 'INVALID_PROJECT_DIR',
  INVALID_PROJECT_NAME: 'INVALID_PROJECT_NAME',
  INVALID_PUBLIC_URL: 'INVALID_PUBLIC_URL',
  NOT_LOGGED_IN: 'NOT_LOGGED_IN',
  NON_INTERACTIVE: 'NON_INTERACTIVE',
  BAD_CHOICE: 'BAD_CHOICE',
  MISSING_PUBLIC_URL: 'MISSING_PUBLIC_URL',
  APPLE_DIST_CERTS_TOO_MANY_GENERATED_ERROR: 'APPLE_DIST_CERTS_TOO_MANY_GENERATED_ERROR',
  APPLE_PUSH_KEYS_TOO_MANY_GENERATED_ERROR: 'APPLE_PUSH_KEYS_TOO_MANY_GENERATED_ERROR',
  MISSING_SLUG: 'MISSING_SLUG',
  PROJECT_NOT_FOUND: 'PROJECT_NOT_FOUND',
};

export type ErrorCode = keyof typeof ErrorCodes;

export default class CommandError extends ExtendableError {
  code: string;
  isCommandError: true;

  constructor(code: string, message: string = '') {
    // If e.toString() was called to get `message` we don't want it to look
    // like "Error: Error:".
    if (message.startsWith(ERROR_PREFIX)) {
      message = message.substring(ERROR_PREFIX.length);
    }

    super(message || code);

    this.code = code;
    this.isCommandError = true;
  }
}

export class AbortCommandError extends CommandError {
  constructor() {
    super('ABORTED', 'Interactive prompt was cancelled.');
  }
}

/**
 * Used to end a CLI process without printing a stack trace in the Expo CLI. Should be used in favor of `process.exit`.
 */
export class SilentError extends CommandError {
  constructor(messageOrError?: string | Error) {
    const message =
      (typeof messageOrError === 'string' ? messageOrError : messageOrError?.message) ??
      'This error should fail silently in the CLI';
    super('SILENT', message);
    if (typeof messageOrError !== 'string') {
      // forward the props of the incoming error for tests or processes outside of expo-cli that use expo cli internals.
      this.stack = messageOrError?.stack ?? this.stack;
      this.name = messageOrError?.name ?? this.name;
    }
  }
}
