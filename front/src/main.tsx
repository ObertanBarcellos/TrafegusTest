import {StrictMode} from 'react'
import {createRoot} from 'react-dom/client'
import './index.scss'
import {RouterProvider} from "react-router-dom";
import {router} from "./routes.tsx";
import {Provider} from "react-redux";
import createStore from "./server/createStore.ts";
import DefaultProvider from "./providers/default-provider.tsx";

const store = createStore()

createRoot(document.getElementById('root')!).render(
  <StrictMode>
      <Provider store={ store }>
          <DefaultProvider>
              <RouterProvider router={ router } />
          </DefaultProvider>
      </Provider>
  </StrictMode>,
)
