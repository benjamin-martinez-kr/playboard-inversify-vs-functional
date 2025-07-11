import type { IUserService } from "./types";
import type { User } from "../types";

import React, { useEffect, useState } from "react";

import { useBinding } from "./inversify";
import { TYPES } from "./inversify-types";

const InversifyUserComponent: React.FC = () => {
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<{ message: string } | null>(null);
  const [user, setUser] = useState<User | null>(null);

  const userService = useBinding<IUserService>(TYPES.UserService);

  useEffect(() => {
    const fetchUser = async () => {
      setBusy(true);
      setError(null);

      try {
        const userData = await userService.getUser(1);

        setUser(userData);
      } catch (error) {
        setError({
          message: (error as Error).message ?? "Failed to fetch user"
        });
      } finally {
        setBusy(false);
      }
    };

    fetchUser();
  }, [userService]);

  return (
    <div>
      {user && <p>User: {user.name}</p>}
      {busy && <p>Loading user...</p>}
      {error && <p>Error: {error.message}</p>}
    </div>
  );
};

export { InversifyUserComponent }