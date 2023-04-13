import './index.css'

export function Overlay({ children, show, onClick, duration }) {

  console.log('overlay')

  if (!show) {
    return
  }
  
  return (
    <div className="op-overlay" onClick={onClick}>
      { children }
    </div>
  )
}