import { DrawerProps } from '@mui/material';
import React, { useEffect, useState } from 'react';
import ListItem from 'src/components/listItem/ListItem';
import classes from './CustomDrawer.module.scss';
import CustomAvatar from 'src/components/customAvatar/CustomAvatar';
import CustomIconButton from 'src/components/customIconButton/CustomIconButton';
import SvgSelector from '../svgSelector/SvgSelector';
import Typography from 'src/components/typography/Typography';
import { clsx } from 'clsx';
import { CSSTransition, SwitchTransition } from 'react-transition-group';
import { useTheme } from 'src/hooks';

interface Option {
  icon: string;
  label: string;
  onClick?: () => void;
}

interface CustomDrawerProps extends Omit<DrawerProps, 'anchor'> {
  options: Option[];
  afterBorderOptions: Option[];
  shadow: boolean;
}

const themeIcons = {
  dark: 'dark_mode',
  light: 'light_mode',
};

const CustomDrawer: React.FC<CustomDrawerProps> = ({
  options,
  afterBorderOptions,
  shadow,
  ...props
}) => {
  const [isProfilesShown, setProfilesShown] = useState(false);

  const { theme, toggleTheme } = useTheme();

  const toggleProfile = (): void => {
    setProfilesShown(!isProfilesShown);
  };

  const profiles = [{ username: 'Zanuda', name: 'Иван', surname: 'Pashkin' }];
  useEffect(() => {
    const root = document.documentElement;
    const listItemHeight = 60;
    const padding = 10;
    const borderWidth = 1;
    const height =
      listItemHeight * (profiles.length + 1) + padding * 2 + borderWidth;
    root.style.setProperty('--profiles-height', `${height}px`);
  }, [profiles]);

  return (
    // <Drawer anchor={'left'} {...props} classes={{ root: classes.root }}>
    <div
      className={clsx(classes.wrapper, { [classes.shadow]: shadow })}
      style={props.style}
    >
      <div className={classes.header}>
        <div className={classes.block}>
          <CustomAvatar name={'Иван Пашкин'} size={'medium'} />
          <CustomIconButton onClick={toggleTheme} disableProgressOnHover>
            <SwitchTransition>
              <CSSTransition
                timeout={200}
                classNames={{
                  enter: classes.themeEnter,
                  enterActive: classes.themeEnterActive,
                  exit: classes.themeExit,
                  exitActive: classes.themeExitActive,
                }}
                key={theme}
              >
                <SvgSelector id={themeIcons[theme]} className={'iconButton'} />
              </CSSTransition>
            </SwitchTransition>
          </CustomIconButton>
        </div>
        <div className={classes.block} onClick={toggleProfile}>
          <div className={classes.column}>
            <Typography weight={600} size={'m'}>
              Zanuda
            </Typography>
            <Typography color={'tertiary'}>dsnake456@gmail.com</Typography>
          </div>
          <CustomIconButton
            onClick={toggleProfile}
            size={'small'}
            className={classes.smallButton}
          >
            <SvgSelector
              id={'simpleArrowLeft'}
              className={clsx('iconButton', classes.arrowButton, {
                [classes.active]: isProfilesShown,
              })}
            />
          </CustomIconButton>
        </div>
      </div>
      <div className={classes.body}>
        <CSSTransition
          timeout={300}
          in={isProfilesShown}
          classNames={{
            enter: classes.enter,
            enterActive: classes.enterActive,
            exit: classes.exit,
            exitActive: classes.exitActive,
          }}
          unmountOnExit
        >
          <>
            <div className={clsx('list', classes.collapse)}>
              {profiles.map((profile) => (
                <ListItem
                  key={profile.username}
                  title={profile.username}
                  className={classes.avatarListItem}
                  classes={{ block: classes.block }}
                  slots={{
                    icon: (
                      <CustomAvatar
                        name={`${profile.name} ${profile.surname}`}
                      />
                    ),
                  }}
                />
              ))}
              <ListItem iconId={'add'} title={'Add Account'} />
            </div>
            <div className={'border'} />
          </>
        </CSSTransition>
        <div className={'list'}>
          {options.map((option) => (
            <ListItem
              key={option.label}
              iconId={option.icon}
              title={option.label}
              onClick={option.onClick}
            />
          ))}
        </div>
        <div className={'border'} />
        <div className={'list'}>
          {afterBorderOptions.map((option) => (
            <ListItem
              key={option.label}
              iconId={option.icon}
              title={option.label}
              onClick={option.onClick}
            />
          ))}
        </div>
      </div>
    </div>
    // </Drawer>
  );
};

export default CustomDrawer;
