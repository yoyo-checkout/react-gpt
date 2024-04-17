import { TChat } from '@/types'

export const chats: TChat[] = [
  {
    id: '250a6eda-2368-4085-b6c0-88242558614c',
    name: 'React Map Elements',
    create_at: 1713113481000,
    status: 'available',
    conversations: [
      {
        owner: 'user',
        messages: [
          {
            type: 'text',
            content: `如何在 react 中用 js map 產生多個元素`,
          },
        ],
      },
      {
        owner: 'bot',
        messages: [
          {
            type: 'paragraph',
            content: `在React中，你可以使用JavaScript的<code>map</code>方法來生成多個元素。以下是一個簡單的示例，展示如何使用<code>map</code>方法來遍歷一個數組並生成一組元素：`,
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
            content: `在這個例子中：`,
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
        ],
      },
    ],
  },
  {
    id: '98f5d897-d6eb-4bac-8acf-f1c11e6e5b0a',
    name: 'Add className to Logo',
    create_at: 1712678400000,
    status: 'available',
    conversations: [
      {
        owner: 'user',
        messages: [
          {
            type: 'text',
            content: `react 中引入元件加上 className 會報錯 Type '{ className: string; }' has no properties in common with type 'IntrinsicAttributes'

程式碼如下
import { Logo } from '@/components/image/Logo'

export function Sidebar() {
  return (
    <div className="flex-shrink-0 overflow-x-hidden bg-sidebar-surface-primary w-[260px]">
      <Logo className="h-2/3 w-2/3" />
    </div>
  )
}

其中 <Logo className="h-2/3 w-2/3" /> 該行即報錯位置`,
          },
        ],
      },
      {
        owner: 'bot',
        messages: [
          {
            type: 'paragraph',
            content: `錯誤訊息表示 <code>&lt;Logo&gt;</code> 元件沒有 <code>className</code> 這個屬性。在 React 中，你可以使用 <code>className</code> 這個屬性來給 HTML 元件添加 CSS class。`,
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
            content: `在上面的例子中，我們定義了一個 <code>LogoProps</code> 接口，它有一個可選的 <code>className</code> 屬性。然後，在 <code>Logo</code> 元件中，我們將 <code>className</code> 屬性應用到 <code>&lt;img&gt;</code> 元素上。`,
          },
          {
            type: 'paragraph',
            content: `這樣，當你在 <code>Sidebar</code> 元件中使用 <code>&lt;Logo&gt;</code> 時，你就可以傳遞 <code>className</code> 屬性了：`,
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
        ],
      },
    ],
  },
]
