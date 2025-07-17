import type { PropsWithChildren } from 'react';

import { InversifyProvider } from "./context";
import { container } from './inversify';

const InversifyRootComponent = ({children}: PropsWithChildren) => {
  return (
    <InversifyProvider container={container}>
      {children}
    </InversifyProvider>
  );
}

export {
  InversifyRootComponent
}