/**
 * @description: 图标选择器
 */
import { Icon } from '@umijs/max';
import { Popover, Space, Button, Input, Tabs, message } from 'antd';
import React, { useState, useMemo, useCallback } from 'react';
import useCopyToClipboard from '@/hooks/useCopyToClipboard';

import { iconMap } from '../../../config/icons';
import { CopyOutlined } from '@ant-design/icons';

const defaultIconType = Object.keys(iconMap)[0];
const iconMapLength = Object.keys(iconMap).length;

interface IconPickerProps {
  children: React.ReactNode;
  onChange?: (value: string) => void;
  icon?: string;
}

const IconPicker: React.FC<IconPickerProps> = ({ icon = '', children, onChange }) => {
  const [open, setOpen] = useState(false);
  const [search, setSearch] = useState('');
  const [selectedIcon, setSelectedIcon] = useState(icon);
  const [selectedTab, setSelectedTab] = useState<string>(defaultIconType); // 默认选择 mdi Tab
  const { copy } = useCopyToClipboard();

  // 处理输入框搜索
  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value.toLowerCase());
  };

  // 过滤图标
  const filterIcons = (icons: string[]) => {
    return icons.filter((icon) => icon.toLowerCase().includes(search));
  };

  // 渲染图标列表
  const renderIconList = (iconSet: string) => {
    const icons = iconMap[iconSet];
    const filteredIcons = filterIcons(icons);

    return (
      <section
        style={{
          width: '25rem',
          height: '15rem',
          overflow: 'auto',
        }}
      >
        <Space wrap align="center" size={8}>
          {filteredIcons.map((icon) => (
            <Popover
              className="bg-transparent"
              // trigger="focus"
              content={
                <span className="flex items-center">
                  {icon} <Button type="link" icon={<CopyOutlined />} onClick={() => copy(icon)} />
                </span>
              }
              title={null}
            >
              <Button
                key={icon}
                icon={<Icon icon={icon as any} width="2rem" height="2rem" />}
                onClick={() => {
                  onChange?.(icon);
                  setSelectedIcon(icon);
                  setSearch('');
                }}
              />
            </Popover>
          ))}
        </Space>
      </section>
    );
  };

  return (
    <Popover
      trigger="click"
      open={open}
      arrow={false}
      onOpenChange={setOpen}
      content={
        <div className="flex flex-col w-[25rem] overflow-auto">
          <Input.Search
            value={search}
            onChange={handleSearch}
            placeholder="搜索图标"
            enterButton="搜索"
            onSearch={setSearch}
          />
          {iconMapLength > 1 ? (
            <Tabs className="relative z-[9999]" activeKey={selectedTab} onChange={setSelectedTab}>
              {Object.keys(iconMap).map((iconSet) => (
                <Tabs.TabPane tab={`${iconSet} Icons`} key={iconSet}>
                  {renderIconList(iconSet)}
                </Tabs.TabPane>
              ))}
            </Tabs>
          ) : (
            <section className="pt-3">{renderIconList(defaultIconType)}</section>
          )}
        </div>
      }
    >
      <span onClick={() => setOpen(true)}>
        {selectedIcon ? (
          <Icon icon={selectedIcon as any} style={{ fontSize: 16, display: 'flex' }} />
        ) : (
          children
        )}
      </span>
    </Popover>
  );
};

export default IconPicker;
