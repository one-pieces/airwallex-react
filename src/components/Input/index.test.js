import { render, fireEvent, screen } from '@testing-library/react'
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
  fireEvent.change(input, { target: { value: changedValue } })
  expect(handleChange).toHaveBeenCalledTimes(1)
})

test('renders Input using rules', () => {
  const nameRules = [
    {
      message: 'Full name needs to be at least 3 characters long',
      trigger: 'onChange', // onChange、onSubmit
      validator: (v) => {
        // Fullname 至少 3 个字符
        return v.length >= 3
      },
    },
  ]
  const value = 'test'
  const placeholder = 'Test'
  const handleChange = jest.fn()
  const { container } = render(
    <Input value={value} placeholder={placeholder} rules={nameRules} onChange={handleChange} />
  )

  const input = container.querySelector('input')
  expect(input.value).toBe(value)
  expect(screen.queryByText('Full name needs to be at least 3 characters long')).toBeFalsy()

  const changedValue = 'te'
  fireEvent.change(input, { target: { value: changedValue } })
  expect(handleChange).toHaveBeenCalledTimes(0)
  expect(screen.getByText('Full name needs to be at least 3 characters long')).toBeTruthy()
})
