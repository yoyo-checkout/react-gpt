import { Dialog, Transition } from '@headlessui/react'
import { FC, Fragment, ReactNode } from 'react'

interface Props {
  visible: boolean
  children: ReactNode
  onClose: () => void
}

export const DialogLayout: FC<Props> = ({ visible, children, onClose }) => {
  return (
    <Transition appear show={visible} as={Fragment}>
      <Dialog as="div" className="absolute inset-0 z-10" onClose={() => {}}>
        <div className="absolute inset-0 bg-black/50 dark:bg-black/80" onClick={onClose}></div>

        <div className="grid h-full w-full grid-cols-[10px_1fr_10px] overflow-y-auto grid-rows-[minmax(10px,_1fr)_auto_minmax(10px,_1fr)] md:grid-rows-[minmax(20px,_1fr)_auto_minmax(20px,_1fr)]">
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0 scale-95"
            enterTo="opacity-100 scale-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100 scale-100"
            leaveTo="opacity-0 scale-95"
          >
            <Dialog.Panel className="popover relative left-1/2 col-auto col-start-2 row-auto row-start-2 w-fit -translate-x-1/2 rounded-xl bg-token-main-surface-primary text-left shadow-xl transition-all flex flex-col focus:outline-none md:max-w-[680px]">
              {children}
            </Dialog.Panel>
          </Transition.Child>
        </div>
      </Dialog>
    </Transition>
  )
}
