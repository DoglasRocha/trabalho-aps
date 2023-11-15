import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./registroCliente.css";
import { api } from "../../../assets/api";
<<<<<<< HEAD
import { ICliente, IClienteWrapper } from "../../../assets/models";

export const RegistroCliente = () => {
  const [dadosCliente, setDadosCliente] = useState<ICliente | IClienteWrapper>;
=======
import { ICliente } from "../../../assets/models";

export const RegistroCliente = () => {
  const [dadosCliente, setDadosCliente] = useState<ICliente>();
>>>>>>> 81af0ee6655f82c5b36e1ebc6f78a01045885fb5
  const navegacao = useNavigate();

  return (
    <div className="container-fluid background-registro">
      <div className="d-flex justify-content-center align-content-center h-100">
        <div className="box-login">
          <div className="d-flex">
            <button className="button-voltar" onClick={() => navegacao(-1)}>
              Voltar
            </button>
          </div>
          <div className="d-flex justify-content-center">
            <div className="dainfe-image">DAINFE</div>
          </div>
          <div className="d-flex flex-row">
            <div className="p2 first-row-registro ">
              <div className="d-flex flex-column input-registro pb-2">
                <strong>Nome Completo</strong>
                <input
                  className="form-control"
                  type="text"
                  placeholder="Ex: Laudelino"
                  value={dadosCliente.nome}
                  onChange={(e) =>
                    setDadosCliente({ ...dadosCliente, nome: e.target.value })
                  }
                />
              </div>
              <div className="d-flex flex-column input-registro pb-2">
                <strong>E-mail</strong>
                <input
                  className="form-control"
                  type="text"
                  placeholder="email@gmail.com"
                  value={dadosCliente.email}
                  onChange={(e) =>
                    setDadosCliente({ ...dadosCliente, email: e.target.value })
                  }
                />
              </div>
              <div className="d-flex flex-column input-registro pb-2">
                <strong>Senha</strong>
                <input
                  className="form-control"
                  type="password"
                  placeholder="Digite a senha aqui!"
                  value={dadosCliente.senha}
                  onChange={(e) =>
                    setDadosCliente({ ...dadosCliente, senha: e.target.value })
                  }
                />
              </div>
              <div className="d-flex flex-column input-registro pb-2">
                <strong>Data Nascimento</strong>
                <input
                  className="form-control"
                  type="date"
                  value={dadosCliente.data_nascimento}
                  onChange={(e) =>
                    setDadosCliente({
                      ...dadosCliente,
                      data_nascimento: e.target.value,
                    })
                  }
                />
              </div>
              <div className="d-flex flex-column input-registro pb-2">
                <strong>CPF</strong>
                <input
                  className="form-control"
                  type="text"
                  placeholder="123.456.789-00"
                  value={dadosCliente.cpf}
                  onChange={(e) =>
                    setDadosCliente({
                      ...dadosCliente,
                      cpf: e.target.value,
                    })
                  }
                />
              </div>
            </div>
            <div className="p2 ml-auto p-2 second-row-registro">
              <div className="d-flex flex-column input-registro pb-2">
                <strong>Endereço</strong>
                <input
                  className="form-control"
                  type="text"
                  placeholder="Rua Fulano 123"
                  value={dadosCliente.endereco}
                  onChange={(e) =>
                    setDadosCliente({
                      ...dadosCliente,
                      endereco: e.target.value,
                    })
                  }
                />
              </div>
              <div className="d-flex flex-column input-registro pb-2">
                <strong>Estado</strong>
                <input
                  className="form-control"
                  type="text"
                  placeholder="Paraná"
                  value={dadosCliente.estado}
                  onChange={(e) =>
                    setDadosCliente({ ...dadosCliente, estado: e.target.value })
                  }
                />
              </div>
              <div className="d-flex flex-column input-registro pb-2">
                <strong>Cidade</strong>
                <input
                  className="form-control"
                  type="text"
                  placeholder="Curitiba"
                  value={dadosCliente.cidade}
                  onChange={(e) =>
                    setDadosCliente({ ...dadosCliente, cidade: e.target.value })
                  }
                />
              </div>
            </div>
          </div>
          <div className="d-flex justify-content-end pb-2">
            <button
              className="button-registro btn"
              onClick={async () => {
                const result = await api.post("clientes/create", dadosCliente);
                console.log(dadosCliente);
                if (result.data?.dados) return navegacao("/login");
                return navegacao("/registro");
              }}
            >
              Criar Conta
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
