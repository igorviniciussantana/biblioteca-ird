import { useRouter } from 'next/router'
import api from './../api/api';
import Menu from './../components/menu'
import Link from 'next/link'


export const getStaticProps = async () => {
    const response = await api.get('/autores')
    const autor = await response.data
    return {
      props: {
        autor
      }
    }
  }



  export async function getStaticPaths() {
    const response = await api.get('/autores')
    const autor = await response.data

    return {
        paths: autor.map((autor) => ({ //pra cada pokemon na resposta, um caminho sera gerado
            params: {
              id: autor.id.toString(), //necessario usar o toString porque não aceita inteiro como caminho (path)
            },
          })),
          fallback: false,
        };
    
  }


const Dynamic = function({autor}) {
  const router = useRouter()
  const { id } = router.query

return(
    <div>
    {autor.map(function(autor) {

        if(autor.id == {id}.id){
        return(
      <div className='container'>
        <Menu/>
        <main className="mainAutores">
       <h1 className='autoresTitle'>{autor.nome} {autor.sobrenome}</h1>
       <p>Data de Nascimento: {autor.data_nascimento}</p>
       <Link href={'livros/' + autor.id}><button type="button" className='buttonLivros'>Livros</button></Link>
       </main>
      </div>
      
        )}


      })}
</div>
)
  
  
}

export default Dynamic

