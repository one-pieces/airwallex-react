import { useCallback, useMemo, useRef, useState } from 'react'
import { Popup } from './components/Popup'
import { Input } from './components/Input'
import { sendInvitation } from './api'
import './App.css';

function App() {
  const [isPopupShown, setIsPopupShown] = useState(false)

  console.log('app')

  const onBtnClick = () => {
    setIsPopupShown(true)
  }
  const onConfirm = async (params) => {
    console.log(params)

    const res = await sendInvitation(params)
    console.log('====res===', res)
  }

  // 子组件回调函数最好加 useCallback，防止父组件重复渲染，产生不必要的新方法时，导致子组件重新渲染
  const onClose = useCallback(() => {
    setIsPopupShown(false)
  }, [])

  return (
    <div className="App">
      <header className='header'>BROCCOLI & CO.</header>
      <section className='content'>
        <h1>A better way</h1>
        <h1>to enjoy every day.</h1>

        <div>Be the first to know when we launch.</div>
        <button className='content__btn' onClick={onBtnClick}>Request an invite</button>
      </section>
      <footer className='footer'>
        <div className='footer__container'>
          <div>Made with ❤️ in Melbourne.</div>
          <div>2016 Broccoli & Co. All rights reserved.</div>
        </div>
      </footer>

      <Popup show={isPopupShown} onClose={onClose}>
        <PopupContent onConfirm={onConfirm}></PopupContent>
      </Popup>
    </div>
  );
}

const nameRules = [
  {
    message: 'Full name needs to be at least 3 characters long',
    trigger: 'onSubmit', // onChange、onBlur、onSubmit
    validator: (v) => {
      // Fullname 至少 3 个字符
      return v.length >= 3
    }
  }
]
const emailRules = [
  {
    message: 'Email needs to be in validation email format',
    trigger: 'onSubmit', // onChange、onBlur、onSubmit
    validator: (v) => {
      // Email 需要符合邮箱格式
      return /^[a-zA-Z0-9_.-]+@[a-zA-Z0-9-]+(\.[a-zA-Z0-9-]+)*\.[a-zA-Z0-9]{2,6}$/.test(v)
    }
  }
]

// 将弹窗输入部分抽象为组件，防止输入内容时，修改 state 导致整个 App 组件重新渲染问题
// 防止子组件非必要渲染：
// 1. 合理划分子组件的 state
// 2. 使用 useCallback 和 useMemo 根据依赖是否更新来决定是否新建新方法和新变量
function PopupContent(props) {
  const { onConfirm } = props
  const nameRef = useRef(null)
  const emailRef = useRef(null)
  const confirmedEmailRef = useRef(null)
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [confirmedEmail, setConfirmedEmail] = useState('')

  const confirmedEmailRules = useMemo(() => {
    return [
      {
        message: 'Confirm Email needs to match Email.',
        trigger: 'onSubmit', // onChange、onBlur、onSubmit
        validator: (v) => {
          // Confirm Email 需要与 Email 一致
          return v === email
        }
      }
    ]
  }, [email])

  // 当输入 name 输入框时，会非必要地重新渲染 email 和 confirmedEmail 输入框
  // 为了防止重复渲染，可以使用 useMemo 和 memo
  const NameInputMemo = useMemo(() => {
    return <Input ref={nameRef} value={name} onChange={(e) => setName(e.target.value)} rules={nameRules} placeholder='Full name'></Input>
  }, [name])
  // 使用 memo 时，需要注意方法 prop 要使用 useCallback 来防止重新声明方法，导致 memo 失效
  const onEmailChange = useCallback((e) => setEmail(e.target.value), [])
  const onConfirmedEmailChange = useCallback((e) => setConfirmedEmail(e.target.value), [])

  const onSubmit = () => {
    if (!nameRef.current.validate('onSubmit')) {
      return
    }
    if (!emailRef.current.validate('onSubmit')) {
      return
    }
    if (!confirmedEmailRef.current.validate('onSubmit')) {
      return
    }
    onConfirm({
      name,
      email
    })
  }

  return (
    <div className='popup__content'>
      <h1>Request an invite</h1>
      <div>
        {NameInputMemo}
        <Input ref={emailRef} value={email} onChange={onEmailChange} rules={emailRules} placeholder='Email'></Input>
        <Input ref={confirmedEmailRef} value={confirmedEmail} onChange={onConfirmedEmailChange} rules={confirmedEmailRules} placeholder='Confirm Email'></Input>
      </div>
      <button onClick={onSubmit}>Send</button>
    </div>
  )
}

export default App;
