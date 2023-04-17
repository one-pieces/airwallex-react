import { useEffect, useMemo, useState } from 'react'
import { Loading } from '../Loading'
import './index.css'

export function Button(props) {
  const { children, loading, loadingText, type, block, onClick, disabled: _disabled } = props
  // console.log('button')

  const [disabled, setDisabled] = useState(_disabled)
  useEffect(() => {
    setDisabled(loading)
  }, [loading])

  const className = useMemo(() => {
    return `${props.className ?? ''} op-button op-button--${type} ${
      block ? 'op-button--block' : ''
    } ${disabled ? 'op-button--disabled' : ''}`
  }, [type, block, disabled, props.className])

  const hanldeClick = (e) => {
    if (disabled) {
      e.preventDefault()
      return
    }
    onClick(e)
  }
  return (
    <button className={className} onClick={hanldeClick}>
      <div className="op-button__content">
        {loading ? (
          <>
            <Loading className="op-button__loading" size={20}></Loading>
            <span>{loadingText}</span>
          </>
        ) : (
          children
        )}
      </div>
    </button>
  )
}

Button.defaultProps = {
  type: 'default',
  loadingText: '',
  loading: false,
  block: false,
  disabled: false,
  onClick: () => {},
}
