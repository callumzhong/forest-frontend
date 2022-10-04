import { useEffect, useState } from 'react';
const desktopThresholdWidth = 996;
const windowSizes = {
  desktop: 'desktop',
  mobile: 'mobile',
};

const getWindowSize = () => {
  return window.innerWidth > desktopThresholdWidth
    ? windowSizes.desktop
    : windowSizes.mobile;
};

const useWindowSize = () => {
  const [windowSize, setWindowSize] = useState(() => {
    return getWindowSize();
  });

  useEffect(() => {
    const updateWindowSize = () => {
      setWindowSize(getWindowSize());
    };
    window.addEventListener('resize', updateWindowSize);
    return () => {
      window.removeEventListener(
        'resize',
        updateWindowSize,
      );
    };
  });

  return windowSize;
};

export default useWindowSize;
