import { memo, useRef, useState, forwardRef, useImperativeHandle, useEffect, useMemo } from 'react'
import { useFormDisptach } from '../Form/context'
import './index.css'

export const Input = memo(forwardRef(function Input(props, ref) {
  const { value, name, onChange, rules, placeholder } = props
  console.log('input', name, value)

  const inputValue = useRef(value)
  const [errmsg, setErrmsg] = useState('')
  const output = useMemo(() => {
    return {
      name,
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
  }, [rules, name])

  // 将 validate 校验方法暴露给 Form 组件
  const disptach = useFormDisptach()
  useEffect(() => {
    // disptach 不为空时，说明使用了 Form 组件作为父组件
    // 则需要收集子组件依赖
    if (disptach) {
      disptach({
        type: 'addItem',
        item: output
      })
    }
    return () => {
      if (disptach) {
        // 组件销毁时，需要移除 From 组件依赖
        disptach({
          type: 'removeItem',
          name
        })
      }
    }
  }, [output, name, disptach])

  // 暴露 validate 校验方法到 ref
  useImperativeHandle(ref, () => {
    return output
  }, [output])

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

  return (
    <div className={`op-input ${errmsg ? 'op-input--error' : ''}`}>
      <input className='op-input__input' value={value} placeholder={placeholder} onChange={onInput}></input>
      <div className='op-input__errmsg'>{errmsg}</div>
    </div>
  )
}))

Input.defaultProps = {
  value: '',
  name: '',
  rules: [],
  placeholder: '',
  onChange: () => {}
}

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
