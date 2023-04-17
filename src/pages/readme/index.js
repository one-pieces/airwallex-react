import { useState, useEffect } from 'react'
import ReactMarkdown from 'react-markdown'
import readme from 'README.md'
import './index.scss'

export default function ReadMePage() {
  const [postMarkdown, setPostMarkdown] = useState('')
  useEffect(() => {
    fetch(readme)
      .then((response) => response.text())
      .then((text) => {
        setPostMarkdown(text)
      })
  }, [])
  return (
    <div className="readme-page">
      <ReactMarkdown>{postMarkdown}</ReactMarkdown>
    </div>
  )
}
