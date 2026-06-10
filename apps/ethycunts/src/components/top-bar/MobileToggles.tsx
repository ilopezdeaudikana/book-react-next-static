import { Button } from '@repo/ui'
import { MenuOutlined } from '@ant-design/icons'

type MobileTogglesProps = {
  onToggleFilters: () => void
}

export const MobileToggles = ({
  onToggleFilters
}: MobileTogglesProps) => (
  <div className="items-center gap-2 max-[65rem]:flex mb-4">
    <Button aria-label="Toggle filters" onClick={onToggleFilters}>
      <MenuOutlined />
    </Button>
  </div>
)
