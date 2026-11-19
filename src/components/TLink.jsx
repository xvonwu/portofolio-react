import { useApp } from '../context.js'

/** Tautan internal yang memicu transisi tirai sebelum pindah halaman. */
export default function TLink({ to, children, onClick, ...rest }) {
  const { go } = useApp()
  return (
    <a
      href={`#${to}`}
      onClick={(e) => {
        e.preventDefault()
        onClick?.()
        go(to)
      }}
      {...rest}
    >
      {children}
    </a>
  )
}
