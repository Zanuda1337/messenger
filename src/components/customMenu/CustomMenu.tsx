import { MenuItem, MenuList } from '@mui/material';
import React, { useEffect, useState } from 'react';
import classes from './CustomMenu.module.scss';
import SvgSelector, {
  SvgSelectorProps,
} from 'src/components/svgSelector/SvgSelector';
import clsx from 'clsx';
import CustomPopper, {
  CustomPopperProps,
} from 'src/components/customPopper/CustomPopper';

export interface CustomMenuOption {
  value: string;
  label: string;
  icon?: string;
  iconProps?: Omit<SvgSelectorProps, 'id'>;
  endAdornment?: JSX.Element;
  dividerAfter?: boolean;
  labelClassName?: string;
  onClick?: () => void;
}

interface CustomMenuProps extends Partial<Omit<CustomPopperProps, 'content'>> {
  options: CustomMenuOption[];
  children: JSX.Element;
  closeOnClick?: boolean;
}

const CustomMenu: React.FC<CustomMenuProps> = ({
  options,
  onClose,
  onOpen,
  open,
  closeOnClick = false,
  ...props
}) => {
  const [isOpen, setIsOpen] = useState(open ?? false);
  const handleOpen = (): void => {
    setIsOpen(true);
    onOpen?.();
  };
  const handleClose = (): void => {
    setIsOpen(false);
    onClose?.();
  };

  useEffect(() => {
    if (open === undefined) return;
    setIsOpen(open);
  }, []);

  return (
    <CustomPopper
      onClose={handleClose}
      onOpen={handleOpen}
      open={isOpen}
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
                option.onClick?.();
                if (!closeOnClick) return;
                handleClose();
              }}
            >
              <div className={classes.container}>
                {option.icon !== undefined && (
                  <SvgSelector
                    id={option.icon}
                    {...option.iconProps}
                    className={clsx(classes.icon, option.iconProps?.className)}
                  />
                )}
                <div className={clsx(classes.label, option.labelClassName)}>
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
