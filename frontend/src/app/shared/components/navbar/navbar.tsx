import { useEffect, useState } from "react";
import { useNavigate, Outlet } from "react-router-dom";
import "./navbar.css";
import { cookies } from "../../../../assets/cookies";
import { api } from "../../../../assets/api";

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

export const Navbar = () => {
  const [nomeUser, setnomeUser] = useState("");
  const navegacao = useNavigate();

  useEffect(() => {
    const cookie = cookies.get("dadosUsuario");
    if (!cookie) return;
    const semiParsedCookie = cookie
      .replace(/[']/g, '"')
      .replace(/(\\054)/g, ",");
    const userData = JSON.parse(semiParsedCookie);
    api
      .get(`/usuarios/get?id=${userData.usuario_id}`)
      .then((response) => setnomeUser(response.data.dados[0].usuario.nome));
  });

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
            {NomeUsuario(nomeUser || "Ricardo Lanches de Rocha Oliverira")}
            <div className="box-iniciais text-center">
              {IniciaisUsuario(
                nomeUser || "Ricardo Lanches de Rocha Oliverira"
              )}
            </div>
            <div className="ms-1">
              <button
                type="button"
                className="btn-navbar"
                onClick={() => {
                  cookies.remove("dadosUsuario");
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
