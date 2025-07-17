import { render, screen, waitFor } from '@testing-library/react';
import { vi, type Mock } from 'vitest';
import { UserComponent } from './user-component';
import { getUser } from './user-service';

vi.mock('./user-service', () => ({
  getUser: vi.fn().mockResolvedValue({ id: 1, name: 'Mock User' }),
}));

const getUserMock = getUser as Mock;

describe('UserComponent', () => {
  test('fetches and displays user data', async () => {
    render(<UserComponent />);

    await waitFor(() => {
      expect(screen.getByText('Loading user...')).toBeInTheDocument();
    });

    await waitFor(() => {
      expect(screen.getByText('User: Mock User')).toBeInTheDocument();
    });

    expect(getUserMock).toHaveBeenCalledWith(1);
  });

  test('shows error on fetch failure', async () => {
    getUserMock.mockRejectedValueOnce(new Error('fail'));

    render(<UserComponent />);

    await waitFor(() => {
      expect(screen.getByText('Loading user...')).toBeInTheDocument();
    });

    await waitFor(() => {
      expect(screen.getByText('Error: fail')).toBeInTheDocument();
    });
  });
});