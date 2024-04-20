import { random } from 'lodash-es'
import { Maybe, TMessage } from '@/types'
import { sleep } from './index'

export function replyLikeEventStream<T extends TMessage>(
  message: T,
  cb: (m: T['content'], newLine: boolean) => Maybe<boolean>,
) {
  return new Promise<boolean>(async (resolve) => {
    const { type, content } = message

    try {
      switch (type) {
        case 'text':
        case 'code':
        case 'paragraph':
          for (let i = 0; i < content.length; i++) {
            const randomTime = random(1, 3) * 50
            await sleep(randomTime)

            const stop = cb(content.slice(0, i + 1), i === 0)
            if (stop) return resolve(false)
          }
          return resolve(true)
        case 'list': {
          const rlt: string[] = []

          for (let i = 0; i < content.length; i++) {
            const text = content[i]

            for (let j = 0; j < text.length; j++) {
              const randomTime = random(1, 3) * 50
              await sleep(randomTime)
              rlt[i] = text.slice(0, j + 1)

              const stop = cb([...rlt], i === 0 && j === 0)
              if (stop) return resolve(false)
            }
          }
          return resolve(true)
        }
      }
    } catch (e) {
      console.log(e)
      resolve(false)
    }
  })
}
