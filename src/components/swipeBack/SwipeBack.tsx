import React, { useState } from 'react';
import classes from './SwipeBack.module.scss';
import { CircularProgress, Portal } from '@mui/material';
import Swipeable from 'src/components/swipeable/Swipeable';
import SvgSelector from 'src/components/svgSelector/SvgSelector';
import { useHistory } from 'src/providers/HistoryProvider';

const getProgress = (offset: number): number => ((offset + 140) / 140) * 100;

const SwipeBack: React.FC = () => {
  const { goBack } = useHistory();

  const [offset, setOffset] = useState(-180);
  const [transition, setTransition] = useState(false);
  return (
    <Portal>
      <Swipeable
        open={false}
        bounds={{ left: -180, right: 0 }}
        openPosition={{ x: 0, y: 0 }}
        defaultPosition={{ x: -180, y: 0 }}
        onDrag={(state) => {
          setOffset(state.x);
        }}
        onRelease={(state, prevState) => {
          setOffset(state.x);
          setTransition(true);
          if (getProgress(prevState.x) === 100) {
            setTimeout(() => {
              goBack();
            }, 150);
          }
        }}
        onAnimationEnd={() => {
          setTransition(false);
        }}
        shadow={false}
        backdropOpacity={0.2}
        width={180}
        openOnReachValue={1.1}
      >
        <div className={classes.wrapper}>
          <div
            className={classes.inner}
            style={{
              opacity: getProgress(offset) * 0.015 - 0.5,
              transition: transition ? '300ms' : 'none',
            }}
          >
            <CircularProgress
              classes={{ root: classes.progress }}
              size={80}
              value={getProgress(offset) * 2 - 100}
              variant={'determinate'}
              sx={{
                '&.MuiCircularProgress-root.MuiCircularProgress-determinate .MuiCircularProgress-circle.MuiCircularProgress-circleDeterminate':
                  { transition: transition ? '300ms' : 'none' },
              }}
            />
            <SvgSelector id={'arrowLeft'} className={classes.icon} />
          </div>
        </div>
      </Swipeable>
    </Portal>
  );
};

export default SwipeBack;
