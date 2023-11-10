import React from 'react';
import classes from './Chat.module.scss';
import Typography from 'src/components/typography/Typography';
import clsx from 'clsx';
import { format } from 'date-fns';
import { stringToColor } from 'src/utils';
import Badge from 'src/components/badge/Badge';
import SvgSelector from 'src/components/svgSelector/SvgSelector';

// eslint-disable-next-line @typescript-eslint/no-empty-interface
interface MessageProps {
  text?: string;
  date: Date;
  isOwn: boolean;
  showName: boolean;
  last: boolean;
  sent: boolean;
  read: boolean;
  user: {
    id: number;
    firstName: string;
    lastName?: string;
  };
}

// eslint-disable-next-line no-empty-pattern
const Message: React.FC<MessageProps> = ({
  date,
  isOwn,
  read,
  sent,
  text,
  showName,
  last,
  user,
}) => {
  return (
    // <div className={classes.container}>
    <div
      className={clsx(classes.messageWrapper, {
        [classes.own]: isOwn,
        [classes.fullRadius]: !last,
      })}
    >
      {!read && (
        <div className={classes.badge}>
          <Badge variant="dot" />
        </div>
      )}
      <div className={classes.message}>
        {showName && (
          <Typography
            weight={600}
            style={{ color: stringToColor(user.firstName) }}
          >
            {clsx(user.firstName, {
              [` ${user.lastName}`]: user.lastName !== undefined,
            })}
          </Typography>
        )}
        <div className={classes.content}>
          {text !== undefined && (
            <Typography
              weight={500}
              size="m"
              className={classes.messageTypography}
            >
              {text}
            </Typography>
          )}
        </div>
        <div className={classes.date}>
          <Typography color="tertiary" size={'xxs'}>
            {format(date, 'HH:mm')}
          </Typography>
          {!sent && <SvgSelector id="time" className={classes.icon}/>}
        </div>
      </div>
    </div>
    // </div>
  );
};

export default Message;
