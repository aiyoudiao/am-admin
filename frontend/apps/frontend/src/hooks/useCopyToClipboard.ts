/**
 * @description: 复制到剪贴板
 */
import { useState } from 'react';
import { message } from 'antd';

const useCopyToClipboard = () => {
  const [isCopied, setIsCopied] = useState(false);

  const copy = async (text: string) => {
    if (!navigator.clipboard) {
      // 如果 navigator.clipboard 不存在，使用 document.execCommand 作为回退方案
      const textArea = document.createElement('textarea');
      textArea.value = text;
      document.body.appendChild(textArea);
      textArea.select();
      try {
        document.execCommand('copy');
        setIsCopied(true);
        message.success(`粘贴 "${text}" 成功`);
      } catch (err) {
        setIsCopied(false);
        message.error('复制失败');
      } finally {
        document.body.removeChild(textArea);
      }
      return;
    }

    try {
      await navigator.clipboard.writeText(text);
      setIsCopied(true);
      message.success(`粘贴 "${text}" 成功`);
    } catch (err) {
      setIsCopied(false);
      message.error('复制失败');
    }
  };

  return { isCopied, copy };
};

export default useCopyToClipboard;
