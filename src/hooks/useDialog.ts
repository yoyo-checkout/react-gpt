import { useEffect, useState } from 'react'
import { mittBus, MittEventType } from '@/plugins/mitt'

const visibleDialogs: Array<keyof MittEventType> = []

export const useDialog = (event: keyof MittEventType) => {
  const [visible, setVisible] = useState(false)

  const openDialog = () => {
    visibleDialogs.push(event)
    setVisible(true)
  }
  const closeDialog = () => {
    console.log(event)
    if (visibleDialogs.slice(-1)[0] !== event) return
    setVisible(false)
    visibleDialogs.pop()
  }

  useEffect(() => {
    mittBus.on(event, openDialog)
    return () => mittBus.off(event, openDialog)
  })

  return {
    visible,
    openDialog,
    closeDialog,
  }
}
