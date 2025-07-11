import React, { useEffect } from "react";

import { useStore } from "./state";

const ZustandUserComponent: React.FC = () => {
  const { busy, error, user, fetch } = useStore();

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

export { ZustandUserComponent }