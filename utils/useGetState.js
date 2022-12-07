import { useState, useEffect } from 'react';

export const useGetState = () => {
  // 声明能够体现视口大小变化的状态 next初始状态下获取不到window 应在生命周期钩子内获取
  const [windowSize, setWindowSize] = useState({
    width: null,
    height: null,
  });

  const [mousePosition, setMousePosition] = useState({
    x: 0,
    y: 0,
  });

  const [currentDate, setCurrentDate] = useState();

  // 通过生命周期 Hook 声明回调的绑定和解绑逻辑
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentDate(`${new Date().toLocaleDateString()}-${new Date().toLocaleTimeString()}`);
    }, 1000);

    const updateSize = () =>
      setWindowSize({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    const updateMousePosition = () => {
      setMousePosition({
        x: window.screenX,
        y: window.screenY,
      });
    };
    // 组件加载时，获取信息
    updateSize();
    updateMousePosition();
    window.addEventListener('resize', updateSize);
    window.addEventListener('mousemove', setMousePosition);
    return () => {
      window.removeEventListener('resize', updateSize);
      window.removeEventListener('mousemove', setMousePosition);
      window.clearInterval(timer);
    };
  }, []);

  return {
    windowSize,
    mousePosition,
    currentDate,
  };
};
