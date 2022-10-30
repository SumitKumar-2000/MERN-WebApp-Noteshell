import { BrowserRouter, Routes, Route } from "react-router-dom";
import React, { useState } from "react";
import Header from "./components/header";
import LandingPage from "./screen/landingPage";
import MyNotes from "./screen/myNotes";
import LoginScreen from "./screen/loginScreen";
import RegisterScreen from "./screen/registerScreen";
import CreateNote from "./screen/createnote";
import UpdateNote from "./screen/updatenote";
import EditUser from "./screen/edituser";

const App = () => {

  const [query,setQuery] = useState("")

  return (
    <BrowserRouter>
      <Header setQuery={setQuery} />
      <main>
        <Routes>
          <Route path="/" element={<LandingPage />} exact />
          <Route path="/login" element={<LoginScreen />} />
          <Route path="/register" element={<RegisterScreen />} />
          <Route path="/mynotes" element={<MyNotes query={query} />} />
          <Route path="/createnote" element={<CreateNote />} />
          <Route path="/updatenote/:_id" element={<UpdateNote />} />
          <Route path="/user" element={<EditUser />} />
        </Routes>
      </main>
    </BrowserRouter>
  );
};

export default App;
