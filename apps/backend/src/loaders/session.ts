import session from 'express-session';
import { PrismaSessionStore } from '@quixo3/prisma-session-store';
import PrismaClient from '@common/db';
import { UserRole } from '@prisma/client';

const prismaStore = new PrismaSessionStore(PrismaClient, {
	checkPeriod: 2 * 60 * 1000
});

/* Instantiate session function */
export default session({
	secret: 'dk1m2k3m1kmdaw',
	cookie: {
		maxAge: 7 * 24 * 60 * 60 * 1000
	},
	store: prismaStore,
	resave: false,
	saveUninitialized: false
});

declare module 'express-session' {
	interface SessionData {
		user?: { email: string; id: number; role: UserRole };
	}
}
