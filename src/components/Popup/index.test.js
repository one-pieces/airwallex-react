import { render, screen, fireEvent } from '@testing-library/react'
import { Popup } from './index.js'

test('renders Popup', () => {
  const handleClose = jest.fn()

  const { container } = render(
    <Popup onClose={handleClose}>
      <div>test</div>
    </Popup>
  )

  expect(container.querySelector('.op-overlay')).toBeTruthy()
  expect(container.querySelector('.op-popup')).toBeTruthy()

  const PopupEle = screen.getByText('test')
  expect(PopupEle).toBeTruthy()

  fireEvent.click(container.querySelector('.op-overlay'))
  expect(handleClose).toHaveBeenCalledTimes(1)
})
