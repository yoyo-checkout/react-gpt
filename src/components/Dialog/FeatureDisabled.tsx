import { useDialog } from '@/hooks/useDialog'
import { DialogLayout } from './Layout'

export const FeatureDisabledDialog = () => {
  const { visible, closeDialog } = useDialog('openFeatureDisabledDialog')

  return (
    <DialogLayout visible={visible} onClose={closeDialog}>
      <div className="p-10 text-center">
        <div className="mb-2 font-medium">此功能尚未開啟</div>
        <div className="text-xs text-gray-300">Opps! 敬請期待...</div>
      </div>
    </DialogLayout>
  )
}
