import { useEffect } from "react";

const useIntersectionObserver = (ref, hasMore, loading, onIntersect) => {
  useEffect(() => {
    if (!ref.current || !hasMore || loading) return;

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          onIntersect();
        }
      },
      { root: null, rootMargin: "100px", threshold: 0.1 }
    );

    observer.observe(ref.current);

    return () => observer.disconnect();
  }, [ref, hasMore, loading, onIntersect]);
};

export default useIntersectionObserver;
