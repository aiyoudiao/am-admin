/**
 * @description 用户网络是否可用
 */

import { useState, useEffect } from 'react';

/**
 * @description 用户网络是否可用
 */
export function useOnline() {
  const [online, setOnline] = useState(navigator.onLine);

  const showStatus = (event: Event) => {
    // 通过事件更新网络状态
    setOnline(event.type === 'online');
  };

  useEffect(() => {
    // 在组件挂载时，添加事件监听
    window.addEventListener('online', showStatus);
    window.addEventListener('offline', showStatus);

    // 在组件卸载时，移除事件监听
    return () => {
      window.removeEventListener('online', showStatus);
      window.removeEventListener('offline', showStatus);
    };
  }, []);

  return { online };
}
