import type { Container } from 'inversify'
import type { PropsWithChildren } from 'react'

import { createContext, useCallback, useEffect, useMemo, useState } from 'react'
import { registerBindings } from './bindings'

interface InversifyProviderProps {
  container: Container
}

interface InversifyContextValue {
  container: Container
  refresh: () => void
}

const initialValue: InversifyContextValue = {
  container: undefined as unknown as Container,
  refresh: () => {},
}

const InversifyContext = createContext<InversifyContextValue>(initialValue)

const InversifyProvider = ({
  container: originalContainer,
  children,
}: PropsWithChildren<InversifyProviderProps>) => {
  const [loaded, setLoaded] = useState(false)
  const [container, setContainer] = useState<Container>(
    () => new Proxy<Container>(originalContainer, {}),
  )

  useEffect(() => {
    registerBindings(originalContainer)

    setLoaded(true)

    return () => {
      originalContainer.unbindAll()
    }
  }, [originalContainer])

  const refresh = useCallback(() => {
    setContainer(() => new Proxy<Container>(originalContainer, {}))
  }, [originalContainer])

  const value = useMemo(() => {
    return {
      container,
      refresh
    }
  }, [container, refresh])


  if (!loaded) {
    return null
  }

  return <InversifyContext value={value}>{children}</InversifyContext>
}

InversifyContext.displayName = 'InversifyContainerContext'

export { InversifyContext, InversifyProvider }
