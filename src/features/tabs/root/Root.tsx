import React, { useState } from 'react';
import classes from './Root.module.scss';
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
import { useAppSelector, useBoundActions } from 'src/app/hooks';
import { logoutAsync } from 'src/app/app.slice';
import { CSSTransition, SwitchTransition } from 'react-transition-group';
import Search from 'src/features/chat/search/Search';

const Dialogs: React.FC = () => {
  const boundActions = useBoundActions({ logoutAsync });
  const appStatus = useAppSelector((state) => state.app.status);
  const { isMobileLayout } = useDevice();

  const [menuOpen, setMenuOpen] = useState(false);
  const [logoutDialogOpen, setLogoutDialogOpen] = useState(false);
  const [offset, setOffset] = useState(-320);
  const [animation, setAnimation] = useState(false);

  const [focused, setFocused] = useState(false);
  const { navigateTab } = useTabs();
  const { theme, toggleTheme } = useTheme();

  const handleCloseLogoutDialog = (): void => {
    setLogoutDialogOpen(false);
  };
  const handleLogout = async (): Promise<void> => {
    await boundActions.logoutAsync();
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
      <div className={classes.container}>
        <SwitchTransition>
          <CSSTransition timeout={150} key={`${focused}`} classNames={'zoom'}>
            <div className={'zoom'}>{!focused ? <Dialogs /> : <Search />}</div>
          </CSSTransition>
        </SwitchTransition>
      </div>
    </div>
  );
};

export default React.memo(Dialogs);
