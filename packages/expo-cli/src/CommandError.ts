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

export default class CommandError extends Error {
  readonly name = 'CommandError';
  readonly isCommandError = true;
  code: string;

  constructor(code: string, message: string = '') {
    super('');
    // If e.toString() was called to get `message` we don't want it to look
    // like "Error: Error:".
    if (message.startsWith(ERROR_PREFIX)) {
      message = message.substring(ERROR_PREFIX.length);
    }

    this.message = message || code;
    this.code = code;
  }
}
export class AbortCommandError extends CommandError {
  constructor() {
    super('ABORTED', 'Interactive prompt was cancelled.');
  }
}
