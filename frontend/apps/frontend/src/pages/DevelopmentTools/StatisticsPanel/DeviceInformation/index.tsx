import React, { useEffect, useState } from 'react';
import { Descriptions, Badge, Card } from 'antd';
import { useModel } from '@umijs/max';

import BrowserType from '@/utils/browser/browser-type';
import { useBattery } from '@/hooks/useBattery';
import { useOnline } from '@/hooks/useOnline';
import { PageContainer } from '@ant-design/pro-components';

/**
 * @description Dashboard页面，展示系统信息，包括浏览器信息、电池状态、网络状态等
 */
const DashboardWelcome: React.FC = () => {
  // 获取全局状态
  const { initialState } = useModel('@@initialState');
  // 获取用户的IP地址
  const loginIp = initialState?.CurrentUser?.login_last_ip;

  // 获取是否在线的状态
  const { online } = useOnline();

  // 获取电池信息
  const { battery, batteryStatus, calcDischargingTime } = useBattery();

  // 获取浏览器信息
  const [browserInfo, setBrowserInfo] = useState(() => BrowserType('zh-cn'));

  useEffect(() => {
    // 更新浏览器信息和电池状态
    setBrowserInfo((prevInfo) => ({
      ...prevInfo,
      距离电池充满需要:
        Number.isFinite(battery.chargingTime) && battery.chargingTime !== 0
          ? calcDischargingTime
          : '未知',
      剩余可使用时间:
        Number.isFinite(battery.dischargingTime) && battery.dischargingTime !== 0
          ? calcDischargingTime
          : '未知',
      电池状态: batteryStatus,
      当前电量: `${battery.level}%`,
    }));
  }, [battery, batteryStatus, calcDischargingTime]);

  return (
    <PageContainer header={{ title: null }}>
      <Card title={null} hoverable className="shadow-lg">
          <img src="/logo.svg" alt="logo" className="w-[180px] h-[180px] mx-auto" />
          <Descriptions title="系统信息" bordered>
            <Descriptions.Item key="IP" label="IP">
              {loginIp}
            </Descriptions.Item>
            {Object.entries(browserInfo).map(([key, value]) => (
              <Descriptions.Item key={key} label={key}>
                {value}
              </Descriptions.Item>
            ))}
            <Descriptions.Item label="网络状态">
              <Badge status={online ? 'processing' : 'default'} text={online ? '在线' : '离线'} />
            </Descriptions.Item>
          </Descriptions>
      </Card>
    </PageContainer>
  );
};

export default DashboardWelcome;
