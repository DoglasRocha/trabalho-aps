import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./registroPrestador.css";
import { api } from "../../../assets/api";
import { IPrestador, IEmpresa, IEmpresaWrapper } from "../../../assets/models";

export const RegistroPrestador = () => {
  const [dadosPrestador, setDadosPrestador] = useState<IPrestador>();
  const [dadosEmpresa, setDadosEmpresa] = useState<IEmpresa>();
  const [selectEmpresa, setSelectEmpresa] = useState<IEmpresaWrapper[]>([]);
  const [novaEmpresa, setNovaEmpresa] = useState(false);
  const navegacao = useNavigate();

  useEffect(() => {
    api
      .get("empresas/all")
      .then((request) => setSelectEmpresa(request.data["dados"]));
  }, []);

  function criacaoEmpresa(){
    if(novaEmpresa === true) {
      return (
        <div className="d-flex flex-row">
          <div className="first-row-registro ">
              <div className="d-flex flex-column input-registro mb-4">
                <strong>Nome Fantasia</strong>
                <input
                  className="form-control"
                  type="text"
                  placeholder="Curitiba"
                  value={dadosEmpresa?.nome_fantasia}
                  onChange={(e) =>
                    setDadosEmpresa({ ...dadosEmpresa, nome_fantasia: e.target.value })
                  }
                  />
              </div>
            </div>
                  
            <div className="ms-auto second-row-registro">
              <div className="d-flex flex-column input-registro mb-4">
                <strong>CNPJ</strong>
                <input
                  className="form-control"
                  type="text"
                  placeholder="12.345.678/0001-90"
                  value={dadosEmpresa?.cnpj}
                  onChange={(e) =>
                    setDadosEmpresa({
                      ...dadosEmpresa,
                      cnpj: e.target.value,
                    })
                  }
                />
              </div>
          </div>
          </div>
      )
    }
    else {
      return(
        <div className="d-flex flex-row">
          <div className="first-row-registro ">
            <div className="d-flex flex-column input-registro mb-4">
                <strong>Empresa</strong>
                <select
                        className="form-select"
                        onChange={(e) => setDadosPrestador({ ...dadosPrestador, empresa_id: e.target.value })}
                        id="exampleFormControlSelect1"
                      >
                        {selectEmpresa.map((selectEmpresa) => {
                          return (
                            <option value={selectEmpresa.empresa.id}>
                              Empresa: {selectEmpresa.empresa.nome_fantasia}, CNPJ:{" "}
                              {selectEmpresa.empresa.cnpj}
                            </option>
                          );
                        })}
                      </select>
              </div>
            </div>
          </div>
      )
    }
  }

  return (
    <div className="container-fluid background-registro">
      <div className="d-flex justify-content-center align-content-center h-100">
        <div className="box-login">
          <div className="d-flex">
            <button
              className="button-voltar"
              onClick={() => navegacao(-1)}
            >
              Voltar
            </button>
          </div>
          <div className="d-flex justify-content-center">
            <div className="dainfe-image">DAINFE</div>
          </div>
          <div className="d-flex flex-row">
            <div className="first-row-registro ">
              <div className="d-flex flex-column input-registro pb-2">
                <strong>Nome Completo</strong>
                <input
                  className="form-control"
                  type="text"
                  placeholder="Ex: Laudelino"
                  value={dadosPrestador.nome}
                  onChange={(e) =>
                    setDadosPrestador({ ...dadosPrestador, nome: e.target.value })
                  }
                />
              </div>
              <div className="d-flex flex-column input-registro pb-2">
                <strong>E-mail</strong>
                <input
                  className="form-control"
                  type="text"
                  placeholder="email@gmail.com"
                  value={dadosPrestador.email}
                  onChange={(e) =>
                    setDadosPrestador({ ...dadosPrestador, email: e.target.value })
                  }
                />
              </div>
              <div className="d-flex flex-column input-registro pb-2">
                <strong>Senha</strong>
                <input
                  className="form-control"
                  type="password"
                  placeholder="Digite a senha aqui!"
                  value={dadosPrestador.senha}
                  onChange={(e) =>
                    setDadosPrestador({ ...dadosPrestador, senha: e.target.value })
                  }
                />
              </div>
            </div>
            <div className="ms-auto second-row-registro">
              <div className="d-flex flex-column input-registro pb-2">
                <strong>Data Nascimento</strong>
                <input
                  className="form-control"
                  type="date"
                  value={dadosPrestador.data_nascimento}
                  onChange={(e) =>
                    setDadosPrestador({
                      ...dadosPrestador,
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
                  value={dadosPrestador.cpf}
                  onChange={(e) =>
                    setDadosPrestador({
                      ...dadosPrestador,
                      cpf: e.target.value,
                    })
                  }
                />
              </div>
            </div>
          </div>

          {criacaoEmpresa()}

          <div className="d-flex flex-row radio-inputs w-100">
            <label className="radio-nova-empresa">
              <input type="radio" name="radio-nova-empresa" value="false" onChange={() => {setNovaEmpresa(false); console.log(novaEmpresa)}} checked={novaEmpresa === false}/>
              <span className="name">Empresa já cadastrada</span>
            </label>
            <label className="radio-nova-empresa">
              <input type="radio" name="radio-nova-empresa" value="true" onChange={() => {setNovaEmpresa(true); console.log(novaEmpresa)}} checked={novaEmpresa === true}/>
              <span className="name">Cadastrar empresa</span>
            </label>
          </div>

          <div className="d-flex justify-content-end pb-2">
            <button
              className="button-registro btn"
              onClick={async () => {
                var resultPrestador;
                var resultEmpresa;

                if(novaEmpresa) {
                  resultEmpresa = await api.post("empresas/create", dadosEmpresa);
                  console.log(dadosEmpresa);
                  
                  if (resultEmpresa.data?.dados)
                    dadosPrestador?.empresa_id = resultEmpresa.data?.dados.id;

                  resultPrestador = await api.post("prestadores/create", dadosPrestador);
                  console.log(dadosPrestador);
                  
                  if (resultPrestador.data?.dados && resultEmpresa.data?.dados) return navegacao("/login");
                  return navegacao("/registro");
                }
                else {
                  resultPrestador = await api.post("prestador/create", dadosPrestador);
                  console.log(dadosPrestador);
                  if (resultPrestador.data?.dados) return navegacao("/login");
                  return navegacao("/registro");
                }
                
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
