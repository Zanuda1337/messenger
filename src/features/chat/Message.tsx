import React from 'react';
import classes from './Chat.module.scss';
import Typography from 'src/components/typography/Typography';
import clsx from 'clsx';
import { format } from 'date-fns';
import { stringToColor } from 'src/utils';
import Badge from 'src/components/badge/Badge';
import SvgSelector from 'src/components/svgSelector/SvgSelector';
import { User } from 'src/slices/app/app.types';

interface MessageProps {
  text?: string;
  date: Date;
  isOwn: boolean;
  showName: boolean;
  last: boolean;
  sent: boolean;
  read: boolean;
  user: User;
  selectMode: boolean;
  isSelected: boolean;
  isActive: boolean;
  onClick: (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => void;
  onContextMenu: (event: React.MouseEvent) => void;
}

const Message: React.FC<MessageProps> = ({
  date,
  isOwn,
  read,
  sent,
  text,
  showName,
  last,
  user,
  isActive,
  isSelected,
  selectMode,
  onClick,
  onContextMenu,
}) => {
  return (
    <div
      className={clsx(classes.messageContainer, {
        [classes.active]: isActive || isSelected,
      })}
      onContextMenu={onContextMenu}
      onClick={onClick}
    >
      <div
        className={clsx(classes.messageWrapper, {
          [classes.own]: isOwn,
          [classes.fullRadius]: !last,
        })}
      >
        <div
          className={clsx(classes.checkboxContainer, {
            [classes.active]: selectMode,
          })}
        >
          <div>
            <SvgSelector id={'checkCircle'} />
          </div>
        </div>
        {!read && (
          <div className={classes.badge}>
            <Badge variant="dot" />
          </div>
        )}
        <div className={classes.message}>
          {showName && (
            <Typography
              weight={600}
              style={{ color: stringToColor(clsx(user.name, user.surname)) }}
            >
              {clsx(user.name, user.surname)}
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
            {!sent && <SvgSelector id="time" className={classes.icon} />}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Message;
