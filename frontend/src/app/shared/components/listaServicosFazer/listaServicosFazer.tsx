import {
  IPrestadorWrapper,
  IServicoWrapper,
  IAgendamentoWrapper,
} from "../../../../assets/models.ts";
import { useEffect, useState } from "react";
import { getCookie } from "../../../../assets/cookies.ts";
import { api } from "../../../../assets/api.ts";
import "./listaServicosFazer.css";

export const ListaServicosFazer = ({ usuario_id = -1 }) => {
  const [dadosServico, setServico] = useState<IServicoWrapper[]>([]);
  const [dadosPrestador, setDadosPrestador] = useState<IPrestadorWrapper>();
  const [dadosAgendamento, setAgendamento] = useState<IAgendamentoWrapper[]>(
    []
  );
  const [trigger, setTrigger] = useState<number>(0);
  const dadosCookies = getCookie();
  usuario_id = usuario_id == -1 ? dadosCookies.usuario_id : usuario_id;

  useEffect(() => {
    api
      .get(`/prestadores/get?usuario_id=${usuario_id}`)
      .then((result) => setDadosPrestador(result.data.dados[0]));
  }, [usuario_id]);

  useEffect(() => {
    api
      .get(`/servicos/get?prestador_id=${dadosPrestador?.prestador.id}`)
      .then((result) => setServico(result.data["dados"]));
  }, [dadosPrestador?.prestador.id, trigger]);

  useEffect(() => {
    if (dadosServico)
      for (let i = 0; i < dadosServico.length; i++) {
        api
          .get(`/agendamentos/get?servico_id=${dadosServico[i].servico.id}`)
          .then((result) => {
            if (result.data.dados)
              setAgendamento([...dadosAgendamento, result.data.dados[0]]);
          });
      }
  }, [dadosServico]);

  function Servicos() {
    if (!dadosAgendamento) return <></>;

    const lista = dadosAgendamento.map((dados) => (
      <div className="container topicos-agenda" key={dados.agendamento.id}>
        <div className="row">
          <div className="col-9 p-3" style={{ borderRight: "1px solid green" }}>
            <div className="d-flex">
              <strong>{dados.empresa.nome_fantasia}</strong>
              <div className="row ms-auto">
                <span>{dados.usuario.nome}</span>
              </div>
            </div>
          </div>
          <div className="col-3 text-center p-3">
            <div className="input-group">
              <strong>
                {new Date(dados.agendamento.horario_inicio).toLocaleString()}
              </strong>
              <button
                className="button-excluir-agenda ms-auto"
                onClick={() => {
                  api.delete(`/agendamentos/delete/${dados.agendamento.id}`);
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
