import { createPortal } from 'react-dom'
import './index.css'

function PopupIn(props) {
  // console.log('popup')
  const { children, position, onClose } = props

  return (
    <>
      <div className="op-overlay" onClick={onClose}></div>
      <div className={`op-popup op-popup--${position}`}>
        <div className="op-popup__content">{children}</div>
      </div>
    </>
  )
}

export function Popup(props) {
  const { container } = props
  if (container) {
    return createPortal(<PopupIn {...props} />, container)
  }
  return <PopupIn {...props} />
}

Popup.defaultProps = {
  position: 'center',
  container: null,
  onClose: () => {},
}
