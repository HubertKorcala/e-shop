import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from "react-router-dom";
import { Provider } from "react-redux";
import { PayPalScriptProvider } from "@paypal/react-paypal-js";
import store from "./store.ts";
import Home from "./pages/Home.tsx";
import Product from "./pages/Product.tsx";
import Cart from "./pages/Cart.tsx";
import Login from "./pages/Login.tsx";
import Register from "./pages/Register.tsx";
import Shipping from "./pages/Shipping.tsx";
import PrivateRoute from "./components/PrivateRoute.tsx";
import Payment from "./pages/Payment.tsx";
import PlaceOrder from "./pages/PlaceOrder.tsx";
import Order from "./pages/Order.tsx";
import Profile from "./pages/Profile.tsx";
import OrderList from "./pages/admin/OrderList.tsx";
import AdminRoute from "./components/AdminRoute.tsx";
import ProductList from "./pages/admin/ProductList.tsx";
import ProductEdit from "./pages/admin/ProductEdit.tsx";
import UserList from "./pages/admin/UserList.tsx";
import UserEdit from "./pages/admin/UserEdit.tsx";
import { ThemeProvider } from "@material-tailwind/react";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<App />}>
      <Route index={true} path="/" element={<Home />} />
      <Route path="/search/:keyword" element={<Home />} />
      <Route path="/search/:keyword/page/:pageNumber" element={<Home />} />
      <Route path="/page/:pageNumber" element={<Home />} />
      <Route path="/product/:id" element={<Product />} />
      <Route path="/cart" element={<Cart />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="" element={<PrivateRoute />}>
        <Route path="/shipping" element={<Shipping />} />
        <Route path="/payment" element={<Payment />} />
        <Route path="/placeorder" element={<PlaceOrder />} />
        <Route path="/order/:id" element={<Order />} />
        <Route path="/profile" element={<Profile />} />
      </Route>
      <Route path="" element={<AdminRoute />}>
        <Route path="/admin/orderlist" element={<OrderList />} />
        <Route path="/admin/productlist" element={<ProductList />} />
        <Route
          path="/admin/productlist/:pageNumber"
          element={<ProductList />}
        />
        <Route path="/admin/userlist" element={<UserList />} />
        <Route path="/admin/user/:id/edit" element={<UserEdit />} />
        <Route path="/admin/product/:id/edit" element={<ProductEdit />} />
      </Route>
    </Route>
  )
);

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <Provider store={store}>
      <PayPalScriptProvider deferLoading={true} options={{ clientId: "" }}>
        <ThemeProvider>
          <RouterProvider router={router} />
        </ThemeProvider>
      </PayPalScriptProvider>
    </Provider>
  </React.StrictMode>
);
