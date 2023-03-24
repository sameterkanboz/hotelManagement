import MyDialog from "core/authDialog/dialog";
import React from "react";
import { QueryClient, QueryClientProvider } from "react-query";
import { Route, Routes } from "react-router-dom";
import UserDetails from "view/customers/components/userDetails";
import Customers from "view/customers/customers";
import Home from "view/home/home";
import Reservation from "view/reservation/reservation";
import Rooms from "view/rooms/rooms";

const MyRoutes = () => {
  return (
    <div>
      <MyDialog />
      <Routes>
        <Route index element={<Home />} />
        <Route path="customer" element={<Customers />} />
        <Route path="reservation" element={<Reservation />} />
        <Route path="rooms" element={<Rooms />} />
        <Route path="view-contact-details/:id" element={<UserDetails />} />
      </Routes>
    </div>
  );
};

export default MyRoutes;
