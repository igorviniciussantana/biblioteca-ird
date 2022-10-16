import Head from "next/head";
import Image from "next/image";
import Link from "next/link";
import Menu from "./components/menu";
import api from "./api/api";
import { useState } from "react";
import { useRouter } from "next/router";

export const getStaticProps = async () => {
  const response = await api.get("/autores/", {
    headers: {
      Accept: "application/json",
      "User-Agent": "axios 0.21.1",
      "Access-Control-Allow-Origin": "*",
    },
  });
  const autor = await response.data;
  return {
    props: {
      autor,
    },
  };
};

export default function Autores({ autor }) {
  const [busca, setBusca] = useState("");

  //{nome, sobrenome}) => nome.toLowerCase().includes(busca.toLowerCase()) + sobrenome.toLowerCase().includes(busca.toLowerCase())
  const filtraBusca = autor.filter(
    ({ nome, sobrenome }) =>
      nome.toLowerCase().includes(busca.toLowerCase()) +
      sobrenome.toLowerCase().includes(busca.toLowerCase())
  );
  const numeroAutores = function () {
    if (autor.length > 1) {
      return <span>{autor.length} autores registrados</span>;
    } else {
      return <span>{autor.length} autor registrado</span>;
    }
  };
  const router = useRouter();
  if (autor.length >= 1) {
    return (
      <>
        <Head>
          <title>Biblioteca IRD - Autores</title>
        </Head>
        <div className="container">
          <Menu />
          <main className="mainAutores">
            <h1 className="autoresTitle">Autores - Temos {numeroAutores()}</h1>
            <input
              type="text"
              className="autoresInput"
              placeholder="Buscar autor..."
              onChange={(ev) => setBusca(ev.target.value)}
            />
            <Link href="/addAutor">
              <button className="autoresButton">Novo Autor</button>
            </Link>

            <div className="scroll">
              {filtraBusca.map((autor) => {
                async function deletar() {
                  const response = await api.delete(
                    "/autores/" + parseInt(autor.id)
                  );
                  alert("Autor excluido com sucesso");
                  router.push("/autores");
                }
                return (
                  <div key={autor.id} className="autorCard">
                    <Link href={"autores/" + autor.id}>
                      <h1 className="autorNome">
                        {autor.nome} <br /> {autor.sobrenome}
                      </h1>
                    </Link>
                    <p>Nascimento: {autor.data_nascimento.substr(0, [10])}</p>
                    <p>Id do Autor: {autor.id}</p>
                    <div className="buttonsDiv">
                      <Link href={"autores/livros/" + autor.id}>
                        <button type="button" className="buttonLivros">
                          Livros
                        </button>
                      </Link>
                      <button
                        type="button"
                        className="buttonDeletar"
                        onClick={deletar}
                      >
                        Deletar
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          </main>
        </div>
      </>
    );
  } else {
    return (
      <>
        <Head>
          <title>Biblioteca IRD - Autores</title>
        </Head>
        <div className="container">
          <Menu />
          <ToastContainer />
          <main className="mainAutores">
            <h1 className="autoresTitle">
              Autores - Temos {numeroAutores()} registrados
            </h1>
            <input
              type="text"
              className="autoresInput"
              placeholder="Buscar autor..."
              onChange={(ev) => setBusca(ev.target.value)}
            />
            <Link href="/addAutor">
              <button className="autoresButton">Novo Autor</button>
            </Link>
            <h1 className="autoresTitle">
              <center>Não há autores</center>
            </h1>
          </main>
        </div>
      </>
    );
  }
}
