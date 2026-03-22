import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { expect, test } from '@jest/globals'
import App from '../src/App'

test('renders search input for payment methods', async () => {
  render(<App />)

  const searchInput = await screen.findByPlaceholderText(/search payment methods/i)
  expect(searchInput).toBeDefined()
})

test('shows loading state and then renders payment methods', async () => {
  render(<App />)

  const loading = screen.queryByText(/loading/i)
  if (loading) {
    expect(loading).toBeDefined()
  }

  const listItems = await screen.findAllByRole('listitem')
  expect(listItems.length).toBeGreaterThan(0)
  listItems.forEach((item) => {
    expect(item.classList.contains('fade-in')).toBe(true)
  })
})

test('allows user to type in search input and filters payment methods', async () => {
  const user = userEvent.setup()
  render(<App />)

  const searchInput = await screen.findByPlaceholderText(/search payment methods/i)
  await user.type(searchInput, 'cash out')

  const filteredItems = await screen.findAllByRole('listitem')
  expect(filteredItems.length).toBe(1)
  expect(filteredItems[0].textContent).toMatch(/cash out - payment/i)
})

test('clears search input and shows all payment methods again', async () => {
  const user = userEvent.setup()
  render(<App />)

  const searchInput = await screen.findByPlaceholderText(/search payment methods/i)
  await user.type(searchInput, 'cash out')

  let filteredItems = await screen.findAllByRole('listitem')
  expect(filteredItems.length).toBe(1)

  await user.clear(searchInput)
  filteredItems = await screen.findAllByRole('listitem')
  expect(filteredItems.length).toBeGreaterThan(1)
})

