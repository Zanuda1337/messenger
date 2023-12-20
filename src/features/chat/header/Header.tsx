import React from 'react';
import classes from './Header.module.scss';
import clsx from 'clsx';
import CustomIconButton from 'src/components/customIconButton/CustomIconButton';
import AnimatedIcon from 'src/components/animatedIcon/AnimatedIcon';
import CustomLink from 'src/components/customLink/CustomLink';
import CustomAvatar, {
  AvatarProps,
} from 'src/components/customAvatar/CustomAvatar';
import Typography from 'src/components/typography/Typography';
import CustomMenu from 'src/components/customMenu/CustomMenu';
import SvgSelector from 'src/components/svgSelector/SvgSelector';
import { useDevice } from 'src/hooks';
import { useHistory } from 'src/providers/HistoryProvider';
import { useNavigate } from 'react-router-dom';

interface HeaderProps {
  onSelectModeOn: () => void;
  avatarProps: Omit<AvatarProps, 'size' | 'name'>;
  title: string;
  subtitle: string;
}

const Header: React.FC<HeaderProps> = ({
  onSelectModeOn,
  avatarProps,
  title,
  subtitle,
}) => {
  const { isMobileLayout } = useDevice();
  const { goBack } = useHistory();
  const navigate = useNavigate();
  const options = [
    {
      value: '1',
      label: 'Edit',
      icon: 'edit',
      onClick: () => {
        navigate('user/editForm');
      },
    },
    {
      value: '2',
      label: 'Select messages',
      icon: 'select',
      onClick: onSelectModeOn,
    },
    { value: '3', label: 'Mute', icon: 'mute' },
    {
      value: '4',
      label: 'Block user',
      icon: 'block',
      dividerAfter: true,
    },
    {
      value: '5',
      label: 'Delete chat',
      icon: 'delete',
      iconProps: { className: 'errorIcon' },
      labelClassName: 'text_color_error',
    },
  ];

  if (isMobileLayout) {
    options.unshift({
      value: '0',
      label: 'Search',
      icon: 'search2',
      onClick: () => {
        navigate('search');
      },
    });
  }
  return (
    <div className={clsx('header', classes.header)}>
      {isMobileLayout && (
        <CustomIconButton onClick={goBack}>
          <AnimatedIcon icon={'arrow'} />
        </CustomIconButton>
      )}
      <CustomLink to={'user'} className={classes.link}>
        <div className={classes.chatLabel}>
          <CustomAvatar {...avatarProps} name={title} />
          <div className={classes.textContainer}>
            <Typography weight={600}>{title}</Typography>
            <Typography color={'secondary'} size={'xs'}>
              {subtitle}
            </Typography>
          </div>
        </div>
      </CustomLink>

      <div
        style={{
          display: 'flex',
          gap: '10px',
          alignItems: 'center',
        }}
      >
        <CustomMenu
          closeOnClick
          mode={'click'}
          options={options}
          placement={'top-end'}
          offset={{ top: 12, right: 0 }}
        >
          <CustomIconButton>
            <SvgSelector id="more" className={classes.actionIcon} />
          </CustomIconButton>
        </CustomMenu>
        {!isMobileLayout && (
          <CustomIconButton
            onClick={() => {
              navigate('search');
            }}
          >
            <SvgSelector id="search2" className={classes.actionIcon} />
          </CustomIconButton>
        )}
      </div>
    </div>
  );
};

export default Header;
