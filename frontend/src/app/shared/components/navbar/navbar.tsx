import { useState } from "react";
import "./navbar.css"

export const Navbar= () => {
    const [nomeUsuario, setNomeUsuario] = useState('');

    function NomeUsuario (user: string) {
        let nomeUser = user.split(" ");
        let nome = "";
        if(nomeUser.length > 1)
        {
            nome = nomeUser[0] + " " + nomeUser[nomeUser.length - 1]
        }
        else
        {
            nome = nomeUser[0]
        }
        return <strong>Olá, <a href="#">{nome}</a></strong>
    }
    
    function IniciaisUsuario (user : string) {
        let nomeUser = user.trim().split(" ");
        let iniciais = "";
        if(nomeUser.length > 1)
        {
            iniciais = nomeUser[0].substr(0, 1) + nomeUser[nomeUser.length - 1].substr(0, 1).toUpperCase()
        }
        else
        {
            iniciais = nomeUser[0].substr(0, 1).toUpperCase()
        }
        return <strong>{iniciais}</strong>
    }

    return (
        <>
            <nav className="d-flex navegacao ">
                <div className="d-flex align-items-center w-50">
                    <div className="dainfe"></div>
                </div>
                <div className="row ms-auto">
                    <div className="d-flex user">
                        {NomeUsuario("Ricardo Lanches de Rocha Oliverira")}
                        <div className="box-iniciais text-center">
                            {IniciaisUsuario("Ricardo Lanches de Rocha Oliverira")}
                        </div>
                        <div className="ms-1">
                            <button type="button" className="btn-navbar">
                                <i className="fa-solid fa-power-off"></i>
                                <span className="ms-1">Sair</span>
                            </button>
                        </div>
                    </div>
                </div>
            </nav>
        </>
    );
}