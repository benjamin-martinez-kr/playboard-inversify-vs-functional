import { log } from "./console-logger-service";

const getUser = async (id: number) => {
  log(`Fetching user with id ${id}`);

  // Simulate a network request
  await new Promise(resolve => setTimeout(resolve, 1000));

  // Simulate api call
  return Promise.resolve({ id, name: `User ${id}` });
}

export { getUser };