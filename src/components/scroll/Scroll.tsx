import React from 'react';
import classes from './Scroll.module.scss';
import { Scrollbars } from 'react-custom-scrollbars-2';

interface ScrollProps {
  children: JSX.Element | JSX.Element[];
}

// eslint-disable-next-line react/display-name
const Scroll = React.forwardRef<Scrollbars, ScrollProps>(
  ({ children }, ref) => {
    return (
      <Scrollbars
        ref={ref}
        className={classes.scroll}
        autoHide
        hideTracksWhenNotNeeded
        renderTrackHorizontal={(props) => (
          <div {...props} className={classes['track-horizontal']} />
        )}
        renderTrackVertical={(props) => (
          <div
            {...props}
            className={classes['track-vertical']}
            // eslint-disable-next-line react/prop-types
            style={{ ...props.style, width: '4px' }}
          />
        )}
        renderThumbHorizontal={(props) => (
          <div {...props} className={classes['thumb-horizontal']} />
        )}
        renderThumbVertical={(props) => (
          <div {...props} className={classes['thumb-vertical']} />
        )}
      >
        {children}
      </Scrollbars>
    );
  }
);

export default Scroll;
