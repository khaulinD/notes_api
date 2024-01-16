
import './App.css'

import {BrowserRouter, Route, Routes} from "react-router-dom";
import Home from "./pages/Home.tsx";
import Basket from "./pages/Basket.tsx";
import Login from "./pages/Login.tsx";
import AuthServiceProvider from "./context/AuthContext.tsx";
import ProtectedRoute from "./services/ProtectedRoute.tsx";
import Register from "./pages/Register.tsx";
// import {TestComminication} from "./pages/TestComminication.tsx";
import SharingNotes from "./pages/SharingNotes.tsx";
import TestComminication from "./pages/TestComminication.tsx";
import Test from "./pages/Test.tsx";


function App() {


  return (
    <BrowserRouter>
        <AuthServiceProvider>
              <Routes>

                <Route path="/" element={
                    <ProtectedRoute>
                        <Home />
                    </ProtectedRoute>
                    } />
                  <Route path="/sharingnotes" element={
                    <ProtectedRoute>
                        <SharingNotes />
                    </ProtectedRoute>} />
                <Route path="/basket" element={
                    <ProtectedRoute>
                        <Basket />
                    </ProtectedRoute>} />

                  <Route path="/login" element={<Login />} />
                  <Route path="/register" element={<Register />} />
                <Route path="/test" element={<TestComminication/>}/>
                <Route path="/test1" element={<Test/>}/>
              </Routes>

        </AuthServiceProvider>
    </BrowserRouter>
  )
}

export default App
