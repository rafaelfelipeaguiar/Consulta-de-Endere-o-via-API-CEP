import React, { useState } from "react";
import { getCep } from "../service/cep";
import "./main.css";

const CepConsult = () => {
  const [cep, setCep] = useState("");
  const [data, setData] = useState(null);
  const [load, setLoad] = useState(false);
  const [erro, setErro] = useState(null);

  const handleChange = (e) => setCep(e.target.value);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoad(true);

    try {
      const response = await getCep(cep);
      setData(response.erro ? null : response);
      setErro(response.erro ? "O CEP informado é inválido ou não foi encontrado." : null);
    } catch {
      setErro("O CEP informado é inválido ou não foi encontrado.");
      setData(null);
    } finally {
      setLoad(false);
    }
  };

  return (
    <div className="container">
      <h1>Buscar endereço</h1>
      <form onSubmit={handleSubmit} className="cep-form">
        <input
          type="text"
          value={cep}
          onChange={handleChange}
          placeholder="Digite o CEP"
          maxLength={8}
          className="cep-input"
        />
        <button type="submit" className="cep-button">
          Consultar
        </button>
      </form>

      {load && <p className="loading">Carregando...</p>}
      {erro && <p className="error">{erro}</p>}

      {data && (
        <div className="result-container">
          <h2>Endereço do CEP informado:</h2>
          <p>Logradouro: {data.logradouro || "Não disponível"}</p>
          <p>Bairro: {data.bairro || "Não disponível"}</p>
          <p>Cidade: {data.localidade || "Não disponível"}</p>
          <p>Estado: {data.uf || "Não disponível"}</p>
        </div>
      )}
    </div>
  );
};

export default CepConsult;
