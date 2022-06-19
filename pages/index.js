import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'
import Menu from './components/menu'
import Link from 'next/link'

export default function Home() {
  return (
    <>
    <Head><title>Biblioteca IRD - Bem Vindo!</title></Head>
    <div className="container">
<Menu/>

<div className="brilho"></div>
      <div className='circle1'></div>
      <div className='circle2'></div>
<main className='mainInicial'>
  <div>
      <h1 className="initTitle">Onde a leitura te leva <span>a sonhar.</span></h1>
      <Link href="/livros"><button type='button' className='indexButton'>Saiba Mais</button></Link>
      
      </div>
      <img src='../reading-svg.svg'/>
      </main>
      
      
    </div>
    </>
  )
}
