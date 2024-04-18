export type Maybe<T> = T | undefined

export type Theme = 'system' | 'dark' | 'light'

export type TMessage =
  | {
      type: 'text' | 'paragraph'
      content: string
    }
  | {
      type: 'code'
      content: string
      language: string
    }
  | {
      type: 'list'
      content: string[]
    }

export type TConversation = {
  owner: 'user' | 'bot'
  messages: TMessage[]
}

export type TChat = {
  id: string
  name: string
  create_at: number
  status: 'available' | 'delete' | 'archive'
  conversations: TConversation[]
}

export type TPrompt = {
  title: string
  desc: string
  content: string
  replies: TMessage[]
}
