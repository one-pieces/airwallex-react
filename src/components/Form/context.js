import { createContext, useContext } from 'react'
import { useImmerReducer } from 'use-immer'

const FormContext = createContext(null)
const FormDispatchContext = createContext(null)

export function FormProvider({ children }) {
  const [form, dipstach] = useImmerReducer(formReducer, initForm)

  return (
    <FormContext.Provider value={form}>
      <FormDispatchContext.Provider value={dipstach}>
        { children }
      </FormDispatchContext.Provider>
    </FormContext.Provider>
  )
}

export function useForm() {
  return useContext(FormContext)
}

export function useFormDisptach() {
  return useContext(FormDispatchContext)
}

function formReducer(form, action) {
  switch(action.type) {
    case 'addItem': {
      form.items.push(action.item)
      break
    }
    case 'removeItem': {
      const index = form.items.findIndex(v => v.name === action.name)
      form.items.splice(index, 1)
      break
    }
    default:
      break
  }
}

const initForm = {
  items: []
}