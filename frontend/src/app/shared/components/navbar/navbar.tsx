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
        return <strong>Olá, {nome}</strong>
    }
    
    const IniciaisUsuario = ({name}) => {
        let nomeUser = name.trim().split(" ");
        let iniciais = "";
        if(nomeUser.length > 1)
        {
            iniciais = nomeUser[0].substr(0, 1) + " " + nomeUser[nomeUser.length - 1].substr(0, 1).toUpperCase()
        }
        else
        {
            iniciais = nomeUser[0].substr(0, 1).toUpperCase()
        }
        return <span>{iniciais}</span>
    }

    return (
        <>
            <nav className="d-flex navegacao ">
                <div className="d-flex align-items-center w-50">
                    <div className="dainfe"></div>
                </div>
                <div className="row ms-auto">
                    <div className="user"> 
                        {NomeUsuario("Ricardo Lanches de Oliveira")}
                        <div className="dainfe">
                        </div>
                        
                        <button id="btn-sair" type="button" className="btn btn-secondary dropdown-toggle" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                            <i className="fa-solid fa-angle-down"></i>
                        </button>
                        <div className="dropdown-menu" aria-labelledby="btn-sair">
                            <a className="dropdown-item" href="#">
                                <i className="fa-regular fa-power-off"></i>
                                <span className="">Sair</span>
                            </a>
                        </div>
                    </div>
                </div>
            </nav>
        </>
    );
}