import React, { useEffect, useState } from 'react';
import classes from './SlotMachine.module.scss';
import { TransitionGroup, CSSTransition } from 'react-transition-group';
import { clsx } from 'clsx';

interface SlotMachineProps {
  value: number;
  timeout: number;
}

const SlotMachine: React.FC<SlotMachineProps> = ({ timeout, value }) => {
  const [number, setNumber] = useState(value);
  const [prevNumber, setPrevNumber] = useState(value);
  useEffect(() => {
    setNumber((prevState) => {
      setPrevNumber(prevState);
      return value;
    });
  }, [value]);
  return (
    <span className={classes.wrapper}>
      <span className={classes.invisible}>{number}</span>

      <TransitionGroup
        component={React.Fragment}
        childFactory={(child) =>
          React.cloneElement(child, {
            classNames: clsx('slot-machine', {
              'slot-machine-down': prevNumber < number,
            }),
            timeout: 150,
          })
        }
      >
        <CSSTransition
          timeout={timeout}
          key={number}
          classNames={clsx('slot-machine')}
          unmountOnExit
        >
          <span className={clsx('slot-machine')}>{number}</span>
        </CSSTransition>
      </TransitionGroup>
    </span>
  );
};

export default SlotMachine;
