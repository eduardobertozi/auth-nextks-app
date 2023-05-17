import styles from './Botao.module.css'

export default function Botao({ children, ...props }) {
  return (
    <button {...props} className={styles.botao}>
      {children}
    </button>
  )
}