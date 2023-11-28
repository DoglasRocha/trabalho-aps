import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { Login, Registro, RegistroPrestador, RegistroCliente, HomeAdmin, HomePrestador, HomeCliente, Agendar, Servico } from "../pages/page";
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
        <Route path="/cliente/home" element={<Navbar />}>
          <Route index element={<HomeCliente />} />
          <Route path="agendar" element={<Agendar />} />
        </Route>
        <Route path="/prestador/home" element={<Navbar />}>
          <Route index element={<HomePrestador />} />
          <Route path="servico" element={<Servico />} />
        </Route>
        <Route path="/admin/home" element={<Navbar />}>
          <Route index element={<HomeAdmin />} />
          {/*<Route index element={<HomeCliente />} />
          <Route path="agendar" element={<Agendar />} />
          <Route index element={<HomePrestador />} />
  <Route path="servico" element={<Servico />} />*/}
        </Route>
      </Routes>
    </BrowserRouter>
  );
};
