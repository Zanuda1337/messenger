import React from 'react';
import classes from './SearchField.module.scss';
import CustomTextField from 'src/components/customTextField/CustomTextField';
import SvgSelector from 'src/components/svgSelector/SvgSelector';

interface SearchFieldProps {
  value?: string;
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onFocus?: (event: React.FocusEvent<HTMLInputElement>) => void;
  onBlur?: (event: React.FocusEvent<HTMLInputElement>) => void;
}

const SearchField: React.FC<SearchFieldProps> = ({
  value,
  onBlur,
  onFocus,
  onChange,
}) => (
  <CustomTextField
    fullWidth
    classes={{ root: classes.search }}
    value={value}
    placeholder={'Search'}
    onFocus={onFocus}
    onBlur={onBlur}
    InputProps={{
      startAdornment: (
        <SvgSelector id={'search'} className={classes.searchIcon} />
      ),
    }}
    onChange={onChange}
  />
);

export default SearchField;
