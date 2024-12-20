import { Icon } from '@umijs/max'
import { Popover, Space, Button, Input } from 'antd'
import React, { useState, useMemo } from 'react'
import names from '../../../config/icons'

interface IconPickerProps {
  children: React.ReactNode
  onChange?: (value: string) => void
  icon?: string;
}

const IconPicker: React.FC<IconPickerProps> = ({ icon = '', children, onChange }) => {
  const [search, setSearch] = useState('')
  const [selectedIcon, setSelectedIcon] = useState(icon)
  const icons = useMemo(() => {
    if (search) {
      return names.filter((name) => name.toLocaleLowerCase().includes(search.toLocaleLowerCase()))
    }
    return names
  }, [search])

  return (
    <Popover
      content={
        <div className="flex flex-col">
          <Input.Search className="mb-4"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="搜索图标"
            enterButton="搜索"
            onSearch={setSearch} />
          <div
            style={{
              width: '400px',
              height: '200px',
              overflow: 'auto',
            }}
          >
            <Space wrap align="start">
              {icons.map((name) => (
                <Button key={name} icon={<Icon icon={name as any} />} onClick={() => {
                  onChange?.(name)
                  setSelectedIcon(name)
                  setSearch('')
                }} />
              ))}
            </Space>
          </div>
        </div>
      }
    >

      {selectedIcon ? <Icon icon={selectedIcon} style={{ fontSize: 16, display: 'flex' }} /> : children}
    </Popover>
  )
}

export default IconPicker
