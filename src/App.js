import { useRef } from 'react'
import { Button } from './components/Button'
import { InvitePopup } from './InvitePopup'
import { ResultPopup } from './ResultPopup'
import { useToggle } from './use/useToggle'
import './App.css'

function App() {
  // console.log('app')
  const ResultPopupRef = useRef(null)
  const [isPopupShown, togglePopup] = useToggle(false)

  const onSuccess = () => {
    togglePopup()
    ResultPopupRef.current.open()
  }

  return (
    <div className="App">
      <header className='header'>BROCCOLI & CO.</header>
      <section className='content'>
        <h1>A better way</h1>
        <h1>to enjoy every day.</h1>
        <div>Be the first to know when we launch.</div>
        <Button className='content__btn' onClick={togglePopup}>Request an invite</Button>
      </section>
      <footer className='footer'>
        <div className='footer__container'>
          <div>Made with ❤️ in Melbourne.</div>
          <div>2016 Broccoli & Co. All rights reserved.</div>
        </div>
      </footer>

      {
        isPopupShown &&
        <InvitePopup onClose={togglePopup} onSuccess={onSuccess}></InvitePopup>
      }
      <ResultPopup ref={ResultPopupRef} />
    </div>
  );
}

export default App;
