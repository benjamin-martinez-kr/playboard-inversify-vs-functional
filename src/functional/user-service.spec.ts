import { vi, type Mock } from 'vitest';
import { getUser } from './user-service';
import { log } from './console-logger-service';

vi.mock('./console-logger-service', () => ({
  log: vi.fn(),
}));
const logMock = log as Mock;

describe('getUser', () => {
  it('logs and returns user data', async () => {
    const user = await getUser(5);

    expect(logMock).toHaveBeenCalledWith('Fetching user with id 5');
    expect(user).toEqual({ id: 5, name: 'User 5' });

    logMock.mockRestore();
  });
});