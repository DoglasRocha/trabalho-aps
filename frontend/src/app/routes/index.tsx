import {BrowserRouter, Routes, Route, Navigate} from "react-router-dom"
import { Login, Registro, Home } from "../pages"

export const Rota = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="*" element={<Navigate to="/login" />}/>
                <Route path="/login" element={<Login/>} />
                <Route path="/registro" element={<Registro/>} />
                <Route path="/home" element={<Home/>} />
            </Routes>
        </BrowserRouter>
    );
}