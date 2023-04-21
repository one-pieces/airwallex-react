import { useState } from 'react'
import './index.scss'

function isValidte(rules) {
  for (let i = 0; i < rules.length; i++) {}
}

function Row(props) {
  const { col, rules, value, onChange } = props

  const onValueChange = (...args) => {
    if (isValidte(rules)) {
      return
    }

    onChange(...args)
  }
  return (
    <div className="op-row">
      {new Array(col).fill(null).map((_, colIndex) => (
        <div className="op-col" key={`c_${colIndex}`}>
          <input
            className="op-col__input"
            value={value[colIndex]}
            onChange={(e) => onValueChange(e, colIndex)}
          />
        </div>
      ))}
    </div>
  )
}

function getInitValue(row, col) {
  const result = []
  for (let i = 0; i < row; i++) {
    const row = []
    for (let j = 0; j < col; j++) {
      row.push('cell')
    }
    result.push(row)
  }
  return result
}
function copyArr(arr, value, _i, _j) {
  const result = []
  for (let i = 0; i < arr.length; i++) {
    const row = []
    for (let j = 0; j < arr[0].length; j++) {
      if (i === _i && j === _j) {
        row.push(value)
      } else {
        row.push(arr[i][j])
      }
    }
    result.push(row)
  }
  return result
}

export function Table(props) {
  const { col, row } = props

  const [state, setState] = useState(getInitValue(row, col))

  const onChange = (e, rowIndex, colIndex) => {
    const value = e.target.value
    const newState = copyArr(state, value, rowIndex, colIndex)
    console.log('====value', value, newState, rowIndex, colIndex)
    setState(newState)
  }

  const rules = [
    {
      validator: (value) => {
        return /[0-9]/.test(value)
      },
    },
  ]

  return (
    <div className="op-table">
      {new Array(row).fill(null).map((_, rowIndex) => (
        <Row
          key={`r_${rowIndex}`}
          value={state[rowIndex]}
          col={col}
          rules={rules}
          onChange={(e, colIndex) => onChange(e, rowIndex, colIndex)}
        />
      ))}
    </div>
  )
}
