import { Children, startTransition, useActionState, useEffect, useMemo, useState } from 'react'
import { matchesCaseInsensitive } from '@/utils/stringUtils'
import { List, ListItem } from '@/components';

export default function App() {
  const [paymentMethods, dispatchPaymentMethods, isPending] = useActionState<PaymentMethod[]>(fetchPaymentMethods, [])
  const [searchTerm, setSearchTerm] = useState('')

  const filterPaymentMethods = useMemo(() => {
    const filtered = paymentMethods?.filter((method) =>
      matchesCaseInsensitive(method.name, searchTerm)
    )
    const data = searchTerm.length ? filtered : paymentMethods
    return Children.toArray(
          data.map((method) => {
            return (
              <ListItem
                key={method.id}
                className='fade-in' 
              >
                {method.name}
              </ListItem>
            )
          })
        )
  }, [paymentMethods, searchTerm]);

  useEffect(() => {
    startTransition(() => {
      dispatchPaymentMethods()
    })
  }, [])

  if (isPending) {
    return <div>Loading...</div>
  }

  return (
    <div>
      <div>
        <input
          type="text"
          placeholder="Search payment methods..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>
      <List>
        {filterPaymentMethods}
      </List>
    </div>
  );

  async function fetchPaymentMethods (){
      try {
        const response = (await import('@/data/paymentMethods.json')) as {
          paymentMethods: PaymentMethod[]
        }
        return response.paymentMethods
      } catch {
        return []
      } 
    }
}
