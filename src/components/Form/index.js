import { FormProvider, useForm } from './context'

function FormInstance(props) {
  const { children, onSubmit: _onSubmit } = props
  const formContext = useForm()
  // console.log('form')
  const onSubmit = (e) => {
    // 默认阻止默认行为
    e.preventDefault()
    // 如果 form.items.length 不为空，则需要校验每个 item 的 validator
    const result = formContext.items.map((v) => v.validate()).every((v) => v)
    // 校验不通过则直接退出
    if (!result) {
      return
    }
    _onSubmit(e)
  }
  return <form onSubmit={onSubmit}>{children}</form>
}

export function Form(props) {
  return (
    <FormProvider>
      <FormInstance {...props} />
    </FormProvider>
  )
}

FormInstance.defaultProps = Form.defaultProps = {
  onSubmit: () => {},
}
