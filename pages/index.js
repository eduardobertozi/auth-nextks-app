import { getCookie } from 'cookies-next'
import { verifica } from '@/services/user'

export default function Home() {
  return (
    <div>Página Segura</div>
  )
}
  
export const getServerSideProps = async ({ req, res }) =>  {
  try {
    const token = getCookie('authorization', { req, res })
    if (!token) throw new Error('Não autorizado. Token inválido')
    
    verifica(token)
    return {
      props: {}
    }
  } catch (err) {
    return {
      redirect: {
        permanent: false,
        destination: '/login',
      },
      props: {}
    }
  }
}