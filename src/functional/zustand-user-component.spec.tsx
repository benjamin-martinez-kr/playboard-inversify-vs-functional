import '@testing-library/jest-dom';
import { render, screen, waitFor } from '@testing-library/react';
import { vi, type Mock } from 'vitest';
import { ZustandUserComponent } from './zustand-user-component';
import { getUser } from './user-service';

vi.mock('./user-service', () => ({
  getUser: vi.fn().mockResolvedValue({ id: 1, name: 'Mock User' }),
}));

const getUserMock = getUser as Mock;

describe('ZustandUserComponent', () => {
  test('fetches and displays user data', async () => {
    render(<ZustandUserComponent />);

    await waitFor(() => {
      expect(screen.getByText('User: Mock User')).toBeInTheDocument();
    });

    expect(getUserMock).toHaveBeenCalledWith(1);
  });

  test('shows loading and error states', async () => {
    getUserMock.mockRejectedValueOnce(new Error('fail'));

    render(<ZustandUserComponent />);

    await waitFor(() => {
      expect(screen.getByText('Loading user...')).toBeInTheDocument();
    });

    await waitFor(() => {
      expect(screen.getByText('Error: fail')).toBeInTheDocument();
    });
  });
});