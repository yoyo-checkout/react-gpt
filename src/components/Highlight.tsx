import hljs from 'highlight.js'
import { useEffect } from 'react'

const highlightedCode = hljs.highlight(
  `import React from 'react';

function App() {
const items = ['Item 1', 'Item 2', 'Item 3'];

return (
  <div>
    <h1>My Items</h1>
    <ul>
      {items.map((item, index) => (
        <li key={index}>{item}</li>
      ))}
    </ul>
  </div>
);
}

export default App;`,
  { language: 'jsx' },
).value

export const Highlight = () => {
  useEffect(() => {
    hljs.highlightAll()
  })

  return (
    <div className="p-4 overflow-y-auto">
      <code className="!whitespace-pre hljs language-jsx">
        <div dangerouslySetInnerHTML={{ __html: highlightedCode }}></div>
      </code>
    </div>
  )
}
