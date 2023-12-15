import React from 'react';
import classes from './Auth.module.scss';
import CustomTextField from 'src/components/customTextField/CustomTextField';
import CustomButton from 'src/components/customButton/CustomButton';
import { Form } from './Auth.types';
import ListItem from 'src/components/listItem/ListItem';
import CustomIconButton from 'src/components/customIconButton/CustomIconButton';
import SvgSelector from 'src/components/svgSelector/SvgSelector';
import { Controller, useForm } from 'react-hook-form';

export interface LoginFields {
  email: string;
  password: string;
}

interface LoginFormProps extends Form<LoginFields> {
  onCancel: () => void;
}

const LoginForm: React.FC<LoginFormProps> = ({
  onSubmit,
  onCancel,
  initialValues,
  fetching,
}) => {
  const { control, handleSubmit, getValues } = useForm({
    defaultValues: initialValues,
    mode: 'all',
  });
  return (
    <form className={classes.form}>
      <div className={classes.column}>
        <ListItem
          slots={{ icon: <></> }}
          title={'Email'}
          subtitle={getValues('email')}
          slotProps={{
            titleProps: { color: 'tertiary', size: 'xs' },
            subtitleProps: {
              size: 'm',
              style: {
                maxWidth: 260,
                overflow: 'hidden',
                textOverflow: 'ellipsis',
                lineHeight: 1.25,
              },
            },
          }}
          onClick={onCancel}
          endAdornment={
            <CustomIconButton onClick={onCancel}>
              <SvgSelector id={'edit'} className={'iconButton'} />
            </CustomIconButton>
          }
        />
        <Controller
          name={'password'}
          control={control}
          rules={{ required: 'Password is required' }}
          render={({ fieldState: { error }, field }) => (
            <CustomTextField
              label={error?.message ?? 'Password'}
              fullWidth
              error={error !== undefined}
              {...field}
            />
          )}
        />
        <CustomButton
          fullWidth
          className={classes.smallButton}
          color={'text-tertiary'}
        >
          Forget password?
        </CustomButton>
        <CustomButton
          fetching={fetching}
          fullWidth
          variant={'contained'}
          size={'large'}
          onClick={(event) => {
            void handleSubmit(onSubmit)(event);
          }}
        >
          Login
        </CustomButton>
      </div>
    </form>
  );
};

export default LoginForm;
