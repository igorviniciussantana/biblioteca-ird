import axios from 'axios'
import Head from 'next/head'
import Link from "next/link";
import { useRouter } from "next/router";
import { useState } from "react";
import { toast, ToastContainer } from 'react-nextjs-toast'
import styles from '../styles/Home.module.css'
import Menu from './components/menu'
import api from './api/api';


export default function AdicionarAutor(props){
    const [values, setValues] = useState({
        nome: "", 
        sobrenome:"",
        data_nascimento:"",
    })

    let router = useRouter();
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(values)

const response = await api.post("/autores", values)
console.log(response)
toast.notify("Autor inserido com sucesso")
router.push('/autores')

}

const handleInputChange = (e) => {
    const { id, value } = e.target;
    setValues({ ...values, [id]: value });

}; 

return(
    <>
<Head><title>Biblioteca IRD - Autores</title></Head>
<div className="container">
<Menu/>
<ToastContainer />

<main className='mainAutores'>
    <div className="brilho"></div>
   
    <h1 className='autoresTitle'> Cadastrar Autor </h1>

        <form onSubmit={handleSubmit}>

        <div className="tela">

          <label className="nomelabel" htmlFor="nome">Nome </label>
          <input placeholder='Insira o nome do autor'
            id="nome"
            type="text"
            value={values.nome}
            onChange={handleInputChange}
          />
       

        
          <label  className="sobrenomelabel" htmlFor="sobrenome">SobreNome </label>
          <input placeholder='Insira o sobrenome do autor'
            id="sobrenome"
            type="text"
            value={values.sobrenome}
            onChange={handleInputChange}
          />
      

        
          <label className="datalabel" htmlFor="data">Data de Nascimento </label>
          <input 
            id="data_nascimento"
            type="date"
            value={values.data_nascimento}
            onChange={handleInputChange}
          />
       <div className="botao-livro">
        <button className="addcategoria" type="submit">Adicionar </button>
        <button className="volta-livro" type="submit" onClick={() =>{
 setValues({
      nome:"",
      sobrenome: "", 
        data_nascimento:""
    })


        }}>Limpar</button>
</div>
        </div>
        </form>
        </main>
</div>

</>
)
}