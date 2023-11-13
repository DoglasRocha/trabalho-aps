import { useState } from "react";
import { useNavigate, Outlet } from "react-router-dom";
import "./navbar.css";
import { Cookies } from "react-cookie";

export const Navbar = () => {
  const [nomeUsuario, setNomeUsuario] = useState("");
  const navegacao = useNavigate();

  function NomeUsuario(user: string) {
    const nomeUser = user.split(" ");
    let nome = "";
    if (nomeUser.length > 1) {
      nome = nomeUser[0] + " " + nomeUser[nomeUser.length - 1];
    } else {
      nome = nomeUser[0];
    }
    return <strong>Olá, {nome}</strong>;
  }

  function IniciaisUsuario(user: string) {
    const nomeUser = user.trim().split(" ");
    let iniciais = "";
    if (nomeUser.length > 1) {
      iniciais =
        nomeUser[0].substr(0, 1) +
        nomeUser[nomeUser.length - 1].substr(0, 1).toUpperCase();
    } else {
      iniciais = nomeUser[0].substr(0, 1).toUpperCase();
    }
    return <strong>{iniciais}</strong>;
  }

  return (
    <>
      <nav className="d-flex navegacao ">
        <div className="d-flex align-items-center w-50">
          <div className="dainfe">
            <img
              src="../../../public/ZAHP-SemFundo.png"
              className="img-fluid img-thumbnail"
              alt="ZAHP"
            />
          </div>
        </div>
        <div className="row ms-auto">
          <div className="d-flex user">
            {NomeUsuario("Ricardo Lanches de Rocha Oliverira")}
            <div className="box-iniciais text-center">
              {IniciaisUsuario("Ricardo Lanches de Rocha Oliverira")}
            </div>
            <div className="ms-1">
              <button
                type="button"
                className="btn-navbar"
                onClick={() => {
                  const cookie = new Cookies();
                  cookie.remove("dadosUsuario");
                  return navegacao("/login");
                }}
              >
                <i className="fa-solid fa-power-off"></i>
                <span className="ms-1">Sair</span>
              </button>
            </div>
          </div>
        </div>
      </nav>
      <Outlet />
    </>
  );
};
