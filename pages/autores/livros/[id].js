import { useRouter } from 'next/router'
import api from './../../api/api';
import Menu from '../../components/menu'
import Link from 'next/link'


export const getStaticProps = async () => {
    const responseLivro = await api.get('/livros')
    const livro = await responseLivro.data
    const responseAutor = await api.get('/autores')
    const autor = await responseAutor.data
    return {
      props: {
        livro,
        autor
      }
    }
  }



  export async function getStaticPaths() {
    const response = await api.get('/livros')
    const livro = await response.data

    return {
        paths: livro.map((livro) => ({ 
            params: {
              id: livro.autorId.toString(), 
            },
          })),
          fallback: false,
        };
    
  }


const AutorLivro = function({livro, autor}) {
  const router = useRouter()
  const { id } = router.query

return(
    <div className='container'>
      <Menu/>
      <main className='mainAutores'>
      <h1 className='autoresTitle'>{autor.map(function(autor) {

if(autor.id == {id}.id){
return(
<>
{autor.nome} {autor.sobrenome}
</>


)}


})}</h1>
<div className='scroll'>
    {livro.map(function(livro) {

        if(livro.autorId == {id}.id){
        return(
          <div key={livro.id} className="livroCard">
          <Link href={'/../../livros/'+ livro.id}><h1>{livro.titulo}</h1></Link>
          <p><strong>Data de Publicação:</strong> {livro.data_publicacao.substr(0,[10])}</p>
          <p><strong>ID do Autor:</strong> {livro.autorId}</p>
          <p><strong>Editora:</strong> {livro.editora}</p>
          <div className="buttonsDiv">
          <Link href={'../' + livro.autorId}><button type="button" className='buttonAutor'>Autor</button></Link>
          <button type="button" className='buttonDeletar'>Deletar</button></div>
        
        </div>
      
        )}


      })}</div></main>
</div>
)
  
  
}

export default AutorLivro

