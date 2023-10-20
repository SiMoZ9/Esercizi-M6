import React from "react";
import Home from "./views/home/Home";
import Blog from "./views/blog/Blog";
import NewBlogPost from "./views/new/New";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./views/login/Login";
import Logout from "./views/Logout";
import ProtectedRoutes from "./middlewares/ProtectedRoutes";
import MainLayout from "./layout/MainLayout";
import AddUser from "./views/new_user/AddUser";
import Success from "./views/success/Success";
function App() {
  return (
    <BrowserRouter>
      <Routes>
          <Route path="/" exact element={<Login />} />
          <Route path="/signup" element={<AddUser/>} />

          <Route element={<ProtectedRoutes />} />
              <Route path="/blog/:id" element={<Blog />} />
              <Route path="/home" element={<Home />} />
              <Route path="/logout" element={<Logout />} />
              <Route path="/new" element={<NewBlogPost />} />

              <Route path="/success/:token" element={<Success />} />
          <Route/>
      </Routes>
    </BrowserRouter>
  );
}

export default App;