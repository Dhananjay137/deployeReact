// import { StrictMode } from 'react'
// import { createRoot } from 'react-dom/client'
// import App from './routes/App.jsx'
// import {Provider} from 'react-redux'
// import ecomWeb from './store/indexRedux.js'
// import {RouterProvider , createBrowserRouter} from 'react-router-dom'
// import CartItems from './components/CartItems.jsx'
// import MainDisplay from './components/MainDisplay.jsx'
// import Login from './components/Login.jsx'
// import Register from './components/Register.jsx'
// import PaymentBox from './components/PaymentBox.jsx'
// import OrderItems from './components/OrderItems.jsx'
// import AddProduct from './components/AddProduct.jsx'

// const router = createBrowserRouter([{
//   path: "/", element: <App />, children:[
//     {path: "/", element: <MainDisplay />},
//     {path: "cart-area", element: <CartItems />},
//     {path: "login", element: <Login />},
//     {path: "register", element: <Register />},
//     {path: "PaymentBox", element: <PaymentBox />},
//     {path: "Order", element: <OrderItems/>},
//     {path: "AddProduct", element: <AddProduct/>}
//   ]
// }], { basename: "/deployeReact" });

// createRoot(document.getElementById('root')).render(
//   <StrictMode>
//     <Provider store={ecomWeb}>
//     <RouterProvider router={router} />
//     </Provider>
//   </StrictMode>,
// )
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './routes/App.jsx';
import { Provider } from 'react-redux';
import ecomWeb from './store/indexRedux.js';
import { HashRouter as Router, Routes, Route } from 'react-router-dom'; // Change here
import CartItems from './components/CartItems.jsx';
import MainDisplay from './components/MainDisplay.jsx';
import Login from './components/Login.jsx';
import Register from './components/Register.jsx';
import PaymentBox from './components/PaymentBox.jsx';
import OrderItems from './components/OrderItems.jsx';
import AddProduct from './components/AddProduct.jsx';

// Removed createBrowserRouter and replaced with HashRouter
const AppRouter = () => (
  <Router>
    <Routes>
      <Route path="/" element={<App />}>
        <Route index element={<MainDisplay />} />
        <Route path="cart-area" element={<CartItems />} />
        <Route path="login" element={<Login />} />
        <Route path="register" element={<Register />} />
        <Route path="PaymentBox" element={<PaymentBox />} />
        <Route path="Order" element={<OrderItems />} />
        <Route path="AddProduct" element={<AddProduct />} />
      </Route>
    </Routes>
  </Router>
);

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Provider store={ecomWeb}>
      <AppRouter />
    </Provider>
  </StrictMode>,
);
