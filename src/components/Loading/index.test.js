import { render } from '@testing-library/react'
import { Loading } from './index.js'

test('renders Loading', () => {
  const { container } = render(
    <Loading />
  )

  expect(container.querySelector('.op-loading')).toBeTruthy()
})