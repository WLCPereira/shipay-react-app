import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { expect, test } from '@jest/globals'
import App from '../src/App'

test('renderizar input de busca', async () => {
  render(<App />)

  const searchInput = await screen.findByPlaceholderText(/Filtrar métodos de pagamento/i)
  expect(searchInput).toBeDefined()
})

test('Busca por métodos de pagamento', async () => {
  const user = userEvent.setup()
  render(<App />)

  const searchInput = await screen.findByPlaceholderText(/Filtrar métodos de pagamento/i)
  await user.type(searchInput, 'cash out')

  const filteredItems = await screen.findAllByRole('listitem')
  expect(filteredItems.length).toBe(1)
  expect(filteredItems[0].textContent).toMatch(/cash out - payment/i)
})

test('Mostrar status nulo quando nenhum método for encontrado', async () => {
  const user = userEvent.setup()
  render(<App />)
  const searchInput = await screen.findByPlaceholderText(/Filtrar métodos de pagamento/i)
  await user.type(searchInput, 'teste')
  expect(screen.queryAllByText(/Não encontramos resultados para a sua busca./i)).toBeDefined()
})

test('limpa o input de busca e mostra todos os métodos de pagamento', async () => {
  const user = userEvent.setup()
  render(<App />)

  const searchInput = await screen.findByPlaceholderText(/Filtrar métodos de pagamento/i)
  await user.type(searchInput, 'cash out')

  let filteredItems = await screen.findAllByRole('listitem')
  expect(filteredItems.length).toBe(1)

  await user.clear(searchInput)
  filteredItems = await screen.findAllByRole('listitem')
  expect(filteredItems.length).toBeGreaterThan(1)
})

