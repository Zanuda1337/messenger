import React, { useMemo, useState } from 'react';
import tabsClasses from '../Tabs.module.scss';
import User from 'src/features/chat/user/User';
import TabHeader from 'src/components/tabHeader/TabHeader';
import ListItem from 'src/components/listItem/ListItem';
import Scroll from 'src/components/scroll/Scroll';
import Typography from 'src/components/typography/Typography';
import { useTabs } from 'src/hooks';
import { useAppSelector, useBoundActions } from 'src/app/hooks';
import CustomIconButton from 'src/components/customIconButton/CustomIconButton';
import SvgSelector from 'src/components/svgSelector/SvgSelector';
import CustomMenu from 'src/components/customMenu/CustomMenu';
import CustomDialogue from 'src/components/customDialogue/CustomDialogue';
import { appActions } from 'src/slices/app/app.slice';
import { useLogoutMutation } from 'src/api/authApi/authApi';

const Settings: React.FC = () => {
  const user = useAppSelector((state) => state.app.user);
  const appStatus = useAppSelector((state) => state.app.status);
  const boundActions = useBoundActions(appActions);
  const [logout] = useLogoutMutation();

  const [logoutDialogOpen, setLogoutDialogOpen] = useState(false);
  const { navigateTab } = useTabs();
  const handleCloseLogoutDialog = (): void => {
    setLogoutDialogOpen(false);
  };
  const handleOpenLogoutDialog = (): void => {
    setLogoutDialogOpen(true);
  };
  const handleLogout = async (): Promise<void> => {
    await logout().unwrap();
    boundActions.logout();
    handleCloseLogoutDialog();
  };

  const navigation = useMemo(
    () => [
      {
        key: 'general_settings',
        title: 'General Settings',
        iconId: 'settings',
        onClick: () => {
          navigateTab('general_settings');
        },
      },
      {
        key: 'notifications',
        title: 'Notifications',
        iconId: 'notifications',
        onClick: () => {
          navigateTab('notifications');
        },
      },
      {
        key: 'privacy',
        title: 'Privacy and Security',
        iconId: 'privacy',
        onClick: () => {
          navigateTab('privacy');
        },
      },
      {
        key: 'devices',
        title: 'Devices',
        iconId: 'devices',
        endAdornment: (
          <Typography color={'tertiary'} weight={700}>
            2
          </Typography>
        ),
      },
      {
        key: 'language',
        title: 'Language',
        iconId: 'language',
        onClick: () => {
          navigateTab('language');
        },
        endAdornment: (
          <Typography color={'tertiary'} weight={700}>
            English
          </Typography>
        ),
      },
    ],
    [navigateTab]
  );

  return (
    <div className={tabsClasses.wrapper}>
      <CustomDialogue
        content={'Are you sure you want to log out?'}
        open={logoutDialogOpen}
        slotProps={{
          submit: {
            color: 'error',
            children: 'log out',
            fetching: appStatus === 'loading',
          },
        }}
        onSubmit={() => {
          void handleLogout();
        }}
        onClose={handleCloseLogoutDialog}
      />
      <TabHeader
        label={'Settings'}
        endAdornment={
          <>
            <CustomIconButton
              onClick={() => {
                navigateTab('user_edit');
              }}
            >
              <SvgSelector id="edit" className={'iconButton'} />
            </CustomIconButton>
            <CustomMenu
              options={[
                {
                  icon: 'logout',
                  label: 'log out',
                  value: 'logout',
                  onClick: handleOpenLogoutDialog,
                },
              ]}
              offset={{ top: 15, right: -15 }}
              placement={'top-end'}
            >
              <CustomIconButton>
                <SvgSelector id="more" className={'iconButton'} />
              </CustomIconButton>
            </CustomMenu>
          </>
        }
      />
      <Scroll>
        <User user={user} hideNotifications />
        <div className={'border'} />
        <div className={'list'}>
          {navigation.map((nav) => (
            <ListItem
              key={nav.key}
              title={nav.title}
              iconId={nav.iconId}
              endAdornment={nav.endAdornment}
              onClick={nav.onClick}
            />
          ))}
        </div>
      </Scroll>
    </div>
  );
};

export default Settings;
