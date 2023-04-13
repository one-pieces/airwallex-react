import { memo, useRef, useState, forwardRef, useImperativeHandle } from 'react'
import './index.css'

export const Input = memo(forwardRef(function Input(props, ref) {
  const { value, onChange, rules = [], placeholder } = props
  console.log('input', value)

  const inputValue = useRef(value)
  const [errmsg, setErrmsg] = useState('')

  const onInput = (e) => {
    inputValue.current = e.target.value
    // 是否有需要校验的 validator
    const _rules = rules.filter(r => r.trigger === 'onChange')
    if (_rules.length) {
      const _errmsg = validate(_rules, inputValue.current)
      setErrmsg(_errmsg)
      return
    }
    // 如果输入内容不符合，则不调用 onChange
    onChange(e)
  }

  useImperativeHandle(ref, () => {
    return {
      validate: (trigger = 'onSubmit') => {
        const _rules = rules.filter(r => r.trigger === trigger)
        if (_rules.length) {
          const _errmsg = validate(_rules, inputValue.current)
          setErrmsg(_errmsg)
          return !_errmsg
        }
        return true
      }
    }
  }, [rules])
  return (
    <div className={`op-input ${errmsg ? 'op-input--error' : ''}`}>
      <input className='op-input__input' value={value} placeholder={placeholder} onChange={onInput}></input>
      <div className='op-input__errmsg'>{errmsg}</div>
    </div>
  )
}))

function validate(rules, value) {
  for (let i = 0; i < rules.length; i++) {
    const rule = rules[i]
    // validator 为 false
    if (!rule.validator(value)) {
      return rule.message
    }
  }
  return ''
}
