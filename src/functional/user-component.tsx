import React, { useEffect, useState } from "react";
import { getUser } from "./user-service";
import type { User } from "../types";

const UserComponent: React.FC = () => {
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<{ message: string } | null>(null);
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const fetchUser = async () => {
      setBusy(true);
      setError(null);

      try {
        const userData = await getUser(1);

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
  }, []);

  return (
    <div>
      {user && <p>User: {user.name}</p>}
      {busy && <p>Loading user...</p>}
      {error && <p>Error: {error.message}</p>}
    </div>
  );
};

export { UserComponent }