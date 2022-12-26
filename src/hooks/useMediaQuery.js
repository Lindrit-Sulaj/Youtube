import { useEffect, useMemo, useState } from "react"

const screenBreakpoints = {
  sm: 640,
  md: 768,
  lg: 1024,
  xl: 1280,
  '2xl': 1536,
}

const useMediaQuery = () => {
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  const [breakpoint, setBreakpoint] = useState('sm');

  const handleResize = () => {
    setWindowWidth(window.innerWidth);
  };

  useEffect(() => {
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useMemo(() => {
    let currentBreakpoint = 'sm';

    for (let breakpoint in screenBreakpoints) {
      if (windowWidth >= screenBreakpoints[breakpoint]) {
        currentBreakpoint = breakpoint;
      };
    };

    setBreakpoint(currentBreakpoint);
  }, [windowWidth]);

  return [windowWidth, breakpoint]
}

export default useMediaQuery