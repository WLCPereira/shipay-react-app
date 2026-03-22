import type { LiHTMLAttributes } from 'react'
import './list-item.css'

export default function ListItem({ children, ...props }: LiHTMLAttributes<HTMLLIElement>) {
  return (
    <li {...props}>
      {children}
    </li>
  )
}