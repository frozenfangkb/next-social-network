import { adaptUserSchemaToModel } from './user-adapters';
import { UserSchema } from './types.ts';
import { User } from '../models/user.ts';
import { it, describe, expect } from 'vitest';

describe('adaptUserSchemaToModel', () => {
  it('should return a User object when given a UserSchema object', () => {
    const userSchema: UserSchema = {
      id: 1,
      name: 'John Doe',
      username: 'johndoe',
      email: 'john.doe@example.com',
      address: {
        street: '123 Main St',
        suite: 'Apt. 1',
        city: 'Hometown',
        zipcode: '12345',
        geo: {
          lat: '12.3456',
          lng: '65.4321',
        },
      },
      phone: '555-5555',
      website: 'johndoe.com',
      company: {
        name: 'Doe Industries',
        catchPhrase: 'Innovate and Inspire',
        bs: 'business solutions',
      },
    };

    const expectedUser: User = userSchema;

    expect(adaptUserSchemaToModel(userSchema)).toEqual(expectedUser);
  });
});
