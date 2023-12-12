import React from 'react';
import classes from './Auth.module.scss';
import ListItem from 'src/components/listItem/ListItem';
import CustomIconButton from 'src/components/customIconButton/CustomIconButton';
import SvgSelector from 'src/components/svgSelector/SvgSelector';
import CustomTextField from 'src/components/customTextField/CustomTextField';
import CustomButton from 'src/components/customButton/CustomButton';
import { Form } from './Auth.types';
import { Controller, useForm } from 'react-hook-form';

export interface RegistrationFields {
  username: string;
  password: string;
  confirmPassword: string;
  email: string;
  rememberMe: boolean;
}

interface RegistrationFormProps extends Form<RegistrationFields> {
  onCancel: () => void;
}

const RegistrationForm: React.FC<RegistrationFormProps> = ({
  onSubmit,
  onCancel,
  initialValues,
  fetching,
}) => {
  const { handleSubmit, control, getValues } = useForm({
    mode: 'all',
    defaultValues: initialValues,
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
          name={'username'}
          control={control}
          rules={{ required: 'Username is required' }}
          render={({ fieldState: { error }, field }) => (
            <CustomTextField
              label={error?.message ?? 'Username'}
              fullWidth
              error={error !== undefined}
              {...field}
            />
          )}
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
        <Controller
          name={'confirmPassword'}
          control={control}
          rules={{ required: 'Password is required' }}
          render={({ fieldState: { error }, field }) => (
            <CustomTextField
              label={error?.message ?? 'Confirm Password'}
              fullWidth
              error={error !== undefined}
              {...field}
            />
          )}
        />
        <div className={classes.submitWrapper}>
          <CustomButton
            fetching={fetching}
            fullWidth
            variant={'contained'}
            size={'large'}
            onClick={(event) => {
              void handleSubmit(onSubmit)(event);
            }}
          >
            Create account
          </CustomButton>
        </div>
      </div>
    </form>
  );
};

export default RegistrationForm;
