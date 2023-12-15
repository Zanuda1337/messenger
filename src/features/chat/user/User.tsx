import React from 'react';
import ProfilePicture from 'src/features/chat/user/profilePicture/ProfilePicture';
import ListItem from 'src/components/listItem/ListItem';
import CustomSwitch from 'src/components/customSwitch/CustomSwitch';
import { useCopyToClipboard } from 'src/hooks';
import { User as IUser } from 'src/app/app.types';

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
      <ProfilePicture
        user={user}
        images={[
          {
            url: 'https://upload.wikimedia.org/wikipedia/ru/9/94/%D0%93%D0%B8%D0%B3%D0%B0%D1%87%D0%B0%D0%B4.jpg',
          },
          {
            url: 'https://i.ytimg.com/vi/Ux5cQbO_ybw/maxresdefault.jpg',
          },
          {
            url: 'https://yt3.googleusercontent.com/BV3BfZ_aFWJXLeePO0KaM5pIYn5rxn0cEcXy8cXtIFKZOJ9fPAutMApUc3aP7rqsu0C8mFxUGw=s900-c-k-c0x00ffffff-no-rj',
          },
          {
            url: 'https://i.pinimg.com/736x/40/71/d6/4071d667fae30cd0e003c165f9dc757e.jpg',
          },
          {
            url: 'https://i.ytimg.com/vi/d0S2jjDgm10/hq720.jpg?sqp=-oaymwE7CK4FEIIDSFryq4qpAy0IARUAAAAAGAElAADIQj0AgKJD8AEB-AH-CYAC0AWKAgwIABABGGUgZShlMA8=&rs=AOn4CLCT249JpdUy4Qj5CCGlRs_bTFixTA',
          },
        ]}
      />
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
