import { IPrestadorWrapper, IServicoWrapper } from "../../../../assets/models.ts";
import { useEffect, useState } from "react";
import { getCookie } from "../../../../assets/cookies.ts";
import { api } from "../../../../assets/api.ts";
import "./listaServicos.css";

export const ListaServicos = () => {
  const [dadosServico, setServico] = useState<IServicoWrapper[]>([]);
  const [dadosPrestador, setDadosPrestador] = useState<IPrestadorWrapper>();
  const [trigger, setTrigger] = useState<number>(0);
  const dadosCookies = getCookie();

  useEffect(() => {
    api
      .get(`/prestadores/get?usuario_id=${dadosCookies.usuario_id}`)
      .then((request) => setDadosPrestador(request.data.dados[0]));
  }, [dadosCookies.usuario_id]);

  useEffect(() => {
    api
      .get(`/servicos/get?prestador_id=${dadosPrestador?.prestador.id}`)
      .then((request) => setServico(request.data["dados"]));
  }, [dadosPrestador?.prestador.id, trigger]);

  function Servicos() {
    if (!dadosServico) return <></>;

    const lista = dadosServico.map((dadosServico) => (
      <div className="container topicos-servico" key={dadosServico.servico.id}>
        <div className="row">
          <div className="col-9 p-3" style={{ borderRight: "1px solid green" }}>
            <div className="d-flex">
              <strong>{dadosServico.categoria.nome}</strong>
              <div className="row ms-auto">
                <span>{dadosServico.servico.duracao} horas</span>
              </div>
            </div>
          </div>
          <div className="col-3 text-center p-3">
            <div className="input-group">
              <strong>R${dadosServico.servico.preco}</strong>
              <button className="button-excluir-servico ms-auto"
              onClick={() => {
                api.delete(`/servicos/delete/${dadosServico.servico.id}`);
                setTrigger(trigger + 1);
              }}
              >
                <i className="fa-solid fa-trash-can"></i>
              </button>
            </div>
          </div>
        </div>
      </div>
    ));
    return <>{lista}</>;
  }

  return (
    <>
      <div className="container-servico">
        <div className="row">
          <div className="col-12 m-2">
            <strong>Serviços disponíveis</strong>
            <i className="fa-regular fa-bell ms-2"></i>
          </div>
        </div>
        <div className="modulo-servico">
          <div className="row m-2">
            <Servicos />
          </div>
        </div>
      </div>
    </>
  );
};
