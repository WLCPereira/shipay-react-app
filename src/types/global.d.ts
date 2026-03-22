declare global {
  type Nullable<T> = T | null
  type Optional<T> = T | undefined
  type ValueOf<T> = T[keyof T]
  type FC<P = Record<string, unknown>> = React.FC<P>
  type ReactNode = React.ReactNode
  type ReactElement = React.ReactElement
  interface PaymentMethod {
    id: number
    name: string
  }
}

export {}
