import type { PropsWithChildren } from 'react';

import { Container } from 'inversify';
import { InversifyProvider } from "./context";

const container = new Container()

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