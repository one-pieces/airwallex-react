import { useState, useEffect } from 'react'
import ReactMarkdown from 'react-markdown'
import readme from 'README.md'
import readmeCN from 'README-CN.md'
import './index.scss'

export default function ReadMePage() {
  const [markdown, setMarkdown] = useState('')
  useEffect(() => {
    fetch(readme)
      .then((response) => response.text())
      .then((text) => {
        setMarkdown(text)
      })
  }, [])
  const [markdownCn, setMarkdownCn] = useState('')
  useEffect(() => {
    fetch(readmeCN)
      .then((response) => response.text())
      .then((text) => {
        setMarkdownCn(text)
      })
  }, [])
  return (
    <div className="readme-page">
      <div className="flex">
        <ReactMarkdown>{markdown}</ReactMarkdown>
      </div>
      <div className="flex">
        <ReactMarkdown>{markdownCn}</ReactMarkdown>
      </div>
    </div>
  )
}
