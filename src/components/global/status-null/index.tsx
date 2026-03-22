import './satus-null.css'

interface StatusNullProps {
    text?: string
}

export default function StatusNull(props: StatusNullProps) {
  return (
    <div className='status-null'>
      {props.text || 'Não encontramos resultados para a sua busca.'}
    </div>
  )
}