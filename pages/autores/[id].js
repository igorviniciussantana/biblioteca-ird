import { useRouter } from 'next/router'
import api from './../api/api';
import Menu from './../components/menu'
import Link from 'next/link'
import Head from 'next/head'

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
        paths: autor.map((autor) => ({ 
            params: {
              id: autor.id.toString(), 
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
          
      <div className='containerDynamic'><Head><title>Biblioteca IRD - {autor.nome}</title></Head>
        <Menu/>
        <main className="mainDynamic">
          <div className='dynamicCard'>
           <img src='/person-icon.svg'/>
       <h1 className='dynamicTitle'>{autor.nome}<br/>{autor.sobrenome}</h1>
       <p><strong>Data de Nascimento:</strong><br/>{autor.data_nascimento.substr(0,[10])}</p>
       <Link href={'livros/' + autor.id}><button type="button" className='buttonDynamic'>Livros</button></Link>
       </div>
       </main>
      </div>
      
        )}


      })}
</div>
)
  
  
}

export default Dynamic

