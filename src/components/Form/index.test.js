import { fireEvent, render, screen } from '@testing-library/react'
import { Form } from './index.js'
import { Input } from '../Input'
import { Button } from '../Button'

test('renders Form submit success', () => {
  const handleSubmit = jest.fn()
  const nameRules = [
    {
      message: 'Full name needs to be at least 3 characters long',
      trigger: 'onSubmit', // onChange、onSubmit
      validator: (v) => {
        // Fullname 至少 3 个字符
        return v.length >= 3
      },
    },
  ]

  const { container } = render(
    <Form onSubmit={handleSubmit}>
      <Input value={'test'} placeholder="name" rules={nameRules} />
      <Button>submit</Button>
    </Form>
  )

  expect(container.querySelector('form')).toBeTruthy()
  expect(screen.getByPlaceholderText('name')).toBeTruthy()
  expect(screen.queryByText('Full name needs to be at least 3 characters long')).toBeFalsy()
  expect(screen.getByText('submit')).toBeTruthy()

  fireEvent.click(screen.getByText('submit'))
  expect(handleSubmit).toHaveBeenCalledTimes(1)
})

test('renders Form submit fail', () => {
  const handleSubmit = jest.fn()
  const nameRules = [
    {
      message: 'Full name needs to be at least 3 characters long',
      trigger: 'onSubmit', // onChange、onSubmit
      validator: (v) => {
        // Fullname 至少 3 个字符
        return v.length >= 3
      },
    },
  ]

  const { container } = render(
    <Form onSubmit={handleSubmit}>
      <Input value={'te'} placeholder="name" rules={nameRules} />
      <Button>submit</Button>
    </Form>
  )

  expect(container.querySelector('form')).toBeTruthy()
  expect(screen.getByPlaceholderText('name')).toBeTruthy()
  // expect(screen.getByText('Full name needs to be at least 3 characters long')).toBeTruthy()
  expect(screen.getByText('submit')).toBeTruthy()

  fireEvent.click(screen.getByText('submit'))
  expect(handleSubmit).toHaveBeenCalledTimes(0)
})
