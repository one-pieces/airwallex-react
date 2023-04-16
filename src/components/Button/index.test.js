import { render, screen, fireEvent } from '@testing-library/react'
import { Button } from './index.js'

test('renders Button', () => {
  const handleClick = jest.fn()

  const { container } = render(
    <Button onClick={handleClick} />
  )

  expect(container.querySelector('.op-button')).toBeTruthy()
  expect(container.querySelector('.op-button__loading')).toBeFalsy()

  fireEvent.click(container.querySelector('button'))
  expect(handleClick).toHaveBeenCalledTimes(1)
})


test('renders Button loading', () => {
  const { container, rerender } = render(
    <Button loading={true} loadingText='loading' />
  )
  expect(container.querySelector('.op-button__loading')).toBeTruthy()
  expect(screen.getByText('loading')).toBeTruthy()

  rerender(
    <Button loading={false} loadingText='loading' />
  )
  expect(container.querySelector('.op-button__loading')).toBeFalsy()
  expect(screen.queryByText('loading')).toBeFalsy()
})