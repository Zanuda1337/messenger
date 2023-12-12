import React, { CSSProperties, useEffect, useRef, useState } from 'react';
import classes from './CustomPopper.module.scss';
import { v4 } from 'uuid';
import { ClickAwayListener, Tooltip, TooltipProps } from '@mui/material';

export interface CustomPopperProps extends Pick<TooltipProps, 'placement'> {
  offset?: { top?: number; left?: number; bottom?: number; right?: number };
  className?: string;
  content: JSX.Element;
  children: JSX.Element;
  open: boolean;
  style?: CSSProperties;
  leaveInterval?: number;
  onOpen: () => void;
  onClose: () => void;
  mode?: 'hover' | 'click';
}

const TIME_STEP = 50;

const CustomPopper: React.FC<CustomPopperProps> = ({
  children,
  open,
  content,
  offset,
  style = {},
  className,
  onClose,
  leaveInterval = 250,
  onOpen,
  mode = 'hover',
  ...props
}) => {
  const [uniqueId] = useState(v4());
  const childRef = useRef<HTMLDivElement>(null);
  const [counter, setCounter] = useState(0);
  const [focused, setFocused] = useState(false);

  useEffect(() => {
    if (mode === 'click') return;
    const child = childRef.current;
    if (child === null) return;
    let timeoutId: NodeJS.Timeout;
    let menu = document.getElementById(uniqueId);
    const handleMouseMove = (e: MouseEvent): void => {
      if (menu === null) menu = document.getElementById(uniqueId);
      if (menu === null) return;
      if (
        (child as Node).contains(e.target as Node) ||
        (menu as Node).contains(e.target as Node)
      ) {
        setFocused(true);
        setCounter(0);
        return;
      }
      setFocused(false);
    };
    document.addEventListener('mousemove', handleMouseMove);
    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      clearTimeout(timeoutId);
    };
  }, [childRef, focused]);

  useEffect(() => {
    if (mode === 'click') return;
    if (focused) return;
    if (!open) return;
    if (counter >= leaveInterval) {
      onClose();
      return;
    }
    const timeoutId = setTimeout(() => {
      setCounter(counter + TIME_STEP);
    }, TIME_STEP);
    return () => {
      clearTimeout(timeoutId);
    };
  }, [focused, counter, open]);

  return (
    <Tooltip
      classes={{ tooltip: classes.tooltip }}
      open={open}
      ref={childRef}
      {...props}
      title={
        <ClickAwayListener onClickAway={onClose}>
          <div
            className={className}
            id={uniqueId}
            style={{
              paddingTop: `${offset?.top ?? 0}px`,
              marginLeft: `${offset?.left ?? 0}px`,
              paddingBottom: `${offset?.bottom ?? 0}px`,
              marginRight: `${offset?.right ?? 0}px`,
              ...style,
            }}
          >
            <div className={classes.content}>{content}</div>
          </div>
        </ClickAwayListener>
      }
    >
      <div
        onMouseEnter={() => {
          if (mode === 'click') {
            return;
          }
          setFocused(true);
          onOpen();
        }}
        onClick={onOpen}
        style={{
          height: 'inherit',
        }}
      >
        {children}
      </div>
    </Tooltip>
  );
};

export default CustomPopper;
