import React, { useMemo } from 'react';
import tabsClasses from '../Tabs.module.scss';
import User from 'src/features/chat/user/User';
import TabHeader from 'src/components/tabHeader/TabHeader';
import ListItem from 'src/components/listItem/ListItem';
import Scroll from 'src/components/scroll/Scroll';
import Typography from 'src/components/typography/Typography';
import { useTabs } from 'src/hooks';

const Settings: React.FC = () => {
  const { navigateTab } = useTabs();
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
      <TabHeader label={'Settings'} />
      <Scroll>
        <User />
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
