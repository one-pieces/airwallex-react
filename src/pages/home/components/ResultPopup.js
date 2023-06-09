import { useState, forwardRef, useImperativeHandle } from 'react'
import { Button } from 'components/Button'
import { Popup } from 'components/Popup'

export const ResultPopup = forwardRef(function ResultPopup(props, ref) {
  const [shown, setShown] = useState(false)

  useImperativeHandle(
    ref,
    () => {
      return {
        open: () => {
          setShown(true)
        },
        close: () => {
          setShown(false)
        },
      }
    },
    []
  )

  if (!shown) {
    return
  }

  const onClose = () => {
    setShown(false)
  }
  return (
    <Popup onClose={onClose}>
      <h1>All done!</h1>
      <div>You will be one of the first to experience Broccoli & Co. when we launch</div>
      <Button type="primary" block onClick={onClose}>
        OK
      </Button>
    </Popup>
  )
})
