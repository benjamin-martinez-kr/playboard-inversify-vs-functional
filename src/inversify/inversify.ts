import type { interfaces } from 'inversify'

import { Container } from 'inversify'

import { use, useMemo } from 'react'
import { InversifyContext } from './context'

const useContainer = (): Container => use(InversifyContext).container

const useBinding = <T>(
  id: interfaces.ServiceIdentifier<T>
) => {
  const container = useContainer()

  return useMemo(() => {
    return container.get<T>(id)
  }, [container, id])
}

export { useBinding, useContainer }
