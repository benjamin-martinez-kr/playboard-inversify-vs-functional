import type { ILogger } from './types';

import { vi } from 'vitest';
import { UserService } from './user-service';

describe('UserService', () => {
  it('logs and returns user data', async () => {
    const loggerMock: ILogger = { log: vi.fn() };
    const userService = new UserService(loggerMock);

    const user = await userService.getUser(5);

    expect(loggerMock.log).toHaveBeenCalledWith('Fetching user with id 5');
    expect(user).toEqual({ id: 5, name: 'John Doe' });
  });
});