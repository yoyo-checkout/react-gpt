import { random } from 'lodash-es'

export function getRandomItem<T>(list: T[]) {
  const target = random(0, list.length - 1)
  return list[target]
}

export function sleep(time: number) {
  return new Promise((resolve) => {
    setTimeout(() => resolve(true), time)
  })
}
