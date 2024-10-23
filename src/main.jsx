import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './routes/App.jsx'
import {Provider} from 'react-redux'
import ecomWeb from './store/indexRedux.js'
import {RouterProvider , createBrowserRouter} from 'react-router-dom'
import CartItems from './components/CartItems.jsx'
import MainDisplay from './components/MainDisplay.jsx'
import Login from './components/Login.jsx'
import Register from './components/Register.jsx'
import PaymentBox from './components/PaymentBox.jsx'
import OrderItems from './components/OrderItems.jsx'
import AddProduct from './components/AddProduct.jsx'

const router = createBrowserRouter([{
  path: "/", element: <App />, children:[
    {path: "/", element: <MainDisplay />},
    {path: "cart-area", element: <CartItems />},
    {path: "login", element: <Login />},
    {path: "register", element: <Register />},
    {path: "PaymentBox", element: <PaymentBox />},
    {path: "Order", element: <OrderItems/>},
    {path: "AddProduct", element: <AddProduct/>}
  ]
}], { basename: "/deployeReact" });

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Provider store={ecomWeb}>
    <RouterProvider router={router} />
    </Provider>
  </StrictMode>,
)
