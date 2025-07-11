import type { User } from '../types';

import { act } from 'react';
import { vi } from 'vitest';
import { renderHook } from '@testing-library/react';

import { useInversifyStore } from './state';

describe('useInversifyStore', () => {
  it('fetches user and updates state', async () => {
    const mockUser: User = { id: 1, name: 'Mock User' };
    const mockUserService = {
      getUser: vi.fn().mockResolvedValue(mockUser),
    };

    const { result } = renderHook(() => useInversifyStore());

    // Initial state
    expect(result.current.busy).toBe(false);
    expect(result.current.user).toBeNull();
    expect(result.current.error).toBeNull();

    // Call fetch
    await act(async () => {
      await result.current.fetch(1, mockUserService);
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
    const { result } = renderHook(() => useInversifyStore());

    await act(async () => {
      await result.current.fetch(2, errorService);
    });

    expect(result.current.busy).toBe(false);
    expect(result.current.user).toBeNull();
    expect(result.current.error?.message).toBe('fail');
  });
});