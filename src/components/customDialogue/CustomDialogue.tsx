/* eslint-disable react/no-children-prop */
import React, { MouseEventHandler } from 'react';
import styles from './CustomDialogue.module.scss';
import { Dialog, DialogProps } from '@mui/material';
import Typography, {
  TypographyProps,
} from 'src/components/typography/Typography';
import clsx from 'clsx';
import CustomButton, {
  CustomButtonProps,
} from 'src/components/customButton/CustomButton';

export interface CustomDialogueProps
  extends Omit<DialogProps, 'slots' | 'slotProps' | 'classes' | 'className'> {
  title?: string;
  content: string;
  slots?: {
    title?: JSX.Element;
    content?: JSX.Element;
    cancel?: JSX.Element;
    submit?: JSX.Element;
  };
  slotProps?: {
    title?: TypographyProps;
    content?: TypographyProps;
    cancel?: CustomButtonProps;
    submit?: CustomButtonProps;
  };
  classes?: {
    dialog?: string;
    buttons: string;
  };
  onSubmit?: () => void;
}

const CustomDialogue: React.FC<CustomDialogueProps> = ({
  title = 'Cheburnet',
  content,
  slots,
  slotProps,
  classes,
  onSubmit,
  ...props
}) => {
  return (
    <Dialog
      {...props}
      classes={{ root: clsx(styles.root, classes?.dialog) }}
    >
      {slots?.title ?? (
        <Typography
          size={'xl'}
          weight={700}
          children={title}
          {...slotProps?.title}
        />
      )}
      <div>
        {slots?.content ?? (
          <Typography size={'m'} children={content} {...slotProps?.content} />
        )}
      </div>
      <div className={clsx(styles.buttons, classes?.buttons)}>
        {slots?.cancel ?? (
          <CustomButton
            onClick={props.onClose as MouseEventHandler<HTMLButtonElement>}
            children={'Cancel'}
            {...slotProps?.cancel}
          />
        )}
        {slots?.submit ?? (
          <CustomButton
            autoFocus
            onClick={onSubmit}
            children={'Submit'}
            variant={'contained'}
            {...slotProps?.submit}
          />
        )}
      </div>
    </Dialog>
  );
};

export default CustomDialogue;
