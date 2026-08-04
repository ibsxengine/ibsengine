"use client";

import { useCallback, useEffect, useRef, useState } from "react";

type ScrollMetrics = {
  thumbTop: number;
  thumbHeight: number;
  visible: boolean;
};

export function CustomScrollbar() {
  const trackRef = useRef<HTMLDivElement>(null);
  const thumbRef = useRef<HTMLDivElement>(null);
  const metricsRef = useRef<ScrollMetrics>({
    thumbTop: 0,
    thumbHeight: 0,
    visible: false,
  });
  const dragRef = useRef<{ startY: number; startScroll: number } | null>(null);
  const scrollRafRef = useRef(0);

  const [visible, setVisible] = useState(false);

  const getMaxScroll = useCallback(
    () => document.documentElement.scrollHeight - window.innerHeight,
    [],
  );

  const applyThumb = useCallback((next: ScrollMetrics) => {
    metricsRef.current = next;
    const thumb = thumbRef.current;
    if (!thumb) return;
    thumb.style.height = `${next.thumbHeight}px`;
    thumb.style.transform = `translate3d(0, ${next.thumbTop}px, 0)`;
  }, []);

  const measure = useCallback(() => {
    const { scrollHeight, clientHeight } = document.documentElement;
    const maxScroll = scrollHeight - clientHeight;

    if (maxScroll <= 1) {
      const next = { thumbTop: 0, thumbHeight: 0, visible: false };
      applyThumb(next);
      setVisible((prev) => (prev ? false : prev));
      return;
    }

    const ratio = clientHeight / scrollHeight;
    const thumbHeight = Math.max(Math.round(clientHeight * ratio), 56);
    const travel = clientHeight - thumbHeight;
    const thumbTop = (window.scrollY / maxScroll) * travel;
    const next = { thumbTop, thumbHeight, visible: true };

    applyThumb(next);
    setVisible((prev) => (prev ? prev : true));
  }, [applyThumb]);

  const scheduleMeasure = useCallback(() => {
    if (scrollRafRef.current) return;
    scrollRafRef.current = requestAnimationFrame(() => {
      scrollRafRef.current = 0;
      measure();
    });
  }, [measure]);

  const scrollFromClientY = useCallback(
    (clientY: number) => {
      const track = trackRef.current;
      const { thumbHeight, visible: isVisible } = metricsRef.current;
      if (!track || !isVisible) return;

      const rect = track.getBoundingClientRect();
      const travel = rect.height - thumbHeight;
      if (travel <= 0) return;

      const thumbCenter = clientY - rect.top;
      const ratio = Math.max(0, Math.min(1, (thumbCenter - thumbHeight / 2) / travel));
      window.scrollTo({ top: ratio * getMaxScroll(), behavior: "auto" });
    },
    [getMaxScroll],
  );

  useEffect(() => {
    const root = document.documentElement;
    root.classList.add("native-scrollbar-hidden");

    measure();
    window.addEventListener("scroll", scheduleMeasure, { passive: true });
    window.addEventListener("resize", measure, { passive: true });

    return () => {
      root.classList.remove("native-scrollbar-hidden");
      window.removeEventListener("scroll", scheduleMeasure);
      window.removeEventListener("resize", measure);
      if (scrollRafRef.current) cancelAnimationFrame(scrollRafRef.current);
    };
  }, [measure, scheduleMeasure]);

  useEffect(() => {
    const onMouseMove = (e: MouseEvent) => {
      if (!dragRef.current) return;
      const track = trackRef.current;
      const { thumbHeight, visible: isVisible } = metricsRef.current;
      if (!track || !isVisible) return;

      const rect = track.getBoundingClientRect();
      const travel = rect.height - thumbHeight;
      const maxScroll = getMaxScroll();
      if (travel <= 0 || maxScroll <= 0) return;

      const deltaY = e.clientY - dragRef.current.startY;
      window.scrollTo({
        top: dragRef.current.startScroll + (deltaY / travel) * maxScroll,
        behavior: "auto",
      });
    };

    const onMouseUp = () => {
      dragRef.current = null;
      document.body.classList.remove("custom-scrollbar-dragging");
    };

    document.addEventListener("mousemove", onMouseMove);
    document.addEventListener("mouseup", onMouseUp);

    return () => {
      document.removeEventListener("mousemove", onMouseMove);
      document.removeEventListener("mouseup", onMouseUp);
    };
  }, [getMaxScroll]);

  const onThumbMouseDown = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    dragRef.current = { startY: e.clientY, startScroll: window.scrollY };
    document.body.classList.add("custom-scrollbar-dragging");
  };

  const onTrackMouseDown = (e: React.MouseEvent) => {
    if (e.target !== trackRef.current) return;
    e.preventDefault();
    scrollFromClientY(e.clientY);
    dragRef.current = { startY: e.clientY, startScroll: window.scrollY };
    document.body.classList.add("custom-scrollbar-dragging");
  };

  if (!visible) return null;

  return (
    <div
      ref={trackRef}
      className="custom-scrollbar"
      data-orb-minimal
      aria-hidden
      onMouseDown={onTrackMouseDown}
    >
      <div ref={thumbRef} className="custom-scrollbar-thumb" onMouseDown={onThumbMouseDown} />
    </div>
  );
}
