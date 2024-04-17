import { TMessage } from '@/types'

export const defaultReply = {
  type: 'paragraph' as const,
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
      `您每天的日常生活是怎麼樣的？（例如：您的工作、家庭生活、娛樂活動等）`,
      `您有哪些日常習慣？（例如：運動、閱讀、冥想等）`,
      `您希望在哪些方面進行自我提升？（例如：學習新技能、改善健康狀況、提高工作效率等）`,
      `您有沒有遇到什麼困難或障礙妨礙您達到目標？`,
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
    content: [`石榴樂舞`, `氣泡石榴夢`, `可樂石榴調和`, `紅寶石氣泡`, `石榴響尾蛇`],
  },
]
