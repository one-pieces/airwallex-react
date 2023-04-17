import { useRef } from 'react'
import { Button } from 'components/Button'
import { useToggle } from 'use/useToggle'
import { InvitePopup } from './components/InvitePopup'
import { ResultPopup } from './components/ResultPopup'
import './index.scss'

function HomePage() {
  const ResultPopupRef = useRef(null)
  const [isPopupShown, togglePopup] = useToggle(false)

  const onSuccess = () => {
    togglePopup()
    ResultPopupRef.current.open()
  }

  return (
    <div className="home-page">
      <header className="header">
        BROCCOLI & CO.{' '}
        <a className="readme" href={`/readme`}>
          readme
        </a>
      </header>
      <section className="content">
        <h1>A better way</h1>
        <h1>to enjoy every day.</h1>
        <div>Be the first to know when we launch.</div>
        <Button className="content__btn" onClick={togglePopup}>
          Request an invite
        </Button>
      </section>
      <footer className="footer">
        <div className="footer__container">
          <div>Made with ❤️ in Melbourne.</div>
          <div>2016 Broccoli & Co. All rights reserved.</div>
        </div>
      </footer>

      {isPopupShown && <InvitePopup onClose={togglePopup} onSuccess={onSuccess}></InvitePopup>}
      <ResultPopup ref={ResultPopupRef} />
    </div>
  )
}

export default HomePage
