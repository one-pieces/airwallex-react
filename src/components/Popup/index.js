import './index.css'

export const Popup = function Popup(props, ref) {
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

Popup.defaultProps = {
  position: 'center',
  onClose: () => {},
}
