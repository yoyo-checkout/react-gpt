import { createSlice } from '@reduxjs/toolkit'
import { chats as defaultChats } from '@/configs/chats'
import { TChat } from '@/types'

interface State {
  chats: TChat[]
}

const initialState: State = {
  chats: defaultChats,
}

const chatSlice = createSlice({
  name: 'chat',
  initialState,
  reducers: {
    createChat(state, { payload }: { payload: TChat }) {
      state.chats.push(payload)
    },
    updateChat(state, { payload }: { payload: TChat }) {
      state.chats = state.chats.map((chat) => (chat.id === payload.id ? payload : chat))
    },
    deleteChat(state, { payload }: { payload: string }) {
      state.chats = state.chats.filter((chat) => chat.id !== payload)
    },
  },
})

export const actions = chatSlice.actions
export default chatSlice.reducer
