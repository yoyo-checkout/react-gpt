import mitt from 'mitt'

export type MittEventType = {
  updateChat: string
  scroll2Bottom: undefined
}

export const mittBus = mitt<MittEventType>()
