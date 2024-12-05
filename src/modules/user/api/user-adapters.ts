import { UserSchema } from './types.ts';
import { User } from '../models/user.ts';

/**
 * Transforms a UserSchema object to a User object. Currently is a dummy adapter since this is a defensive
 * programming pattern to increase resilience in the front app.
 *
 * @param {UserSchema} user - The user data that conforms to the UserSchema type.
 * @returns {User} The input user data interpreted as a User type.
 */
export const adaptUserSchemaToModel = (user: UserSchema): User => user as User;
