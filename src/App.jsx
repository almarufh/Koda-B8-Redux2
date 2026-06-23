import { createBrowserRouter, RouterProvider } from "react-router";
import Dasboard from "./pages/Dasboard";
import { Provider } from "react-redux";
import {store, persistor } from './redux/store.js'
import { PersistGate } from "redux-persist/integration/react";

const path = createBrowserRouter([
  {
    path: '/',
    element: <Dasboard />
  }
])

function App () {
  return (
    <PersistGate 
      persistor={persistor}
    >
      <Provider store={store} >
        <RouterProvider router={path} />
      </Provider>
    </PersistGate>
  )
}

export default App