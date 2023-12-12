import React from 'react';
import tabsClasses from 'src/features/tabs/Tabs.module.scss';
import TabHeader from 'src/components/tabHeader/TabHeader';
import Scroll from 'src/components/scroll/Scroll';
import Typography from 'src/components/typography/Typography';
import ListItem from 'src/components/listItem/ListItem';
import CustomCheckbox from 'src/components/customCheckbox/CustomCheckbox';
import { useTabs } from 'src/hooks';

const navigation = [
  {
    id: 1,
    title: 'Who can see my phone number?',
    subtitle: 'My contacts',
  },
  {
    id: 2,
    title: 'Who can see my last seen time?',
    subtitle: 'Everybody',
  },
  {
    id: 3,
    title: 'Who can see my profile photos?',
    subtitle: 'Everybody',
  },
  {
    id: 4,
    title: 'Bio',
    subtitle: 'Everybody',
  },
  {
    id: 5,
    title: 'Who can add me to group chats?',
    subtitle: 'Everybody',
  },
];

const Privacy: React.FC = () => {
  const { navigateTab } = useTabs();
  return (
    <div className={tabsClasses.wrapper}>
      <TabHeader label={'Privacy and Security'} />
      <div className={'border'} />
      <div className={'list'}>
        <ListItem
          iconId={'blocked'}
          title={'Blocked Users'}
          endAdornment={<Typography color={'tertiary'}>2</Typography>}
        />
        <ListItem
          iconId={'key'}
          title={'Passcode Lock'}
          subtitle={'Off'}
          slotProps={{ subtitleProps: { color: 'tertiary' } }}
        />
      </div>
      <div className={'border'} />
      <Scroll>
        <div className={tabsClasses.titleContainer}>
          <Typography color={'tertiary'} size={'m'} weight={700}>
            Privacy
          </Typography>
        </div>
        <div className={'list'}>
          {navigation.map((nav) => (
            <ListItem
              key={nav.id}
              title={nav.title}
              subtitle={nav.subtitle}
              slots={{ icon: <></> }}
              slotProps={{ subtitleProps: { color: 'tertiary' } }}
              onClick={() => {
                navigateTab('privacy_edit');
              }}
            />
          ))}
        </div>
        <div className={'border'} />
        <div className={tabsClasses.titleContainer}>
          <Typography color={'tertiary'} size={'m'} weight={700}>
            Window title bar
          </Typography>
        </div>
        <div className={'list'}>
          <ListItem
            title={'Show chat name'}
            subtitle={'Enabled'}
            slots={{
              icon: <CustomCheckbox checked={true} />,
            }}
            slotProps={{ subtitleProps: { color: 'tertiary' } }}
          />
        </div>
      </Scroll>
    </div>
  );
};

export default Privacy;
