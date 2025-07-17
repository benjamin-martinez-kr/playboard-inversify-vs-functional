import './App.css'
import { UserComponent } from './functional/user-component'
import { ZustandUserComponent } from './functional/zustand-user-component'
import { InversifyRootComponent } from './inversify/inversify-root-component'
import { InversifyUserComponent } from './inversify/inversify-user-component'
import { InversifyZustandUserComponent } from './inversify/inversify-zustand-user-component'

function App() {
  return (
    <>
      <InversifyRootComponent>
        <h3>Inversify</h3>
        <InversifyUserComponent />
        <h4 style={{ color: "#C3C3C3" }}>+ Zustand</h4>
        <InversifyZustandUserComponent />
      </InversifyRootComponent>

      <br style={{ padding: "25px 0"}} />

      <h3>Functional</h3>
      <UserComponent />
      <h4 style={{ color: "#C3C3C3" }}>+ Zustand</h4>
      <ZustandUserComponent />
    </>
  )
}

export default App
