import { useState } from "react";
import { useNavigate } from "react-router-dom"
import "./login.css"

export const Login = () => {
    const [email, setEmail] = useState('');
    const [senha, setSenha] = useState('');
    const navegacao = useNavigate();
    
    return (
        <div className="container-fluid background-login">
            <div className="d-flex justify-content-center align-content-center h-100">
                <div className="box-login">
                    <div className="d-flex justify-content-center">
                        <div className="dainfe-image">DAINFE</div>
                    </div>
                    <div className="d-flex flex-column input-login pb-2">
                        <strong>E-mail</strong>
                        <input className="form-control" id="form-login" type="text" placeholder="email@gmail.com" value={email} onChange={e => setEmail(e.target.value)}/>
                    </div>
                    <div className="d-flex flex-column input-login pb-2">
                        <strong>Senha</strong>
                        <input className="form-control" id="form-login" type="password" placeholder="Digite a senha aqui!" value={senha} onChange={e => setSenha(e.target.value)}/>
                    </div>
                    <div className="d-flex">
                        <span className= "text-1">Não tem conta? </span>
                        <a href="" onClick={() => navegacao("/registro")} className="link"> Clique aqui!</a>
                    </div>
                    <div className="d-flex justify-content-end pb-2">
                        <button className="button-login" onClick={() => navegacao("/home")}>Entrar</button>
                    </div>
                </div>
            </div>
        </div>
    );
}