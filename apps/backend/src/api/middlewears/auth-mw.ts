/* eslint-disable arrow-body-style */
import ApiError from '@errors/ApiError';
import { UserRole } from '@prisma/client';
import { getAboveRoles } from '@utils/role-utils';
import { Request, Response, NextFunction } from 'express';

/**
 * Check if a user has a permission role for a request.
 *
 * @param role Role to be required
 * @param allowAbove Allow acess to roles above the specfied {role}
 */
export const requireRole = (role: UserRole, allowAbove = false) => {
	return (req: Request, res: Response, next: NextFunction) => {
		/* TODO Return before next; */
		if (!req.session?.user || !req.session?.user?.role) return next(new ApiError('Unauthrized, you must be logged.'));
		const sessionRole = req.session?.user?.role;

		if (allowAbove ? !getAboveRoles(role).includes(sessionRole) : sessionRole !== role)
			return next(new ApiError("Unauthrized, you don't have sufficient permissions"));

		return next();
	};
};

export const requireRoles = (...role: UserRole[]) => {
	return (req: Request, res: Response, next: NextFunction) => {
		if (!req.session?.user || !req.session?.user?.role) return next(new ApiError('Unauthrized, you must be logged.'));

		if (!role.includes(req.session.user.role))
			return next(new ApiError("Unauthrized, you don't have sufficient permissions"));

		return next();
	};
};

export default (req: Request, res: Response, next: NextFunction) => {
	if (!req.session.user) return next(new ApiError('Unauthorized, you must be logged in.'));

	return next();
};
