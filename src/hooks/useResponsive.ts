import { useMemo } from 'react';
import { useWindowDimensions } from 'react-native';

export const BREAKPOINTS = {
  TABLET: 768,
  DESKTOP: 1024,
};

export const useResponsive = () => {
  const { width } = useWindowDimensions();

  return useMemo(() => {
    const isMobile = width < BREAKPOINTS.TABLET;
    const isTablet = width >= BREAKPOINTS.TABLET && width < BREAKPOINTS.DESKTOP;
    const isDesktop = width >= BREAKPOINTS.DESKTOP;

    return {
      width,
      isMobile,
      isTablet,
      isDesktop,
      isLargeScreen: width >= BREAKPOINTS.TABLET,
    };
  }, [width]);
};
