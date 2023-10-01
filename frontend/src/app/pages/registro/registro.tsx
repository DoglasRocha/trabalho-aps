import { useState } from "react";
import { useNavigate } from "react-router-dom"
import "./registro.css"

export const Registro= () => {
    const [nome, setNome] = useState('');
    const [email, setEmail] = useState('');
    const [senha, setSenha] = useState('');
    const navegacao = useNavigate();

    return(
        <div className="container-fluid background-registro">
            <div className="d-flex justify-content-center align-content-center h-100">
                <div className="box-login">
                    <div className="d-flex">
                        <button className="button-voltar" onClick={() => navegacao("/login")}>Voltar</button>
                    </div>
                    <div className="d-flex justify-content-center">
                        <div className="dainfe-image">DAINFE</div>
                    </div>
                    <div className="d-flex flex-column input-registro pb-2">
                        <strong>Nome Completo</strong>
                        <input className="form-control" id="form-registro" type="text" placeholder="Ex: Laudelino" value={nome} onChange={e => setNome(e.target.value)}/>
                    </div>
                    <div className="d-flex flex-column input-registro pb-2">
                        <strong>E-mail</strong>
                        <input className="form-control" id="form-registro" type="text" placeholder="email@gmail.com" value={email} onChange={e => setEmail(e.target.value)}/>
                    </div>
                    <div className="d-flex flex-column input-registro pb-2">
                        <strong>Senha</strong>
                        <input className="form-control" id="form-registro" type="password" placeholder="Digite a senha aqui!" value={senha} onChange={e => setSenha(e.target.value)}/>
                    </div>
                    <div className="d-flex justify-content-end pb-2">
                        <button className="button-registro" onClick={() => navegacao("/home")}>Criar Conta</button>
                    </div>
                </div>
            </div>
        </div>
    );
}