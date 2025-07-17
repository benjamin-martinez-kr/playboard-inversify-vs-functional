import type { User } from '../types';
import type { IUserService } from './types';

import { act } from 'react';
import { vi } from 'vitest';
import { renderHook } from '@testing-library/react';

import { useInversifyStore } from './state';
import { container } from './inversify';
import { TYPES } from './inversify-types';

describe('useInversifyStore', () => {
  // Reset container and mocks before each test
  beforeEach(() => {
    vi.clearAllMocks();

    container.unbindAll();
  });

  // This blocks couples the state management to the Inversify container.
  // This is not ideal, but necessary to use Inversify with Zustand in this context.
  // Too much knowledge of the container internal bindings in order to write unit testing is required.
  const bindUserService = (service: IUserService) => {
    container.bind<IUserService>(TYPES.UserService).toConstantValue(service);
  };

  it('fetches user and updates state', async () => {
    const mockUser: User = { id: 1, name: 'Mock User' };
    const mockUserService = {
      getUser: vi.fn().mockResolvedValue(mockUser),
    };

    bindUserService(mockUserService);

    const { result } = renderHook(() => useInversifyStore());

    // Initial state
    expect(result.current.busy).toBe(false);
    expect(result.current.user).toBeNull();
    expect(result.current.error).toBeNull();

    // Call fetch
    await act(async () => {
      await result.current.fetch(1);
    });

    // After fetch
    expect(result.current.busy).toBe(false);
    expect(result.current.user).toEqual(mockUser);
    expect(result.current.error).toBeNull();
    expect(mockUserService.getUser).toHaveBeenCalledWith(1);
  });

  it('sets error on failed fetch', async () => {
    const errorService = {
      getUser: vi.fn().mockRejectedValue(new Error('fail')),
    };

    bindUserService(errorService);

    const { result } = renderHook(() => useInversifyStore());

    await act(async () => {
      await result.current.fetch(2);
    });

    expect(result.current.busy).toBe(false);
    expect(result.current.user).toBeNull();
    expect(result.current.error?.message).toBe('fail');
  });
});