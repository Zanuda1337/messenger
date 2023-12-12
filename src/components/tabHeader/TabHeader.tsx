import React from 'react';
import classes from './TabHeader.module.scss';
import CustomIconButton from 'src/components/customIconButton/CustomIconButton';
import AnimatedIcon from 'src/components/animatedIcon/AnimatedIcon';
import Typography from 'src/components/typography/Typography';
import clsx from 'clsx';
import { useHistory } from 'src/providers/HistoryProvider';

interface TabHeaderProps {
  label: string;
  endAdornment?: JSX.Element;
}

const TabHeader: React.FC<TabHeaderProps> = ({ label, endAdornment }) => {
  const { goBack } = useHistory();
  return (
    <div className={clsx('header', classes.header)}>
      <div className={classes.row}>
        <CustomIconButton onClick={goBack}>
          <AnimatedIcon icon={'arrow'} color={'secondary'} />
        </CustomIconButton>
      </div>
      <div className={classes.container}>
        <div className={classes.titleContainer}>
          <Typography size={'xl'} weight={700}>
            {label}
          </Typography>
          {endAdornment}
        </div>
      </div>
    </div>
  );
};

export default TabHeader;
