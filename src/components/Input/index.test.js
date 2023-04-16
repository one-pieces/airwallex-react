import { render, fireEvent } from '@testing-library/react'
import { Input } from './index.js'

test('renders Input', () => {
  const value = 'test'
  const placeholder = 'Test'
  const handleChange = jest.fn()
  const { container } = render(
    <Input value={value} placeholder={placeholder} onChange={handleChange} />
  )

  expect(container.querySelector('.op-input')).toBeTruthy()

  const input = container.querySelector('input')
  expect(input.value).toBe(value)
  expect(input.placeholder).toBe(placeholder)

  const changedValue = 'tester'
  fireEvent.change(input, {target: {value: changedValue}})
  expect(handleChange).toHaveBeenCalledTimes(1)
})