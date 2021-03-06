/* eslint-disable import/prefer-default-export */
import { userService } from '@services';
import { catchAsync } from '@utils/error-utils';
import { transformRoleString } from '@utils/role-utils';
import { genSalt, hash } from 'bcrypt';
import { Response, Request } from 'express';
import { UserPostRequest } from '../../../types/user-api';

export const createUser = catchAsync(async (req: UserPostRequest, res: Response) => {
	const salt = await genSalt(10);
	const hashedPassword = await hash(req.body.password, salt);

	const createdUser = await userService.createUser({
		...req.body,
		password: hashedPassword,
		role: transformRoleString(req.body.role)
	});
	return res.json(createdUser);
});

export const getAllUsers = catchAsync(async (req: Request, res: Response) => {
	const users = await userService.getAllUsers();

	return res.json(users);
});

export default { createUser, getAllUsers };
