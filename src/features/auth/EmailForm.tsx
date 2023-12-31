import React from 'react';
import classes from './Auth.module.scss';
import CustomTextField from 'src/components/customTextField/CustomTextField';
import CustomButton from 'src/components/customButton/CustomButton';
import { Form } from 'src/features/auth/Auth.types';
import { Controller, useForm } from 'react-hook-form';

export interface EmailFields {
  email: string;
}

interface EmailFormProps extends Form<EmailFields> {}

const EmailForm: React.FC<EmailFormProps> = ({
  onSubmit,
  initialValues,
  fetching,
}: EmailFormProps): JSX.Element => {
  const { control, handleSubmit } = useForm<EmailFields>({
    defaultValues: initialValues,
    mode: 'all',
  });

  return (
    <form
      className={classes.form}
      onSubmit={(event) => {
        void handleSubmit(onSubmit)(event);
      }}
      noValidate
    >
      <Controller
        control={control}
        name={'email'}
        rules={{
          required: 'Email is required',
          validate: {
            hasCharsAfterAt: (value) =>
              /.+./.test(value) || 'Enter the email part before @',
            hasAtChar: (value) =>
              /.+@/.test(value) ||
              'The email address must contain the @ symbol',
            hasDotChar: (value) =>
              /.+@.+\..+/i.test(value) || 'Enter the email part after @',
          },
        }}
        render={({
          field: { onChange, onBlur, value },
          fieldState: { error },
        }) => (
          <CustomTextField
            autoFocus={value !== ''}
            label={error?.message ?? 'Email'}
            type="email"
            error={error !== undefined}
            value={value}
            fullWidth
            onChange={onChange}
            onBlur={onBlur}
          />
        )}
      />
      <div className={classes.submitWrapper}>
        <CustomButton
          fullWidth
          variant={'contained'}
          size={'large'}
          onClick={(event) => {
            void handleSubmit(onSubmit)(event);
          }}
          fetching={fetching}
        >
          Continue
        </CustomButton>
      </div>
    </form>
  );
};

export default EmailForm;
