// eslint-disable-next-line @typescript-eslint/no-unused-vars
import React, { Ref, RefObject } from 'react';
import { useLocation, useOutlet } from 'react-router-dom';
import Dialogs from 'src/features/dialogs/Dialogs';
import classes from './Messenger.module.scss';
import { useDevice } from 'src/hooks';
import { routes } from 'src/router/Router';
import { CSSTransition, TransitionGroup } from 'react-transition-group';

const Messenger: React.FC = () => {
  const { width } = useDevice();
  const location = useLocation();
  const isDialogsLocation = location.pathname === '/';
  const isMobileLayout = isDialogsLocation || width > 850;

  const currentOutlet = useOutlet();
  const { nodeRef } =
    routes.find((route) => route.path === location.pathname) ?? {};

  return (
    <div className={classes.messenger}>
      <CSSTransition
        unmountOnExit
        timeout={300}
        classNames={'left-block'}
        in={isMobileLayout}
      >
        <aside className={'left-block'}>
          <Dialogs />
        </aside>
      </CSSTransition>

      <TransitionGroup component={'main'}>
        <CSSTransition
          key={
            location.pathname.split('/')[1] !== ''
              ? `${0}`
              : '1'
          }
          nodeRef={nodeRef as Ref<HTMLElement | undefined> | undefined}
          timeout={300}
          classNames={width < 850 ? 'roll' : 'page'}
          unmountOnExit
        >
          {width < 850 ? (
            <div
              ref={nodeRef as RefObject<HTMLDivElement>}
              className={width < 850 ? 'roll' : 'page'}
            >
              {currentOutlet}
            </div>
          ) : (
            <>{currentOutlet}</>
          )}
        </CSSTransition>
      </TransitionGroup>
    </div>
  );
};

// {isMobileLayout && (
//   <aside>
//     <Dialogs />
//   </aside>
// )}

export default Messenger;
