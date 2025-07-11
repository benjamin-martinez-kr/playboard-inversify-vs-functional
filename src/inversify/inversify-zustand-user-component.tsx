import type { IUserService } from "./types";

import React, { useEffect } from "react";

import { useBinding } from "./inversify";
import { useInversifyStore } from "./state";
import { TYPES } from "./inversify-types";

const InversifyZustandUserComponent: React.FC = () => {
  const { busy, error, user, fetch } = useInversifyStore();

  const userService = useBinding<IUserService>(TYPES.UserService);

  useEffect(() => {
    fetch(1, userService);
  }, [fetch, userService]);

  return (
    <div>
      {user && <p>User: {user.name}</p>}
      {busy && <p>Loading user...</p>}
      {error && <p>Error: {error.message}</p>}
    </div>
  );
};

export { InversifyZustandUserComponent }