import React from 'react';
import ProfilePicture from 'src/features/chat/user/profilePicture/ProfilePicture';
import ListItem from 'src/components/listItem/ListItem';
import CustomSwitch from 'src/components/customSwitch/CustomSwitch';
import { useCopyToClipboard } from 'src/hooks';
import { User as IUser } from 'src/slices/app/app.types';
import listItemClasses from 'src/components/listItem/ListItem.module.scss';
import classes from './User.module.scss';
import SvgSelector from 'src/components/svgSelector/SvgSelector';
import Typography from 'src/components/typography/Typography';

interface UserProps {
  user: IUser | null;
  onChangeNotifications?: () => void;
  hideNotifications?: boolean;
  notifications?: boolean;
}
const User: React.FC<UserProps> = ({
  user,
  onChangeNotifications,
  hideNotifications = false,
  notifications,
}) => {
  const copyToClipboard = useCopyToClipboard();
  const handleCopy =
    (label: string, text: string): (() => void) =>
    () => {
      copyToClipboard(text, `${label} was copied`);
    };
  return (
    <>
      <ProfilePicture user={user} />
      <div className={'list'}>
        <ListItem
          iconId="phone"
          title={'Phone'}
          subtitle={'+7 950 813 2299'}
          slotProps={{
            titleProps: { color: 'tertiary', size: 's' },
            subtitleProps: { size: 'm' },
          }}
          onClick={handleCopy('Phone', '+7 950 813 2299')}
        />
        <ListItem
          iconId="alternate"
          title={'Username'}
          subtitle={user?.username}
          slotProps={{
            titleProps: { color: 'tertiary', size: 's' },
            subtitleProps: { size: 'm' },
          }}
          onClick={handleCopy('Username', `@${user?.username}`)}
        />
        {typeof user?.bio === 'string' && user?.bio.length > 0 && (
          <div className={classes.item}>
            <div className={listItemClasses.block}>
              <SvgSelector id={'info'} className={listItemClasses.svg} />
              <div className={listItemClasses.textContainer}>
                <Typography color={'tertiary'} size={'s'} weight={600}>
                  Bio
                </Typography>
                <Typography size={'m'} className={classes.bio}>
                  {user?.bio}
                </Typography>
              </div>
            </div>
          </div>
        )}
        {!hideNotifications && (
          <ListItem
            iconId="notifications"
            title={'Notifications'}
            endAdornment={
              <CustomSwitch
                checked={notifications}
                onChange={onChangeNotifications}
              />
            }
          />
        )}
      </div>
    </>
  );
};

export default User;
