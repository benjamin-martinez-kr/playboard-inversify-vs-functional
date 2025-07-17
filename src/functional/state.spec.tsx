import { act } from '@testing-library/react';
import { renderHook } from '@testing-library/react';
import { vi, type Mock } from 'vitest';
import { useStore } from './state';
import { getUser } from './user-service';

vi.mock('./user-service', () => ({
  getUser: vi.fn().mockResolvedValue({ id: 1, name: 'Mock User' })
}));

const getUserMock = getUser as Mock;

describe('useStore', () => {
  it('fetches user and updates state', async () => {
    const { result } = renderHook(() => useStore());

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
    expect(result.current.user).toEqual({ id: 1, name: 'Mock User' });
    expect(result.current.error).toBeNull();
    expect(getUserMock).toHaveBeenCalledWith(1);
  });

  it('sets error on failed fetch', async () => {
    getUserMock.mockRejectedValueOnce(new Error('fail'));
    const { result } = renderHook(() => useStore());

    await act(async () => {
      await result.current.fetch(2);
    });

    expect(result.current.busy).toBe(false);
    expect(result.current.user).toBeNull();
    expect(result.current.error?.message).toBe('fail');
  });
});