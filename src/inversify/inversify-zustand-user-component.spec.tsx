import '@testing-library/jest-dom';
import { render, screen, waitFor } from '@testing-library/react';
import { vi } from 'vitest';
import { Container } from 'inversify';

import { InversifyZustandUserComponent } from './inversify-zustand-user-component';
import { InversifyContext } from './context';
import type { IUserService } from './types';
import { TYPES } from './inversify-types';

const getUserMock = vi.fn().mockResolvedValue({ id: 1, name: "Mock User" });

const userServiceMock: IUserService = {
  getUser: getUserMock
};

const container = new Container();
container.bind<IUserService>(TYPES.UserService).toConstantValue(userServiceMock);

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