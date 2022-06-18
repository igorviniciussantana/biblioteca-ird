import Head from 'next/head'
import Image from 'next/image'
import Link from 'next/link'

export default function Menu() {
  return (
    <>
    <div className="menu" id="menu">
    
<main className="mainMenu">
     <Link href="/"><h1 id="titulo">Biblioteca IRD</h1></Link>
    <Link href="/autores"><h2 id="sub1">autores</h2></Link>
    <Link href="/livros"><h2 id="sub2">livros</h2></Link>
     </main>
    </div>
    </>
  )
}
