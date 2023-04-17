import { useEffect, useMemo, useState } from 'react'
import classnames from 'classnames'
import { Loading } from '../Loading'
import './index.scss'

export function Button(props) {
  const {
    children,
    loading,
    loadingText,
    loadingType,
    type,
    block,
    onClick,
    disabled: _disabled,
  } = props
  // console.log('button')

  const [disabled, setDisabled] = useState(_disabled)
  useEffect(() => {
    setDisabled(loading)
  }, [loading])

  const className = useMemo(() => {
    return classnames('op-button', props.className, {
      [`op-button--${type}`]: type,
      'op-button--block': block,
      'op-button--disabled': disabled,
    })
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
            <Loading className="op-button__loading" size={20} type={loadingType}></Loading>
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
  loadingType: undefined,
  loading: false,
  block: false,
  disabled: false,
  onClick: () => {},
}
