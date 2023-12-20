/* eslint-disable @typescript-eslint/no-unused-vars */

import React, { CSSProperties, useEffect, useRef, useState } from 'react';
import { Button } from '@mui/material';
import CustomAvatar, {
  AvatarProps,
} from 'src/components/customAvatar/CustomAvatar';
import { format } from 'date-fns';
import classes from '../../Root.module.scss';
import Typography from 'src/components/typography/Typography';
import clsx from 'clsx';
import SvgSelector from 'src/components/svgSelector/SvgSelector';
import Badge from 'src/components/badge/Badge';
import CustomLink from 'src/components/customLink/CustomLink';
import { useDevice } from 'src/hooks';

const userId = 1;
interface Layout {
  width: number;
  height: number;
}

const makeLayout = (width: number = 0, height: number = 0): Layout => ({
  width,
  height,
});
const useLayout = <T extends HTMLElement>(): {
  ref: React.RefObject<T>;
  layout: Layout;
} => {
  const ref = useRef<T>(null);
  const [layout, setLayout] = useState(makeLayout());
  const { width } = useDevice();
  useEffect(() => {
    if (ref.current === null) return;
    setLayout(
      makeLayout(
        ref.current.getBoundingClientRect().width,
        ref.current.getBoundingClientRect().height
      )
    );
  }, [ref, width]);
  return { ref, layout };
};

interface DialogueProps {
  title: string;
  subtitle: string;
  id: string;
  avatarProps: Omit<AvatarProps, 'size' | 'className'>;
  active?: boolean;
  titleIcon?: string;
  prefix?: string;
  badgeProps?: {
    color?: 'pale' | 'primary';
    variant?: 'dot' | 'standard';
    value?: number;
  };
  badge?: boolean;
  date?: string;
}
const Dialogue: React.FC<DialogueProps> = ({
  id,
  subtitle,
  title,
  avatarProps,
  active = false,
  titleIcon,
  prefix,
  badgeProps,
  badge = false,
  date,
}) => {
  const {
    ref: buttonRef,
    layout: { width: buttonWidth },
  } = useLayout<HTMLButtonElement>();
  const {
    ref: badgeRef,
    layout: { width: badgeWidth },
  } = useLayout<HTMLDivElement>();

  return (
    <CustomLink to={`/${id}`}>
      <Button
        ref={buttonRef}
        style={{
          // @ts-expect-error CSSProperties
          '--containerWidth': `${buttonWidth}px`,
          '--badgeWidth': `${badgeWidth}px`,
        }}
        classes={{
          root: clsx(classes.buttonRoot, { [classes.active]: active }),
        }}
      >
        <CustomAvatar size="medium" {...avatarProps} />
        <div className={classes.column}>
          <div className={classes.line}>
            <div className={classes.titleContainer}>
              <div className={classes.text}>
                <Typography weight={600} className={classes.cut}>
                  {title}
                </Typography>
              </div>
              {titleIcon !== undefined && <SvgSelector id={titleIcon} />}
            </div>
            {date !== undefined &&
              <Typography color="tertiary" size="xs">
                {date}
              </Typography>
            }
          </div>
          <div className={classes.line}>
            <Typography className={classes.text}>
              <>
                {prefix !== undefined && (
                  <Typography color="interactive_primary" el={'span'}>
                    {prefix}
                  </Typography>
                )}
                <Typography
                  color="secondary"
                  className={classes.cut}
                  el={'span'}
                >
                  {subtitle}
                </Typography>
              </>
            </Typography>
            {badge && (
              <div className={classes.badgeContainer} ref={badgeRef}>
                <Badge variant={'dot'} color={'primary'} {...badgeProps} />
              </div>
            )}
          </div>
        </div>
      </Button>
    </CustomLink>
  );
};

export default Dialogue;
