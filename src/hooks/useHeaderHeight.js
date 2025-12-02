import { useRef, useLayoutEffect } from "react";

const useHeaderHeight = () => {
  const headerRef = useRef(null);

  useLayoutEffect(() => {
    const node = headerRef.current;
    if (!node) return;

    const updateHeight = () => {
      const height = node.offsetHeight;
      document.body.style.setProperty("--headerHeight", `${height}px`);
    };

    updateHeight();

    const resizeObserver = new ResizeObserver(() => {
      updateHeight();
    });

    resizeObserver.observe(node);

    return () => {
      resizeObserver.disconnect();
    };
  }, []);

  return headerRef;
};

export default useHeaderHeight;
