import { Logo } from '@/components/image/Logo'

export const Home = () => {
  return (
    <div className="flex h-full flex-col items-center justify-center text-token-text-primary">
      <div className="relative">
        <div className="mb-3 h-12 w-12">
          <div className="gizmo-shadow-stroke relative flex h-full items-center justify-center rounded-full bg-white text-gray-950">
            <Logo className="h-2/3 w-2/3" />
          </div>
        </div>
      </div>
      <div className="mb-5 text-2xl font-medium">我今天可以如何協助你？</div>
    </div>
  )
}
