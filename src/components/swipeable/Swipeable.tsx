import React, {
  CSSProperties,
  useEffect,
  useLayoutEffect,
  useState,
} from 'react';
import classes from './Swipeable.module.scss';
import { clsx } from 'clsx';
import { Vector2 } from 'src/types';
import { clamp } from 'src/utils';
import { Backdrop } from '@mui/material';

interface SwipeableProps {
  children: JSX.Element | JSX.Element[];
  className?: string;
  onDrag?: (state: Vector2, handleRelease: () => void) => void;
  onRelease?: (state: Vector2, prevState: Vector2) => void;
  onStart?: (state: Vector2) => void;
  axis?: 'x' | 'y';
  style?: CSSProperties;
  bounds?: { left?: number; right?: number; top?: number; bottom?: number };
  defaultPosition?: Vector2;
  onAnimationEnd?: () => void;
  open: boolean;
  openPosition: Vector2;
  onOpen?: () => void;
  onClose?: () => void;
  width?: number;
  disableTransition?: boolean;
  shadow?: boolean;
  backdropOpacity?: number;
  openOnReachValue?: number;
}

const Swipeable: React.FC<SwipeableProps> = ({
  children,
  className,
  onDrag,
  onRelease,
  onStart,
  style,
  bounds,
  axis = 'x',
  defaultPosition = { x: 0, y: 0 },
  onAnimationEnd,
  onOpen,
  open,
  openPosition,
  onClose,
  width = 320,
  disableTransition = false,
  backdropOpacity = 0.6,
  shadow = true,
  openOnReachValue = 0.5,
}) => {
  const [isDrag, setDrag] = useState(false);
  const [dragState, setDragState] = useState(defaultPosition);
  const [animation, setAnimation] = useState(false);
  const [cursorPosition, setCursorPosition] = useState({ x: 0, y: 0 });

  const translateTo = (pos: Vector2): void => {
    setDrag(false);
    setAnimation(true);
    setCursorPosition(pos);
    setDragState(pos);
    onRelease?.(pos, dragState);
  };

  useEffect(() => {
    if (animation) return;
    const handleStart = (event: TouchEvent): void => {
      setDrag(true);
      const newPos = {
        x: event.touches[0]?.clientX - dragState.x,
        y: event.touches[0]?.clientY - dragState.y,
      };
      setCursorPosition(newPos);
      onStart?.(newPos);
    };

    const handleRelease = (): void => {
      if (animation) return;
      if (
        (defaultPosition.x < openPosition.x &&
          dragState.x >= defaultPosition.x * (1 - openOnReachValue)) ||
        (defaultPosition.x > openPosition.x &&
          dragState.x < defaultPosition.x * (1 - openOnReachValue))
      ) {
        translateTo(openPosition);
        onOpen?.();
        return;
      }
      if (dragState.x === defaultPosition.x) {
        setDrag(false);
        setCursorPosition(defaultPosition);
        setDragState(defaultPosition);
        return;
      }
      console.log('toDefault');
      translateTo(defaultPosition);
      onClose?.();
    };

    const handleDrag = (event: TouchEvent): void => {
      // @ts-expect-error error
      if (event.touches[0].target.tabIndex === 1) return;
      if (
        dragState?.x === defaultPosition.x &&
        Math.abs(event.touches[0].clientY - cursorPosition.y) > 5
      ) {
        setDrag(false);
        return;
      }
      if (animation) return;
      if (!isDrag) return;
      const newState = {
        x: event.touches[0]?.clientX - cursorPosition.x,
        y: event.touches[0]?.clientX - cursorPosition.y,
      };
      newState.x = clamp(
        newState.x,
        bounds?.left ?? -Infinity,
        bounds?.right ?? Infinity
      );
      setDragState(newState);
      onDrag?.(newState, handleRelease);
    };
    document.addEventListener('touchstart', handleStart);
    document.addEventListener('touchend', handleRelease);
    document.addEventListener('touchmove', handleDrag);
    return () => {
      document.removeEventListener('touchstart', handleStart);
      document.removeEventListener('touchend', handleRelease);
      document.removeEventListener('touchmove', handleDrag);
    };
  }, [cursorPosition, isDrag, dragState, animation, defaultPosition]);

  useLayoutEffect(() => {
    if (!animation) return;
    if (disableTransition) {
      setAnimation(false);
      onAnimationEnd?.();
      return;
    }
    const timeoutId = setTimeout(() => {
      setAnimation(false);
      onAnimationEnd?.();
    }, 300);
    return () => {
      clearTimeout(timeoutId);
    };
  }, [animation]);

  useLayoutEffect(() => {
    if (open) {
      translateTo(openPosition);
    }
  }, [open]);

  return (
    <>
      <Backdrop
        onClick={() => {
          if (!open) return;
          translateTo(defaultPosition);
          onClose?.();
        }}
        open={animation || dragState.x !== defaultPosition.x}
        style={{
          transition: !animation || disableTransition ? 'none' : '300ms',
          backgroundColor: `rgba(0,0,0, ${
            (Math.abs(dragState?.x - defaultPosition?.x) /
              Math.abs(defaultPosition?.x)) *
            backdropOpacity
          })`,
          zIndex: 999,
          touchAction:
            animation || dragState.x !== defaultPosition.x ? 'auto' : 'none',
          display:
            animation || dragState.x !== defaultPosition.x ? 'block' : 'none',
        }}
      />
      <div
        className={clsx(classes.wrapper, className, {
          [classes.shadow]: shadow && dragState.x !== defaultPosition.x,
        })}
        style={{
          left: `${dragState.x}px`,
          transition: !animation || disableTransition ? 'none' : '300ms',
          ...style,
          width,
        }}
      >
        {children}
      </div>
    </>
  );
};

export default React.memo(Swipeable);
