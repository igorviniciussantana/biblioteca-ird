import { useRouter } from 'next/router'
import api from './../api/api';

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
        paths: livro.map((livro) => ({ //pra cada pokemon na resposta, um caminho sera gerado
            params: {
              id: livro.id.toString(), //necessario usar o toString porque não aceita inteiro como caminho (path)
            },
          })),
          fallback: false,
        };
    
  }


const retornaLivro = function({livro}) {
  const router = useRouter()
  const { id } = router.query

return(
    <div>
    {livro.map(function(livro) {

        if(livro.id == {id}.id){
        return(
      <div>
       <p>{livro.titulo}</p>
       
      </div>
      
        )}


      })}
</div>
)
  
  
}

export default retornaLivro

