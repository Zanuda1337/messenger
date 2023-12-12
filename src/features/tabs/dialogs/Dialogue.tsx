import React from 'react';
import { Button } from '@mui/material';
import CustomAvatar from 'src/components/customAvatar/CustomAvatar';
import { format } from 'date-fns';
import classes from './Dialogs.module.scss';
import Typography from 'src/components/typography/Typography';
import clsx from 'clsx';
import SvgSelector from 'src/components/svgSelector/SvgSelector';
import Badge from 'src/components/badge/Badge';
import CustomLink from 'src/components/customLink/CustomLink';

interface DialogueProps {
  id: number;
  message: {
    text: string;
    date: Date;
    user: { id: number; name: string };
    read: boolean;
  };
  muted: boolean;
  unreadCount: number;
  title: string;
  active: boolean;
}

const userId = 1;

const Dialogue: React.FC<DialogueProps> = ({
  id,
  message,
  title,
  unreadCount,
  active,
  muted,
}) => {
  return (
    <CustomLink to={`/${id}`}>
      <Button
        classes={{
          root: clsx(classes.buttonRoot, { [classes.active]: active }),
        }}
      >
        <CustomAvatar name={message.user.name} size="medium" />
        <div className={classes.column}>
          <div className={classes.line}>
            <div className={classes.titleContainer}>
              <Typography weight={600}>{title}</Typography>
              {muted && <SvgSelector id="mute" />}
            </div>
            <Typography color="tertiary" size="xs">
              {format(new Date(), 'hh:mm')}
            </Typography>
          </div>
          <div className={classes.line}>
            <div className={classes.text}>
              {message.user.id === userId && (
                <Typography color="interactive-primary">you:</Typography>
              )}
              <Typography color="secondary" className={classes.cut}>
                {message.text}
              </Typography>
            </div>
            {!message.read && (
              <div className={classes.badgeContainer}>
                <Badge
                  variant={message.user.id === userId ? 'dot' : 'standard'}
                  value={unreadCount}
                  color={muted ? 'pale' : 'primary'}
                />
              </div>
            )}
          </div>
        </div>
      </Button>
    </CustomLink>
  );
};

export default Dialogue;
