import React, { CSSProperties } from 'react';
import classes from './Scroll.module.scss';
import { Scrollbars } from 'react-custom-scrollbars-2';
import { clsx } from 'clsx';

interface ScrollProps {
  children: JSX.Element | JSX.Element[];
  smoothScroll?: boolean;
}
export interface WithStyles {
  style: CSSProperties;
}
// eslint-disable-next-line react/display-name
const Scroll = React.forwardRef<Scrollbars, ScrollProps>(
  ({ children, smoothScroll = true }, ref) => {
    return (
      <Scrollbars
        ref={ref}
        className={clsx(classes.scroll, { [classes.smooth]: smoothScroll })}
        autoHide
        hideTracksWhenNotNeeded
        renderTrackHorizontal={(props) => (
          <div {...props} className={classes['track-horizontal']} />
        )}
        renderTrackVertical={(props: WithStyles) => (
          <div
            {...props}
            className={classes['track-vertical']}
            // eslint-disable-next-line react/prop-types
            style={{
              ...props.style,
              width: '4px',
            }}
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
