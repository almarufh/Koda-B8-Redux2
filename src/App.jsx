import { createBrowserRouter, RouterProvider } from "react-router";
import Dasboard from "./pages/Dasboard";

const path = createBrowserRouter([
  {
    path: '/',
    element: <Dasboard />
  }
])

function App () {
  return (
    <RouterProvider router={path} />
  )
}

export default App