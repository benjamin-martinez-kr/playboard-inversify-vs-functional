
import React, { useEffect } from "react";

import { useInversifyStore } from "./state";

const InversifyZustandUserComponent: React.FC = () => {
  const { busy, error, user, fetch } = useInversifyStore();

  useEffect(() => {
    fetch(1);
  }, [fetch]);

  return (
    <div>
      {user && <p>User: {user.name}</p>}
      {busy && <p>Loading user...</p>}
      {error && <p>Error: {error.message}</p>}
    </div>
  );
};

export { InversifyZustandUserComponent }