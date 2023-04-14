import { useMemo } from 'react'
import { Overlay } from '../Overlay'
import './index.css'

export function Popup(props) {
  console.log('popup')
  const { children, show, position, onClose } = props
  const OverlayMemo = useMemo(() => {
    return (
      <Overlay show={show} onClick={onClose}></Overlay>
    )
  }, [show, onClose])

  const renderPopup = () => {
    if (!show) {
      return
    }
    return (
      <div className={`op-popup op-popup--${position}`}>
        {children}
      </div>
    )
  }

  return (
    <>
      {OverlayMemo}
      {renderPopup()}
    </>
  )
}

Popup.defaultProps = {
  show: false,
  position: 'center',
  onClose: () => {}
}