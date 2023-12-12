import React from 'react';
import Typography from 'src/components/typography/Typography';
import classes from './Search.module.scss';

const Search: React.FC = () => {
  return (
    <div className={classes.container}>
      <Typography color={'secondary'} weight={600} size={'m'}>
        Search for messages
      </Typography>
    </div>
  );
};

export default Search;
