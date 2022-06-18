import Head from 'next/head'
import Image from 'next/image'
import Link from 'next/link'
import styles from '../styles/Home.module.css'
import Menu from './components/menu'
import api from './api/api';
import { useState } from 'react';
import { useRouter } from "next/router";

export const getStaticProps = async () => {
    const response = await api.get('/livros')
    const livro = await response.data
    return {
      props: {
        livro
      }
    }
  }


export default function Livros({ livro }) {
    
const [busca, setBusca] = useState('');


const filtraBusca = livro.filter(({titulo}) => titulo.toLowerCase().includes(busca.toLowerCase()))

const numeroLivros = function(){

  if(livro.length > 1){
  return(
  
    <span>{livro.length} livros registrados</span>
  )
  }else{
  
    return(
  
      <span>{livro.length} livro registrado</span>
    )
  
  }
  
  };
  const router = useRouter();
  if(livro.length >=1){
return (
    <>

    <Head><title>Biblioteca IRD - Bem Vindo!</title></Head>
    <div className="container">
<Menu/>
<div className="brilho"></div>
<main className='mainLivros'>
  



  <h1 className='livrosTitle'>Livros - Temos {numeroLivros()}</h1>
  <input type="text" className='livrosInput'placeholder='Buscar livro...' onChange={(ev) => setBusca(ev.target.value)}/>
  <Link href='/addLivro'><button className='livrosButton'>Novo Livro</button></Link>
  <div className='scroll'>
  
  {filtraBusca.map((livro) => {
    function deletar(){
      const response =  api.delete("/livros/" + parseInt(livro.id))
      alert("Livro excluido com sucesso")   
      router.push('/livros')
    }
            return(
<div key={livro.id} className="livroCard">
              <Link href={'livros/'+ livro.id}><h1>{livro.titulo}</h1></Link>
              <p><strong>Data de Publicação:</strong> {livro.data_publicacao.substr(0,[10])}</p>
              <p><strong>ID do Autor:</strong> {livro.autorId}</p>
              <p><strong>Editora:</strong> {livro.editora}</p>
              <div className="buttonsDiv">
              <Link href={'autores/' + livro.autorId}><button type="button" className='buttonAutor'>Autor</button></Link>
              <button type="button" className='buttonDeletar' onClick={deletar}>Deletar</button></div>
            
            </div>

  
)

           })}





  </div>
  </main>

    </div>
    </>
  )}else{
    return (
      <>
  
      <Head><title>Biblioteca IRD - Bem Vindo!</title></Head>
      <div className="container">
  <Menu/>
  <div className="brilho"></div>
  <main className='mainLivros'>
    
  
  
  
    <h1 className='livrosTitle'>Livros - Temos {numeroLivros()}</h1>
    <input type="text" className='livrosInput'placeholder='Buscar livro...' onChange={(ev) => setBusca(ev.target.value)}/>
    <Link href='/addLivro'><button className='livrosButton'>Novo Livro</button></Link>
    
  
         
    <h1 className='livrosTitle'><center>Não há livros</center></h1>
  
  
  
 
    </main>
  
      </div>
      </>



  )}
}
