import React, { useMemo } from 'react';
import { useLocation, useOutlet, Location } from 'react-router-dom';
import CustomIconButton from 'src/components/customIconButton/CustomIconButton';
import SvgSelector from 'src/components/svgSelector/SvgSelector';
import CustomLink from 'src/components/customLink/CustomLink';
import SearchField from 'src/components/searchField/SearchField';
import { clsx } from 'clsx';
import classes from './RightSide.module.scss';
import AnimatedIcon from 'src/components/animatedIcon/AnimatedIcon';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import Typography from 'src/components/typography/Typography';
import { useHistory } from 'src/providers/HistoryProvider';

interface RouteHeader {
  name: string;
  label: string | JSX.Element;
  icon: string;
  endAdornment?: JSX.Element;
}

export const getRoutesHeaders = (location: Location<any>): RouteHeader[] => [
  {
    name: 'edit',
    label: 'Edit',
    icon: 'arrow',
  },
  {
    name: 'user',
    label: 'User info',
    icon: 'cross',
    endAdornment: (
      <CustomLink to={`${location.pathname}/edit`}>
        <CustomIconButton>
          <SvgSelector id={'edit'} className={'iconButton'} />
        </CustomIconButton>
      </CustomLink>
    ),
  },
  {
    name: 'search',
    label: <SearchField />,
    icon: 'cross',
    endAdornment: (
      <CustomIconButton>
        <SvgSelector id={'calendar'} className={'iconButton'} />
      </CustomIconButton>
    ),
  },
];

const RightSide: React.FC = () => {
  const location = useLocation();
  const currentOutlet = useOutlet();
  const { goBack } = useHistory();
  const key = location.pathname.split('/').slice(2).join('/');
  const routesHeaders = useMemo(() => getRoutesHeaders(location), [location]);
  const route = routesHeaders.find((r) => location.pathname.includes(r.name));
  return (
    <>
      <div className={clsx('header', classes.header)}>
        <div className={classes.row}>
          <CustomIconButton onClick={goBack}>
            <AnimatedIcon
              icon={(route?.icon as 'cross' | 'arrow' | undefined) ?? 'cross'}
              color={'secondary'}
            />
          </CustomIconButton>
        </div>
        <TransitionGroup className={classes.container}>
          <CSSTransition timeout={150} key={key} classNames={'header-anim'}>
            <div className={'header-anim'}>
              <div className={classes.titleContainer}>
                {typeof route?.label === 'string' ? (
                  <Typography size={'xl'} weight={700}>
                    {route?.label ?? ''}
                  </Typography>
                ) : (
                  route?.label
                )}
                {route?.endAdornment}
              </div>
            </div>
          </CSSTransition>
        </TransitionGroup>
      </div>
      <div className={classes.body}>
        <TransitionGroup component={React.Fragment}>
          <CSSTransition
            timeout={150}
            key={key === '' ? 'user' : key}
            classNames={'zoom'}
          >
            <div className={'zoom'}>{currentOutlet}</div>
          </CSSTransition>
        </TransitionGroup>
      </div>
    </>
  );
};

export default RightSide;
