import React, { useState } from 'react';
import Dialogue from 'src/features/tabs/dialogs/Dialogue';
import classes from './Dialogs.module.scss';
import Scroll from 'src/components/scroll/Scroll';
import { useNavigate, useParams } from 'react-router-dom';
import Logo from 'src/assets/images/logo.png';
import Typography from 'src/components/typography/Typography';
import CustomMenu from 'src/components/customMenu/CustomMenu';
import { useDevice, useTabs, useTheme } from 'src/hooks';
import CustomIconButton from 'src/components/customIconButton/CustomIconButton';
import AnimatedIcon from 'src/components/animatedIcon/AnimatedIcon';
import CustomSwitch from 'src/components/customSwitch/CustomSwitch';
import SearchField from 'src/components/searchField/SearchField';
import CustomDialogue from 'src/components/customDialogue/CustomDialogue';
import CustomDrawer from 'src/components/customDrawer/CustomDrawer';
import Swipeable from 'src/components/swipeable/Swipeable';

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
  const { isMobileLayout } = useDevice();

  const [menuOpen, setMenuOpen] = useState(false);
  const [logoutDialogOpen, setLogoutDialogOpen] = useState(false);
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [offset, setOffset] = useState(-320);
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [animation, setAnimation] = useState(false);

  const [focused, setFocused] = useState(false);
  const { navigateTab } = useTabs();
  const navigate = useNavigate();
  const { theme, toggleTheme } = useTheme();

  const handleCloseLogoutDialog = (): void => {
    setLogoutDialogOpen(false);
  };
  const handleLogout = (): void => {
    navigate('/auth');
    handleCloseLogoutDialog();
  };

  const handleMenuOpen = (): void => {
    setMenuOpen(true);
  };
  const handleMenuClose = (): void => {
    setMenuOpen(false);
  };

  const menuOptions = [
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
        <CustomSwitch
          size={'small'}
          checked={theme === 'dark'}
          onChange={toggleTheme}
        />
      ),
      onClick: toggleTheme,
    },
    {
      value: 'settings',
      label: 'Settings',
      icon: 'settings',
      onClick: () => {
        navigateTab('settings');
      },
    },
    {
      value: 'logout',
      label: 'Logout',
      icon: 'logout',
      onClick: () => {
        setLogoutDialogOpen(true);
      },
    },
  ];

  const drawerOptions = [
    {
      label: 'Saved Messages',
      icon: 'inventory',
    },
    { value: 'friends', label: 'Friends', icon: 'friends' },
    {
      label: 'Settings',
      icon: 'settings',
      onClick: () => {
        handleMenuClose();
        navigateTab('settings');
      },
    },
  ];
  const drawerBottomOptions = [
    {
      label: 'Logout',
      icon: 'logout',
      onClick: () => {
        setLogoutDialogOpen(true);
      },
    },
  ];

  // const defaultPosition = useMemo(
  //   () => ({ x: menuOpen ? 320 : 0, y: 0 }),
  //   [menuOpen]
  // );

  return (
    <div
      className={classes.wrapper}
      style={{
        marginLeft: `${(offset + 320) * 0.15}px`,
        transition: animation ? '300ms' : 'none',
      }}
    >
      <CustomDialogue
        content={'Are you sure you want to log out?'}
        open={logoutDialogOpen}
        slotProps={{ submit: { color: 'error', children: 'log out' } }}
        onSubmit={handleLogout}
        onClose={handleCloseLogoutDialog}
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
        {!isMobileLayout ? (
          <CustomMenu
            className={classes.menu}
            placement={'top-start'}
            offset={{ top: 20, left: -10 }}
            open={menuOpen}
            onClose={handleMenuClose}
            onOpen={handleMenuOpen}
            options={menuOptions}
          >
            <CustomIconButton>
              <AnimatedIcon icon={focused ? 'arrow' : 'burger'} />
            </CustomIconButton>
          </CustomMenu>
        ) : (
          <>
            <CustomIconButton onClick={handleMenuOpen}>
              <AnimatedIcon icon={focused ? 'arrow' : 'burger'} />
            </CustomIconButton>
            <Swipeable
              className={classes.wrapper}
              open={menuOpen}
              onOpen={handleMenuOpen}
              onClose={handleMenuClose}
              onDrag={(state) => {
                setOffset(state.x);
              }}
              onRelease={(state) => {
                setOffset(state.x);
                setAnimation(true);
              }}
              onAnimationEnd={() => {
                setAnimation(false);
              }}
              bounds={{ left: -320, right: 0 }}
              defaultPosition={{ x: -320, y: 0 }}
              openPosition={{ x: 0, y: 0 }}
            >
              <CustomDrawer
                // style={{ transform: `translateX(${offset}px)` }}
                open={menuOpen}
                onClose={handleMenuClose}
                options={drawerOptions}
                afterBorderOptions={drawerBottomOptions}
                shadow={offset > 0}
                keepMounted
              />
            </Swipeable>
          </>
        )}
        <SearchField
          onBlur={() => {
            setFocused(false);
          }}
          onFocus={() => {
            setFocused(true);
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

export default React.memo(Dialogs);
