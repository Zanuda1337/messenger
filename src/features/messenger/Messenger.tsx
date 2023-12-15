import React from 'react';
import { useLocation, useOutlet } from 'react-router-dom';
import classes from './Messenger.module.scss';
import { useDevice, useTabs } from 'src/hooks';
import { CSSTransition, TransitionGroup } from 'react-transition-group';

const Messenger: React.FC = () => {
  const { width } = useDevice();
  const location = useLocation();
  const isDialogsLocation = location.pathname === '/';
  const isMobileLayout = isDialogsLocation || width > 850;
  const { outlet, key } = useTabs();

  const currentOutlet = useOutlet();

  return (
    <div className={classes.messenger}>
      <CSSTransition
        unmountOnExit
        timeout={300}
        classNames={'left-block'}
        in={isMobileLayout}
      >
        <aside className={'left-block'}>
          <TransitionGroup component={React.Fragment}>
            <CSSTransition timeout={150} key={key} classNames={'zoom'}>
              <div className={'zoom'}>{outlet}</div>
            </CSSTransition>
          </TransitionGroup>
        </aside>
      </CSSTransition>

      <TransitionGroup component={'main'}>
        <CSSTransition
          key={location.pathname.split('/')[1] !== '' ? `${0}` : '1'}
          timeout={300}
          classNames={width < 850 ? 'roll' : 'page'}
          unmountOnExit
        >
          {width < 850 ? (
            <div className={width < 850 ? 'roll' : 'page'}>{currentOutlet}</div>
          ) : (
            <>{currentOutlet}</>
          )}
        </CSSTransition>
      </TransitionGroup>
    </div>
  );
};

export default Messenger;
