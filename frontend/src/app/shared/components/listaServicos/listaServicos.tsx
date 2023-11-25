import {
  IAgendamentoWrapper,
  IPrestadorWrapper,
  IServicoWrapper,
} from "../../../../assets/models.ts";
import { useEffect, useState } from "react";
import { api } from "../../../../assets/api.ts";
import "./listaServicos.css";
import { getCookie } from "../../../../assets/cookies.ts";

export const ListaServicos = () => {
  const [dadosServicos, setServicos] = useState<IServicoWrapper[]>([]);
  const [dadosPrestador, setDadosPrestador] = useState<IPrestadorWrapper>();
  const [dadosAgendamentos, setDadosAgendamentos] = useState<
    IAgendamentoWrapper[]
  >([]);
  const [trigger, setTrigger] = useState<number>(0);
  const dadosCookies = getCookie();

  useEffect(() => {
    api
      .get(`/prestadores/get?usuario_id=${dadosCookies.usuario_id}`)
      .then((response) => setDadosPrestador(response.data.dados[0]));
  }, [dadosCookies.usuario_id]);

  useEffect(() => {
    api
      .get(`/servicos/get?prestador_id=${dadosPrestador?.prestador.id}`)
      .then((response) => setServicos(response.data.dados));
  }, [dadosPrestador?.prestador.id]);

  useEffect(() => {
    if (!dadosServicos) return;
    setDadosAgendamentos([]);
    dadosServicos.forEach((element) => {
      api
        .get(`/agendamentos/get?servico_id=${element?.servico.id}`)
        .then((response) => {
          if (response.data.dados)
            setDadosAgendamentos([
              ...dadosAgendamentos,
              response.data.dados[0],
            ]);
        });
    });
  }, [dadosServicos, trigger]);

  function Servicos() {
    if (!dadosAgendamentos.length) return <></>;

    const lista = dadosAgendamentos.map((agendamento) => (
      <div className="container topicos-servico" key={agendamento.servico.id}>
        <div className="row">
          <div className="col-9 p-3" style={{ borderRight: "1px solid green" }}>
            <div className="d-flex">
              <strong>{agendamento.categoria.nome}</strong>
              <div className="row ms-auto">
                <span>{agendamento.servico.duracao} horas</span>
              </div>
            </div>
          </div>
          <div className="col-3 text-center p-3">
            <div className="input-group">
              <strong>R${agendamento.servico.preco}</strong>
              <button
                className="button-excluir-servico ms-auto"
                onClick={() => {
                  api.delete(
                    `/agendamentos/delete/${agendamento.agendamento.id}`
                  );
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
            <strong>Serviços a fazer</strong>
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
