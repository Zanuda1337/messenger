import React, { useState } from 'react';
import tabsClasses from 'src/features/tabs/Tabs.module.scss';
import TabHeader from 'src/components/tabHeader/TabHeader';
import Typography from 'src/components/typography/Typography';
import CustomSlider from 'src/components/customSlider/CustomSlider';
import ListItem from 'src/components/listItem/ListItem';
import CustomCheckbox from 'src/components/customCheckbox/CustomCheckbox';
import Scroll from 'src/components/scroll/Scroll';

interface SettingsItem {
  categoryId: number;
  title: string;
  items: Array<{ id: number; label: string; value: boolean; depends?: number }>;
}
type Settings = Record<number, SettingsItem>;

const initialSettings: Settings = {
  1: {
    categoryId: 1,
    title: 'Private Chats',
    items: [
      {
        id: 1,
        label: 'Notifications for private chats',
        value: true,
      },
      {
        id: 2,
        label: 'Show message previews',
        value: true,
        depends: 1,
      },
    ],
  },
  2: {
    categoryId: 2,
    title: 'Groups',
    items: [
      {
        id: 1,
        label: 'Notifications for groups',
        value: true,
      },
      {
        id: 2,
        label: 'Show message previews',
        value: true,
        depends: 1,
      },
    ],
  },
  3: {
    categoryId: 3,
    title: 'Channels',
    items: [
      {
        id: 1,
        label: 'Notifications for channels',
        value: true,
      },
      {
        id: 2,
        label: 'Show message previews',
        value: true,
        depends: 1,
      },
    ],
  },
  4: {
    categoryId: 4,
    title: 'Other',
    items: [
      {
        id: 1,
        label: 'Contact joined Cheburnet',
        value: true,
      },
    ],
  },
};

const Notifications: React.FC = () => {
  const [settings, setSettings] = useState<Settings>(initialSettings);
  const [webNotifications, setWebNotifications] = useState(false);
  const [offlineNotifications, setOfflineNotifications] = useState(false);
  const toggleWebNotifications = (): void => {
    setWebNotifications(!webNotifications);
  };
  const toggleOfflineNotifications = (): void => {
    setOfflineNotifications(!offlineNotifications);
  };

  const handleChangeSettings =
    (categoryId: number, itemId: number): (() => void) =>
    () => {
      setSettings({
        ...settings,
        [categoryId]: {
          ...settings[categoryId],
          items: settings[categoryId].items.map((item) =>
            item.id === itemId ? { ...item, value: !item.value } : item
          ),
        },
      });
    };

  return (
    <div className={tabsClasses.wrapper}>
      <TabHeader label={'Notifications'} />
      <div className={'border'} />
      <Scroll>
        <div className={tabsClasses.titleContainer}>
          <Typography color={'tertiary'} size={'m'} weight={700}>
            Web Notifications
          </Typography>
        </div>
        <div className={'list'}>
          <ListItem
            title={'Web Notifications'}
            onClick={toggleWebNotifications}
            subtitle={webNotifications ? 'Enabled' : 'Disabled'}
            slots={{
              icon: (
                <CustomCheckbox
                  checked={webNotifications}
                  onChange={toggleWebNotifications}
                />
              ),
            }}
          />
          <ListItem
            title={'Offline Notifications'}
            onClick={toggleOfflineNotifications}
            subtitle={offlineNotifications ? 'Enabled' : 'Disabled'}
            slots={{
              icon: (
                <CustomCheckbox
                  checked={offlineNotifications}
                  onChange={toggleOfflineNotifications}
                />
              ),
            }}
          />
          <CustomSlider value={5} label={'Sound'} max={10} defaultValue={5} />
        </div>
        <div className={'border'} />
        <>
          {Object.values(settings).map((category) => (
            <>
              <div
                className={tabsClasses.titleContainer}
                key={category.categoryId}
              >
                <Typography color={'tertiary'} size={'m'} weight={700}>
                  {category.title}
                </Typography>
              </div>
              <div className={'list'}>
                {category.items.map((item) => {
                  const enabled =
                    category.items.find((i) => i.id === item.depends)?.value ??
                    true;
                  return (
                    <ListItem
                      key={item.id}
                      disabled={!enabled}
                      title={item.label}
                      onClick={handleChangeSettings(
                        category.categoryId,
                        item.id
                      )}
                      subtitle={item.value ? 'Enabled' : 'Disabled'}
                      slots={{
                        icon: (
                          <CustomCheckbox
                            checked={item.value}
                            onChange={handleChangeSettings(
                              category.categoryId,
                              item.id
                            )}
                          />
                        ),
                      }}
                      slotProps={{ subtitleProps: { color: 'tertiary' } }}
                    />
                  );
                })}
              </div>
            </>
          ))}
        </>
      </Scroll>
    </div>
  );
};

export default Notifications;
