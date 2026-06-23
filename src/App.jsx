import React from 'react';
import { createBrowserRouter, RouterProvider } from "react-router";
import Dasboard from "./pages/Dasboard";
import { Provider } from "react-redux";
import { store, persistor } from './redux/store.js';
import { PersistGate } from "redux-persist/integration/react";

const path = createBrowserRouter([
  {
    path: '/',
    element: <Dasboard />
  }
]);

function App() {
  return (
    <Provider store={store}>
      <PersistGate 
        loading={<div>Loading data...</div>} 
        persistor={persistor}
      >
        <RouterProvider router={path} />
      </PersistGate>
    </Provider>
  );
}

export default App;