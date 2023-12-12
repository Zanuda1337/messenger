import React from 'react';
import tabsClasses from 'src/features/tabs/Tabs.module.scss';
import TabHeader from 'src/components/tabHeader/TabHeader';
import Scroll from 'src/components/scroll/Scroll';
import Typography from 'src/components/typography/Typography';
import RadioGroup from 'src/components/radioGroup/RadioGroup';

const Language: React.FC = () => {
  return (
    <div className={tabsClasses.wrapper}>
      <TabHeader label={'Language'} />
      <div className={'border'} />
      <Scroll>
        <div className={tabsClasses.titleContainer}>
          <Typography color={'tertiary'} size={'m'} weight={700}>
            Interface language
          </Typography>
        </div>
        <RadioGroup
          value={'en'}
          options={[
            { value: 'ru', label: 'Русский', subtitle: 'Russian' },
            { value: 'en', label: 'English', subtitle: 'English' },
          ]}
        />
      </Scroll>
    </div>
  );
};

export default Language;
