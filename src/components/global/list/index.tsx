import type { HtmlHTMLAttributes } from 'react'
import './list.css'

export default function List({ children, ...props }: HtmlHTMLAttributes<HTMLUListElement>) {
  return (
    <ul {...props}>
      {children}
    </ul>
  )
}