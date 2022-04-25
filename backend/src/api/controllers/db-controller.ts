/* eslint-disable vars-on-top */
/* eslint-disable no-var */
import config from '@config';
import { PrismaClient } from '@prisma/client';

declare global {
	var prisma: PrismaClient;
}

const databseURI = config.isProduction ? config.prodDatabaseURL : config.devDatabaseURL;
const prisma = global.prisma || new PrismaClient({ errorFormat: 'minimal', datasources: { db: { url: databseURI } } });

if (config.isDevelopment) global.prisma = prisma;

export const connectDb = async () => {
	try {
		await prisma.$connect();
		return 'Databse connection established successfully.';
	} catch (error) {
		process.exitCode = 1;
		return `Database connection failed!, ${error as string}`;
	}
};

export default prisma;
