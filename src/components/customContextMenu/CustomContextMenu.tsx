import React from 'react';
import clsx from 'clsx';
import menuClasses from 'src/components/customMenu/CustomMenu.module.scss';
import classes from './CustomContextMenu.module.scss';
import { Menu, MenuItem, MenuProps } from '@mui/material';
import SvgSelector from 'src/components/svgSelector/SvgSelector';
import { CustomMenuOption } from '../customMenu/CustomMenu';

interface CustomContextMenuProps extends Omit<MenuProps, 'children'> {
  options: CustomMenuOption[];
  closeOnClick?: boolean;
  onClose: (
    e: React.MouseEvent<HTMLLIElement, MouseEvent>,
    reason: 'backdropClick' | 'escapeKeyDown' | 'optionClick'
  ) => void;
}

const CustomContextMenu: React.FC<CustomContextMenuProps> = ({
  options,
  closeOnClick = false,
  ...props
}) => {
  return (
    <Menu {...props} classes={{ root: classes.root }}>
      {options.map((option) => (
        <MenuItem
          classes={{ root: menuClasses['item-root'] }}
          key={option.value}
          onClick={(e) => {
            option.onClick?.();
            if (closeOnClick) {
              props.onClose?.(e, 'optionClick');
            }
          }}
        >
          <div className={menuClasses.container}>
            {option.icon !== undefined && (
              <SvgSelector
                id={option.icon}
                {...option.iconProps}
                className={clsx(menuClasses.icon, option.iconProps?.className)}
              />
            )}
            <div className={clsx(menuClasses.label, option.labelClassName)}>
              {option.label}
              {option.endAdornment}
            </div>
          </div>
        </MenuItem>
      ))}
    </Menu>
  );
};

export default CustomContextMenu;
