import React, { useState } from 'react';
import tabsClasses from 'src/features/tabs/Tabs.module.scss';
import TabHeader from 'src/components/tabHeader/TabHeader';
import RadioGroup from 'src/components/radioGroup/RadioGroup';
import CustomSlider from 'src/components/customSlider/CustomSlider';
import Typography from 'src/components/typography/Typography';
import ListItem from 'src/components/listItem/ListItem';
import Scroll from 'src/components/scroll/Scroll';

const GeneralSettings: React.FC = () => {
  const [theme, setTheme] = useState('dark');
  const [slider, setSlider] = useState(16);
  return (
    <div className={tabsClasses.wrapper}>
      <TabHeader label={'General'} />
      <div className={'border'} />
      <Scroll>
        <div className={tabsClasses.titleContainer}>
          <Typography color={'tertiary'} size={'m'} weight={700}>
            Settings
          </Typography>
        </div>
        <div className={'list'}>
          <CustomSlider
            value={slider}
            label={'Message Text Size'}
            min={12}
            max={20}
            onChange={(event, value) => {
              setSlider(value as number);
            }}
          />
          <ListItem title={'Chat Wallpaper'} iconId={'placeholder'} />
        </div>
        <div className={'border'} />
        <div className={tabsClasses.titleContainer}>
          <Typography color={'tertiary'} size={'m'} weight={700}>
            Theme
          </Typography>
        </div>
        <RadioGroup
          value={theme}
          options={[
            { value: 'light', label: 'Light' },
            { value: 'dark', label: 'Dark' },
            { value: 'system', label: 'System' },
          ]}
          onChange={(value) => {
            setTheme(value);
          }}
        />
        <div className={'border'} />
        <div className={tabsClasses.titleContainer}>
          <Typography color={'tertiary'} size={'m'} weight={700}>
            Time Format
          </Typography>
        </div>
        <RadioGroup
          value={'24'}
          options={[
            { value: '12', label: '12-hour' },
            { value: '24', label: '24-hour' },
          ]}
          onChange={(value) => {
            setTheme(value);
          }}
        />
      </Scroll>
    </div>
  );
};

export default GeneralSettings;
