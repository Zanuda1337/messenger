import { MenuItem, MenuList } from '@mui/material';
import React from 'react';
import classes from './CustomMenu.module.scss';
import SvgSelector from 'src/components/svgSelector/SvgSelector';
import clsx from 'clsx';
import CustomPopper, {
  CustomPopperProps,
} from 'src/components/customPopper/CustomPopper';

interface CustomMenuOption {
  value: string;
  label: string;
  icon?: string;
  endAdornment?: JSX.Element;
  onClick?: () => void;
}

interface CustomMenuProps extends Omit<CustomPopperProps, 'content'> {
  options: CustomMenuOption[];
}

const CustomMenu: React.FC<CustomMenuProps> = ({ options, ...props }) => {
  return (
    <CustomPopper
      {...props}
      content={
        <MenuList
          classes={{
            root: clsx(classes['menu-list']),
          }}
        >
          {options.map((option) => (
            <MenuItem
              classes={{ root: classes['item-root'] }}
              key={option.value}
              onClick={() => {
                if (option.onClick === undefined) return;
                option.onClick();
              }}
            >
              <div className={classes.container}>
                {option.icon !== undefined && (
                  <SvgSelector id={option.icon} className={classes.icon} />
                )}
                <div className={classes.label}>
                  {option.label}
                  {option.endAdornment}
                </div>
              </div>
            </MenuItem>
          ))}
        </MenuList>
      }
    >
      {props.children}
    </CustomPopper>
  );
};

export default CustomMenu;
