import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { Login, Registro, RegistroPrestador, RegistroCliente, Home, Agendar } from "../pages/page";
import { Navbar } from "../shared/components/navbar/navbar";

export const Rota = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="*" element={<Navigate to="/login" />} />
        <Route path="/login" element={<Login />} />
        <Route path="/registro">
          <Route index element={<Registro />} />
          <Route path="prestador" element={<RegistroPrestador />} />
          <Route path="cliente" element={<RegistroCliente />} />
        </Route>
        <Route path="/home" element={<Navbar />}>
          <Route index element={<Home />} />
          <Route path="agendar" element={<Agendar />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};
