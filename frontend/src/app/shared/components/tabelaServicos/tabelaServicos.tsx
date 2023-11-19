import { IAgendamentoWrapper } from "../../../../assets/models.ts";
import { useEffect, useState } from "react";
import { api } from "../../../../assets/api.ts";
import "./tabelaServicos.css"

export const TabelaServicos= () => {
    const [dadosAgendamento, setAgendamento] = useState<IAgendamentoWrapper[]>([]);

  useEffect(() => {
    api
      //.get(`/agendamentos/get?id=${props}`)
      .get(`/agendamentos/get?id=2`)
      .then((request) => setAgendamento(request.data["dados"]));
  }, []);

    return(
        <>
        <div className="table-responsive">
            <table className="table table-bordered tabela-semana">
                <thead>
                    <tr>
                    <th scope="col">#</th>
                    <th scope="col" className="text-center">Segunda-feira</th>
                    <th scope="col" className="text-center">Terça-feira</th>
                    <th scope="col" className="text-center">Quarta-feira</th>
                    <th scope="col" className="text-center">Quinta-feira</th>
                    <th scope="col" className="text-center">Sexta-feira</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <th scope="row">7:00</th>
                        <td className="text-center"></td>
                        <td className="text-center"></td>
                        <td className="text-center"></td>
                        <td className="text-center"></td>
                        <td className="text-center"></td>
                    </tr>
                    <tr>
                        <th scope="row">8:00</th>
                        <td className="text-center"></td>
                        <td className="text-center"></td>
                        <td className="text-center"></td>
                        <td className="text-center"></td>
                        <td className="text-center"></td>
                    </tr>
                    <tr>
                        <th scope="row">9:00</th>
                        <td className="text-center"></td>
                        <td className="text-center"></td>
                        <td className="text-center"></td>
                        <td className="text-center"></td>
                        <td className="text-center"></td>
                    </tr>
                    <tr>
                        <th scope="row">10:00</th>
                        <td className="text-center"></td>
                        <td className="text-center"></td>
                        <td className="text-center"></td>
                        <td className="text-center"></td>
                        <td className="text-center"></td>
                    </tr>
                    <tr>
                        <th scope="row">11:00</th>
                        <td className="text-center"></td>
                        <td className="text-center"></td>
                        <td className="text-center"></td>
                        <td className="text-center"></td>
                        <td className="text-center"></td>
                    </tr>
                    <tr>
                        <th scope="row">12:00</th>
                        <td className="text-center"></td>
                        <td className="text-center"></td>
                        <td className="text-center"></td>
                        <td className="text-center"></td>
                        <td className="text-center"></td>
                    </tr>
                    <tr>
                        <th scope="row">13:00</th>
                        <td className="text-center"></td>
                        <td className="text-center"></td>
                        <td className="text-center"></td>
                        <td className="text-center"></td>
                        <td className="text-center"></td>
                    </tr>
                    <tr>
                        <th scope="row">14:00</th>
                        <td className="text-center"></td>
                        <td className="text-center"></td>
                        <td className="text-center"></td>
                        <td className="text-center"></td>
                        <td className="text-center"></td>
                    </tr>
                    <tr>
                        <th scope="row">15:00</th>
                        <td className="text-center"></td>
                        <td className="text-center"></td>
                        <td className="text-center"></td>
                        <td className="text-center"></td>
                        <td className="text-center"></td>
                    </tr>
                    <tr>
                        <th scope="row">16:00</th>
                        <td className="text-center"></td>
                        <td className="text-center"></td>
                        <td className="text-center"></td>
                        <td className="text-center"></td>
                        <td className="text-center"></td>
                    </tr>
                    <tr>
                        <th scope="row">17:00</th>
                        <td className="text-center"></td>
                        <td className="text-center"></td>
                        <td className="text-center"></td>
                        <td className="text-center"></td>
                        <td className="text-center"></td>
                    </tr>
                    <tr>
                        <th scope="row">18:00</th>
                        <td className="text-center"></td>
                        <td className="text-center"></td>
                        <td className="text-center"></td>
                        <td className="text-center"></td>
                        <td className="text-center"></td>
                    </tr>
                </tbody>
                </table>
            </div>
        </>
    );
}