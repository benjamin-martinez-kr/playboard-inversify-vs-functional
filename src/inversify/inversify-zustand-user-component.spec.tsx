import type { IUserService } from './types';

import '@testing-library/jest-dom';
import { render, screen, waitFor } from '@testing-library/react';
import { vi } from 'vitest';

import { InversifyZustandUserComponent } from './inversify-zustand-user-component';
import { InversifyContext } from './context';
import { container } from './inversify';
import { TYPES } from './inversify-types';

describe('InversifyZustandUserComponent', () => {
  let getUserMock: ReturnType<typeof vi.fn>;
  let userServiceMock: IUserService;

  beforeEach(() => {
    vi.clearAllMocks();

    getUserMock = vi.fn().mockResolvedValue({ id: 1, name: "Mock User" });

    userServiceMock = { getUser: getUserMock };

    // Ensure all bindings are cleared before each test run to truly isolate tests
    container.unbindAll();
    container.bind<IUserService>(TYPES.UserService).toConstantValue(userServiceMock);
  });

  const TestUserComponent = () => (
    <InversifyContext.Provider value={{ container, refresh: vi.fn() }}>
      <InversifyZustandUserComponent />
    </InversifyContext.Provider>
  );

  test('fetches and displays user data', async () => {
    render(<TestUserComponent />);

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

    render(<TestUserComponent />);

    await waitFor(() => {
      expect(screen.getByText('Loading user...')).toBeInTheDocument();
    });

    await waitFor(() => {
      expect(screen.getByText('Error: fail')).toBeInTheDocument();
    });
  });
});