import './index.css'

const SpinIcon = Array(12)
  .fill(null)
  .map((_, index) => <i className={`op-loading__line--${String(index + 1)}`} />)

const CircularIcon = (
  <svg className="op-loading__circular" viewBox="25 25 50 50">
    <circle cx="50" cy="50" r="20" fill="none" />
  </svg>
)

export function Loading(props) {
  const { className, type, color, size } = props
  const DefaultIcon = type === 'spinner' ? SpinIcon : CircularIcon
  return (
    <div className={`op-loading ${className ?? ''}`}>
      <span className="op-loading__spinner" style={{ color, width: size, height: size }}>
        {DefaultIcon}
      </span>
    </div>
  )
}

Loading.defaultProps = {
  type: 'circular',
  color: '',
  size: 30,
}
