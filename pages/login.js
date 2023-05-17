import { useState } from 'react'
import styles from '@/src/styles/Login.module.css'
import Link from 'next/link';
import { useRouter } from 'next/router'
import { setCookie } from 'cookies-next'

import LoginCard from "@/src/components/login-card";
import Input from '@/src/components/input';
import Botao from '@/src/components/botao';

export default function LoginPage() {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  })

  const [error, setError] = useState('')
  const router = useRouter()

  const handleFormEdit = (event, name) => {
    setFormData({
      ...formData,
      [name]: event.target.value
    })
  }
  
  const handleForm = async (event) => {
    try {
      event.preventDefault()

      const response = await fetch(`/api/user/login`, {
        method: 'POST',
        body: JSON.stringify(formData)
      })

      const json = await response.json()
      if (response.status !== 200) throw new Error(json)

      setCookie('authorization', json)
      router.push('/')
    } catch (err) {
      setError(err.message)
    }
  }
  
  return (
    <div className={styles.background}>
      <LoginCard title="Entre com sua conta">
        <form className={styles.form}>
          <Input 
            type="email" 
            placeholder="Seu e-mail"
            required
            value={formData.email} 
            onChange={(e) => handleFormEdit(e, 'email')}
          />
          <Input 
            type="password"
            placeholder="Sua senha"
            required
            value={formData.password} 
            onChange={(e) => handleFormEdit(e, 'password')}
          />

          <Botao type='submit' onClick={(e) => handleForm(e)}>
            Entrar
          </Botao>

          {error && <p className={styles.error}>*{error}</p>}
 
          <Link href="/cadastro">
            Ainda não tem uma conta? <u>Cadastrar-se grátis</u>
          </Link>
        </form>
      </LoginCard>
    </div>
  )
}