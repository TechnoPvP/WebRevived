import {
	PrismaClientInitializationError,
	PrismaClientKnownRequestError,
	PrismaClientRustPanicError,
	PrismaClientUnknownRequestError,
	PrismaClientValidationError
} from '@prisma/client/runtime';

/* Different Prisma Errors:

- PrismaClientKnownRequestError
- PrismaClientUnknownRequestError
- PrismaClientRustPanicError
- PrismaClientInitializationError
- PrismaClientValidationError
*/

type KnownErrorType = 'duplicate' | 'notfound' | 'unknown';
export type PrismaError =
	| PrismaClientKnownRequestError
	| PrismaClientKnownRequestError
	| PrismaClientRustPanicError
	| PrismaClientInitializationError
	| PrismaClientValidationError;

/* TODO Implement or delete */
export const parseErrorMessages = (code: string): KnownErrorType => {
	switch (code) {
		case 'P2003':
			return 'notfound';
		case 'P2002':
			return 'duplicate';
		default:
			return 'unknown';
	}
};

export class DatabaseError extends Error {
	message: string;

	status: string;

	statusCode: number;

	constructor(error: PrismaError) {
		super(error.message);

		this.message = error.message;

		this.statusCode = 500;

		if (error instanceof PrismaClientKnownRequestError) {
			this.status = error.code;
			this.statusCode = 400;
		}

		if (error instanceof PrismaClientUnknownRequestError) {
			this.status = 'unknown';
			this.statusCode = 500;
		}

		// TODO: Should this be an operational error
		if (error instanceof PrismaClientValidationError) {
			this.status = 'validation';
			this.statusCode = 400;
		}

		Error.captureStackTrace(this, this.constructor as typeof DatabaseError);
	}
}
