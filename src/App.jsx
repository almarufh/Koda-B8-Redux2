import { createBrowserRouter, RouterProvider } from "react-router";
import Dasboard from "./pages/Dasboard";
import { Provider } from "react-redux";
import store from './redux/store.js'

const path = createBrowserRouter([
  {
    path: '/',
    element: <Dasboard />
  }
])

function App () {
  return (
    <Provider store={store} >
      <RouterProvider router={path} />
    </Provider>
  )
}

export default App