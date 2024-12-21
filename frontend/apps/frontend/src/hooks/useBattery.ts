/**
 * @description 电池信息和状态的 Hook
 */

import { useState, useEffect, useMemo } from 'react';

/**
 * 电池对象类型定义
 * @typedef {Object} Battery
 * @property {boolean} charging - 当前电池是否正在充电
 * @property {number} chargingTime - 距离充电完毕还需多少秒，如果为0则充电完毕
 * @property {number} dischargingTime - 代表距离电池耗电至空且挂起需要多少秒
 * @property {number} level - 代表电量的放大等级，这个值在 0.0 至 1.0 之间
 */
export type Battery = {
  charging: boolean;
  chargingTime: number;
  dischargingTime: number;
  level: number;
  [key: string]: any;
};

/**
 * 电池信息和状态的 Hook
 * @returns {Object} 返回电池状态信息和一些计算值
 */
export const useBattery = () => {
  // 使用 useState 管理电池状态
  const [battery, setBattery] = useState<Battery>({
    charging: false,
    chargingTime: 0,
    dischargingTime: 0,
    level: 100,
  });

  // 当前浏览器是否支持 Battery API
  const isSupported = typeof navigator !== 'undefined' && 'getBattery' in navigator;

  /**
   * 更新电池状态
   * @param {Battery} target - 从 Battery API 获取到的新电池信息
   */
  const updateBattery = (target: Battery) => {
    setBattery((prevBattery) => ({
      ...prevBattery,
      ...target,
      level: target.level * 100, // 将电池电量从 0.0-1.0 范围扩展为 0-100
    }));
  };

  /**
   * 计算电池剩余可用时间（以小时和分钟为单位）
   * @returns {string} 电池剩余使用时间的字符串表示
   */
  const calcDischargingTime = useMemo(() => {
    const hour = battery.dischargingTime / 3600;
    const minute = (battery.dischargingTime / 60) % 60;
    return `${Math.floor(hour)}小时${Math.floor(minute)}分钟`;
  }, [battery.dischargingTime]);

  /**
   * 获取电池状态文本
   * @returns {string} 返回电池的状态，"已充满", "充电中" 或 "已断开电源"
   */
  const batteryStatus = useMemo(() => {
    if (battery.charging && battery.level >= 100) {
      return '已充满';
    } else if (battery.charging) {
      return '充电中';
    } else {
      return '已断开电源';
    }
  }, [battery.charging, battery.level]);

  // 使用 useEffect 来获取电池信息并设置相关监听
  useEffect(() => {
    /**
     * 获取电池状态并更新
     */
    const getBatteryStatus = async () => {
      // 获取 BatteryManager 对象
      const BatteryManager: Battery = (await navigator.getBattery()) || {};
      updateBattery(BatteryManager);

      // 电池充电状态更新时被调用
      BatteryManager.onchargingchange = ({ target }) => {
        updateBattery(target);
        console.log(target, '电池充电状态改变了');
      };

      // 电池充电时间更新时被调用
      BatteryManager.onchargingtimechange = ({ target }) => {
        updateBattery(target);
        console.log(target, '电池充电了');
      };

      // 电池断开充电时间更新时被调用
      BatteryManager.ondischargingtimechange = ({ target }) => {
        updateBattery(target);
        console.log(target, '电池断开充电了');
      };

      // 电池电量更新时被调用
      BatteryManager.onlevelchange = ({ target }) => {
        updateBattery(target);
        console.log(target, '电量更新了');
      };
    };

    // 如果浏览器支持 Battery API，则执行获取电池信息
    if (isSupported) {
      getBatteryStatus();
    }

    // 清理副作用，移除事件监听（虽然并不是所有浏览器都支持这一操作）
    return () => {
      // 可以在这里添加代码来移除事件监听器（如果需要的话）
    };
  }, [isSupported]);

  return {
    battery, // 当前电池状态
    isSupported, // 是否支持 Battery API
    batteryStatus, // 电池状态描述
    calcDischargingTime, // 剩余可用时间
  };
};
