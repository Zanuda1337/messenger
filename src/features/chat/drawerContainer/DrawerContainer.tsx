import React from 'react';
import { CSSTransition, SwitchTransition } from 'react-transition-group';
import { useLocation, useOutlet } from 'react-router-dom';

const DrawerContainer: React.FC = () => {
  const currentOutlet = useOutlet();
  const location = useLocation();

  return (
    <SwitchTransition>
      <CSSTransition
        unmountOnExit
        mountOnEnter
        timeout={300}
        classNames={'right-block'}
        in={location.pathname.split('/').length > 2}
        key={location.pathname.split('/').slice(0, 3).length ?? ''}
      >
        {location.pathname.split('/').length > 2 ? (
          <div className={'right-block'}>{currentOutlet}</div>
        ) : (
          <></>
        )}
      </CSSTransition>
    </SwitchTransition>
  );
};

export default DrawerContainer;
