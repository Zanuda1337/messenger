import React, { useEffect, useState } from 'react';
import Dialogue from 'src/features/dialogs/Dialogue';
import classes from './Dialogs.module.scss';
import Scroll from 'src/components/scroll/Scroll';
import { Switch, TextField } from '@mui/material';
import SvgSelector from 'src/components/svgSelector/SvgSelector';
import { useParams } from 'react-router-dom';
import Logo from 'src/assets/images/logo.png';
import Typography from 'src/components/typography/Typography';
import CustomMenu from 'src/components/customMenu/CustomMenu';
import { useThemeDetector } from 'src/hooks';
import clsx from 'clsx';
import CustomIconButton from 'src/components/customIconButton/CustomIconButton';
import BurgerArrowIcon from 'src/components/burgerArrowIcon/BurgerArrowIcon';

const dialogs = [
  {
    id: 1,
    message: {
      user: { id: 2, name: 'Поляк' },
      read: false,
      date: new Date(),
      text: 'Hello',
    },
    unreadCount: 3,
    title: 'Поляк',
    active: true,
    muted: false,
  },
  {
    id: 2,
    message: {
      user: { id: 2, name: 'Ваня' },
      read: true,
      date: new Date(),
      text: 'тут и верстка поменялась местами',
    },
    unreadCount: 0,
    title: 'Ваня',
    active: false,
    muted: false,
  },
  {
    id: 3,
    message: {
      user: { id: 2, name: 'Папа' },
      read: false,
      date: new Date(),
      text: 'Ок',
    },
    unreadCount: 7,
    title: 'Папа',
    active: false,
    muted: false,
  },
  {
    id: 4,
    message: {
      user: { id: 1, name: 'Соленый ебенок' },
      read: true,
      date: new Date(),
      text: 'Окс',
    },
    unreadCount: 0,
    title: 'Соленый ебенок',
    active: false,
    muted: false,
  },
  {
    id: 5,
    message: {
      user: { id: 1, name: 'Спидрид' },
      read: false,
      date: new Date(),
      text: 'Хахах',
    },
    unreadCount: 3,
    title: 'Спидрид',
    active: false,
    muted: false,
  },
  {
    id: 6,
    message: {
      user: { id: 2, name: 'Андрей Парыгин' },
      read: false,
      date: new Date(),
      text: 'Я передумал потом',
    },
    unreadCount: 1,
    title: 'Андрей Парыгин',
    active: false,
    muted: false,
  },
  {
    id: 7,
    message: {
      user: { id: 2, name: 'Лёва' },
      read: true,
      date: new Date(),
      text: 'но это не точно*',
    },
    unreadCount: 0,
    title: 'Лёва',
    active: false,
    muted: false,
  },
  {
    id: 8,
    message: {
      user: { id: 1, name: 'Сема' },
      read: false,
      date: new Date(),
      text: 'Так и знал что так скажешь',
    },
    unreadCount: 3,
    title: 'Сема',
    active: false,
    muted: false,
  },
  {
    id: 9,
    message: {
      user: { id: 2, name: 'Анна Калинина' },
      read: true,
      date: new Date(),
      text: 'Спасибо, и вам',
    },
    unreadCount: 0,
    title: 'Анна Калинина',
    active: false,
    muted: false,
  },
  {
    id: 10,
    message: {
      user: { id: 2, name: 'Ирина Мочалова' },
      read: false,
      date: new Date(),
      text: 'Иван, добрый день! Меня зовут Ирина, я HR в компании ELMA',
    },
    unreadCount: 1,
    title: 'Ирина Мочалова',
    active: false,
    muted: true,
  },
  {
    id: 11,
    message: {
      user: { id: 2, name: 'Поляк' },
      read: true,
      date: new Date(),
      text: 'Hello',
    },
    unreadCount: 0,
    title: 'Поляк',
    active: false,
    muted: false,
  },
  {
    id: 12,
    message: {
      user: { id: 2, name: 'Поляк' },
      read: true,
      date: new Date(),
      text: 'Hello',
    },
    unreadCount: 0,
    title: 'Поляк',
    active: false,
    muted: false,
  },
  {
    id: 13,
    message: {
      user: { id: 2, name: 'Поляк' },
      read: true,
      date: new Date(),
      text: 'Hello',
    },
    unreadCount: 0,
    title: 'Поляк',
    active: false,
    muted: false,
  },
];

const Dialogs: React.FC = () => {
  const params = useParams();

  const [menuOpen, setMenuOpen] = useState(false);

  const localStorageTheme = window.localStorage.getItem('theme');
  const systemTheme = useThemeDetector().isDark ? 'dark' : 'light';
  const [theme, setTheme] = useState(localStorageTheme ?? systemTheme);
  const [test, setTest] = useState(false);

  const [isDarkThemeButton, setIsDarkThemeButton] = useState(theme === 'dark');
  const [animation, setAnimation] = useState(false);

  const handleToggleTheme = (): void => {
    const newTheme = theme === 'dark' ? 'light' : 'dark';
    setIsDarkThemeButton(!isDarkThemeButton);
    setAnimation(true);
    setTimeout(() => {
      setAnimation(false);
      setTheme(newTheme);
    }, 800);
    setTimeout(() => {
      document.documentElement.setAttribute('color-scheme', newTheme);
      window.localStorage.setItem('theme', newTheme);
    }, 400);
  };
  useEffect(() => {
    setTheme(theme);
    document.documentElement.setAttribute('color-scheme', theme);
    window.localStorage.setItem('theme', theme);
  }, []);
  return (
    <div className={classes.wrapper}>
      <div
        className={clsx({
          dark: isDarkThemeButton,
          'theme-animation': animation,
        })}
      />
      <div className={'header'}>
        <div className={classes.dialogsHeader}>
          <img src={Logo} alt="logo" style={{ height: 20 }} />
          <Typography size={'xxxl'} weight={600} transform={'uppercase'}>
            Cheburnet
          </Typography>
        </div>
      </div>
      <div className={classes.searchContainer}>
        <CustomMenu
          className={classes.menu}
          placement={'top-start'}
          offset={{ top: 20, left: -10 }}
          open={menuOpen}
          onClose={() => {
            setMenuOpen(false);
          }}
          onOpen={() => {
            setMenuOpen(true);
          }}
          options={[
            {
              value: 'saved',
              label: 'Saved Messages',
              icon: 'inventory',
            },
            { value: 'friends', label: 'Friends', icon: 'friends' },
            {
              value: 'theme',
              label: 'Night mode',
              icon: 'dark_mode',
              endAdornment: (
                <Switch
                  size={'small'}
                  disabled={animation}
                  checked={isDarkThemeButton}
                  onChange={handleToggleTheme}
                />
              ),
              onClick: () => {
                if (!animation) handleToggleTheme();
              },
            },
            { value: 'settings', label: 'Settings', icon: 'settings' },
            { value: 'logout', label: 'Logout', icon: 'logout' },
          ]}
        >
          <CustomIconButton>
            <BurgerArrowIcon arrow={test} />
          </CustomIconButton>
        </CustomMenu>
        <TextField
          fullWidth
          classes={{ root: classes.search }}
          placeholder={'Search'}
          variant={'outlined'}
          onFocus={() => {
            setTest(true);
          }}
          onBlur={() => {
            setTest(false);
          }}
          InputProps={{
            startAdornment: (
              <SvgSelector id={'search'} className={classes.searchIcon} />
            ),
          }}
        />
      </div>
      <Scroll>
        {dialogs.map((dialogue) => (
          <Dialogue
            key={dialogue.id}
            id={dialogue.id}
            message={dialogue.message}
            active={params['*'] !== undefined && +params['*'] === dialogue.id}
            unreadCount={dialogue.unreadCount}
            title={dialogue.title}
            muted={dialogue.muted}
          />
        ))}
      </Scroll>
    </div>
  );
};

export default Dialogs;
