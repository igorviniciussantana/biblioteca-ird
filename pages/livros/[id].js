import { useRouter } from 'next/router'
import api from './../api/api';
import Head from 'next/head'
import Menu from './../components/menu'
import Link from 'next/link'

export const getStaticProps = async () => {
    const response = await api.get('/livros')
    const livro = await response.data
    return {
      props: {
        livro
      }
    }
  }



  export async function getStaticPaths() {
    const response = await api.get('/livros')
    const livro = await response.data

    return {
        paths: livro.map((livro) => ({ 
            params: {
              id: livro.id.toString(), 
            },
          })),
          fallback: false,
        };
    
  }


const RetornaLivro = function({livro}) {
  const router = useRouter()
  const { id } = router.query

return(
    <div>
    {livro.map(function(livro) {

        if(livro.id == {id}.id){
        return(
          <div className='containerDynamic'><Head><title>Biblioteca IRD - {livro.titulo}</title></Head>
          <Menu/>
          <main className="mainDynamic">
            <div className='dynamicCard'>
             <img src='/book-icon.svg'/>
         <h1 className='dynamicTitle'>{livro.titulo}</h1>
         <p><strong>Data de Publicação:</strong><br/>{livro.data_publicacao.substr(0,[10])}</p>
         <p><strong>ID do Autor:</strong> {livro.autorId}</p>
              <p><strong>Editora:</strong> {livro.editora}</p>
              <p><strong>Preço:</strong> {livro.preco}</p>
         <Link href={'/../autores/' + livro.autorId}><button type="button" className='buttonDynamic'>Autor</button></Link>
         </div>
         </main>
        </div>
      
        )}


      })}
</div>
)
  
  
}

export default RetornaLivro

