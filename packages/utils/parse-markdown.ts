import { marked } from 'marked'
import DOMPurify from 'dompurify'
import parse from 'html-react-parser'

export const parseMD = async (content?: string) => {
  if (!content) return ''
  const htmlString = await marked.parse(content)
  const cleanHtml = DOMPurify.sanitize(htmlString)
  return parse(cleanHtml)
}