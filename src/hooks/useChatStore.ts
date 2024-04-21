import { useCallback, useMemo } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { AppDispatch, RootState } from '@/stores'
import { actions } from '@/stores/chat'
import { TChat } from '@/types'

export const useChatStore = () => {
  const chats = useSelector((state: RootState) => state.chat.chats)

  const availableChats = useMemo(() => chats.filter((c) => c.status === 'available'), [chats])
  const archivedChats = useMemo(() => chats.filter((c) => c.status === 'archived'), [chats])

  const dispatch: AppDispatch = useDispatch()
  const createChat = useCallback((chat: TChat) => dispatch(actions.createChat(chat)), [dispatch])
  const updateChat = useCallback((chat: TChat) => dispatch(actions.updateChat(chat)), [dispatch])
  const deleteChat = useCallback((id: string) => dispatch(actions.deleteChat(id)), [dispatch])

  return {
    chats,
    availableChats,
    archivedChats,
    createChat,
    updateChat,
    deleteChat,
  }
}
