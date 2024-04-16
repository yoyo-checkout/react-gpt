import { Message as TMessage } from './chats'

export const defaultReply: TMessage = {
  type: 'paragraph',
  content: `That is the question!`,
}

export const replies: TMessage[] = [
  defaultReply,
  {
    type: 'paragraph',
    content: `不要害怕，它是成功的前奏`,
  },
  {
    type: 'code',
    language: 'tsx',
    content: `import React from 'react';

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
  },
  {
    type: 'paragraph',
    content: `堅守原則，無論困難多大`,
  },
  {
    type: 'list',
    content: [
      `我們定義了一個名為<code>items</code>的數組，其中包含三個字符串元素。`,
      `在<code>&lt;ul&gt;</code>元素中，我們使用<code>map</code>方法遍歷<code>items</code>數組。`,
      `對於<code>items</code>數組中的每一個元素，<code>map</code>方法會執行一次函數。這個函數接收兩個參數：當前的元素和它的索引。`,
      `我們返回一個<code>&lt;li&gt;</code>元素，其中包含當前的元素內容。我們也為每個<code>&lt;li&gt;</code>元素指定了一個唯一的<code>key</code>屬性，這是React要求的，用於識別列表中的每一個元素。`,
      `最後，<code>map</code>方法返回一個新的數組，其中包含根據原始數組中的元素生成的所有<code>&lt;li&gt;</code>元素。`,
    ],
  },
  {
    type: 'paragraph',
    content: `善用過去的經驗，它是寶貴的財富`,
  },
  {
    type: 'paragraph',
    content: `要解決這個問題，你需要確保 <code>&lt;Logo&gt;</code> 元件接受 <code>className</code> 這個 prop。這通常可以透過在 <code>&lt;Logo&gt;</code> 元件的定義中加上 <code>className</code> 屬性來完成。`,
  },
  {
    type: 'paragraph',
    content: `舉例來說，你可能需要在 <code>&lt;Logo&gt;</code> 元件的定義中像這樣接收和使用 <code>className</code>：`,
  },
  {
    type: 'code',
    language: 'tsx',
    content: `// Logo.tsx
import React from 'react';

interface LogoProps {
  className?: string;
}

export const Logo: React.FC<LogoProps> = ({ className }) => {
  return (
    <img src="/path/to/logo.png" alt="Logo" className={className} />
  );
};`,
  },
  {
    type: 'paragraph',
    content: `堅守信仰，信仰會給你力量`,
  },
  {
    type: 'paragraph',
    content: `制定明智計劃，並堅持執行`,
  },
  {
    type: 'code',
    language: 'tsx',
    content: `// Sidebar.tsx
import { Logo } from '@/components/image/Logo';

export function Sidebar() {
  return (
    <div className="flex-shrink-0 overflow-x-hidden bg-sidebar-surface-primary w-[260px]">
      <Logo className="h-2/3 w-2/3" />
    </div>
  );
}`,
  },
  {
    type: 'paragraph',
    content: `這樣應該就可以解決你遇到的錯誤了。希望這能幫到你！如果你還有其他問題，請隨時問我。`,
  },
  {
    type: 'list',
    content: [
      `我們定義了一個名為<code>items</code>的數組，其中包含三個字符串元素。`,
      `在<code>&lt;ul&gt;</code>元素中，我們使用<code>map</code>方法遍歷<code>items</code>數組。`,
      `對於<code>items</code>數組中的每一個元素，<code>map</code>方法會執行一次函數。這個函數接收兩個參數：當前的元素和它的索引。`,
      `我們返回一個<code>&lt;li&gt;</code>元素，其中包含當前的元素內容。我們也為每個<code>&lt;li&gt;</code>元素指定了一個唯一的<code>key</code>屬性，這是React要求的，用於識別列表中的每一個元素。`,
      `最後，<code>map</code>方法返回一個新的數組，其中包含根據原始數組中的元素生成的所有<code>&lt;li&gt;</code>元素。`,
    ],
  },
]
