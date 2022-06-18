import axios from 'axios'
import Head from 'next/head'
import Link from "next/link";
import { useRouter } from "next/router";
import { useState } from "react";
import styles from '../styles/Home.module.css'
import Menu from './components/menu'
import api from './api/api';


export default function AdicionarLivro(props){
    const [values, setValues] = useState({
      autorId:"",
      titulo: "", 
        editora:"",
        data_publicacao:"",
        preco:"",
    })

    let router = useRouter();
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(values)

const response = await api.post("/livros", values)
console.log(response)
alert("Livro adicionado com sucesso")   
router.push('/livros')


}

const handleInputChange = (e) => {
    const { id, value } = e.target;
    setValues({ ...values, [id]: value });

}; 

return(
    <>
<Head><title>Biblioteca IRD - Bem Vindo!</title></Head>
<div className="container">
<Menu/>

    <div className="brilho"></div>
   
        <h1> Cadastrar Livro </h1>

        <form onSubmit={handleSubmit}>

        <div>
          <label className="nomelabel" htmlFor="titulo">Titulo </label>
          <input placeholder='Insira o titulo do livro'
            id="titulo"
            type="text"
            value={values.titulo}
            onChange={handleInputChange}
          />
        </div>

        <div>
          <label  className="sobrenomelabel" htmlFor="editora">Editora </label>
          <input placeholder='Insira a editora do livro'
            id="editora"
            type="text"
            value={values.editora}
            onChange={handleInputChange}
          />
        </div>

        <div>
          <label className="datalabel" htmlFor="data_publicacao">Data de Publicacao </label>
          <input placeholder='Insira a data da publicacao'
            id="data_publicacao"
            type="date"
            value={values.data_publicacao}
            onChange={handleInputChange}
          />
        </div>

        <div>
          <label className="precolabel" htmlFor="preco">Preco </label>
          <input placeholder='Insira o preco do livro'
            id="preco"
            type="number"
            value={values.preco}
            onChange={handleInputChange}
          />
        </div>

        <div>
          <label className="autoridlabel" htmlFor="autorId">Id do Autor </label>
          <input placeholder='Insira id do autor'
            id="autorId"
            type="number"
            value={values.autorId}
            onChange={handleInputChange}
          />
        </div>

        <button className="addcategoria" type="submit">Adicionar </button>
        </form>
</div>
</>
)
}