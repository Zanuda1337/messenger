import React from 'react';
import tabsClasses from 'src/features/tabs/Tabs.module.scss';
import TabHeader from 'src/components/tabHeader/TabHeader';
import RadioGroup from 'src/components/radioGroup/RadioGroup';
import Typography from 'src/components/typography/Typography';
import Scroll from 'src/components/scroll/Scroll';
import ListItem from 'src/components/listItem/ListItem';

const PrivacyEdit: React.FC = () => {
  return (
    <div className={tabsClasses.wrapper}>
      <TabHeader label={'Phone number'} />
      <div className={'border'} />
      <Scroll>
        <div className={tabsClasses.titleContainer}>
          <Typography color={'tertiary'} size={'m'} weight={700}>
            Who can see my phone number?
          </Typography>
        </div>
        <RadioGroup
          value={'2'}
          options={[
            { value: '1', label: 'Everybody' },
            { value: '2', label: 'My Contacts' },
            { value: '0', label: 'Nobody' },
          ]}
        />
        <div className={'border'} />
        <div className={tabsClasses.titleContainer}>
          <Typography color={'tertiary'} size={'m'} weight={700}>
            Exceptions
          </Typography>
        </div>
        <div className={'list'}>
          <ListItem
            iconId={'addPerson'}
            title={'Always Allow'}
            subtitle={'Add Users'}
            slotProps={{ subtitleProps: { color: 'tertiary' } }}
          />
          <ListItem
            iconId={'blocked'}
            title={'Never Allow'}
            subtitle={'Add Users'}
            slotProps={{ subtitleProps: { color: 'tertiary' } }}
          />
        </div>
      </Scroll>
    </div>
  );
};

export default PrivacyEdit;
