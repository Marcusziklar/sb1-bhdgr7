import { useState, useEffect } from 'react';

interface SwipeState {
  startX: number;
  startY: number;
  isDragging: boolean;
  translateX: number;
  translateY: number;
}

interface UseSwipeProps {
  onSwipeLeft: () => void;
  onSwipeRight: () => void;
  threshold?: number;
}

export function useSwipe({ onSwipeLeft, onSwipeRight, threshold = 100 }: UseSwipeProps) {
  const [state, setState] = useState<SwipeState>({
    startX: 0,
    startY: 0,
    isDragging: false,
    translateX: 0,
    translateY: 0,
  });

  useEffect(() => {
    const handleMouseUp = () => {
      if (!state.isDragging) return;

      if (Math.abs(state.translateX) > threshold) {
        if (state.translateX > 0) {
          onSwipeRight();
        } else {
          onSwipeLeft();
        }
      }

      setState((prev) => ({
        ...prev,
        isDragging: false,
        translateX: 0,
        translateY: 0,
      }));
    };

    document.addEventListener('mouseup', handleMouseUp);
    document.addEventListener('touchend', handleMouseUp);

    return () => {
      document.removeEventListener('mouseup', handleMouseUp);
      document.removeEventListener('touchend', handleMouseUp);
    };
  }, [state.isDragging, state.translateX, onSwipeLeft, onSwipeRight, threshold]);

  const handleDragStart = (clientX: number, clientY: number) => {
    setState((prev) => ({
      ...prev,
      startX: clientX,
      startY: clientY,
      isDragging: true,
    }));
  };

  const handleDragMove = (clientX: number, clientY: number) => {
    if (!state.isDragging) return;

    const deltaX = clientX - state.startX;
    const deltaY = clientY - state.startY;

    setState((prev) => ({
      ...prev,
      translateX: deltaX,
      translateY: deltaY,
    }));
  };

  const bindDragEvents = {
    onMouseDown: (e: React.MouseEvent) => handleDragStart(e.clientX, e.clientY),
    onTouchStart: (e: React.TouchEvent) => {
      const touch = e.touches[0];
      handleDragStart(touch.clientX, touch.clientY);
    },
    onMouseMove: (e: React.MouseEvent) => handleDragMove(e.clientX, e.clientY),
    onTouchMove: (e: React.TouchEvent) => {
      const touch = e.touches[0];
      handleDragMove(touch.clientX, touch.clientY);
    },
  };

  const style = {
    transform: `translate(${state.translateX}px, ${state.translateY}px) rotate(${
      state.translateX * 0.1
    }deg)`,
    transition: state.isDragging ? 'none' : 'transform 0.5s ease',
    cursor: state.isDragging ? 'grabbing' : 'grab',
  };

  return {
    style,
    bindDragEvents,
    isDragging: state.isDragging,
    direction: state.translateX > 0 ? 'right' : 'left',
    offset: Math.abs(state.translateX),
  };
}