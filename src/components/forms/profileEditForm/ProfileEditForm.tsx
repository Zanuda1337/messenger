import React from 'react';
import classes from 'src/features/chat/user/User.module.scss';
import CustomAvatar from 'src/components/customAvatar/CustomAvatar';
import Typography from 'src/components/typography/Typography';
import CustomTextField from 'src/components/customTextField/CustomTextField';
import { User } from 'src/app/app.types';
import { clsx } from 'clsx';
import tabsClasses from 'src/features/tabs/Tabs.module.scss';
import { Controller, useForm } from 'react-hook-form';
import { Form } from 'src/features/auth/Auth.types';
import { required, userNameRule } from 'src/utils/validation';
import SvgSelector from 'src/components/svgSelector/SvgSelector';
import CustomIconButton from 'src/components/customIconButton/CustomIconButton';

export interface ProfileFields {
  name: string;
  surname?: string;
  bio?: string;
  username: string;
}
interface ProfileEditFormProps extends Form<ProfileFields> {
  user?: User | null;
}

const ProfileEditForm: React.FC<ProfileEditFormProps> = ({
  user,
  initialValues,
  onSubmit,
}) => {
  const {
    control,
    handleSubmit,
    formState: { isDirty, isValid },
  } = useForm({
    mode: 'all',
    defaultValues: initialValues,
  });
  return (
    <>
      <div
        className={clsx('floatingButton', {
          hidden: !isDirty || !isValid,
        })}
      >
        <CustomIconButton
          disableProgressOnHover
          size={'large'}
          color={'primary'}
          onClick={() => {
            handleSubmit(onSubmit);
          }}
        >
          <SvgSelector id={'check'} className={'iconButton'} />
        </CustomIconButton>
      </div>
      <div className={classes.info}>
        <CustomAvatar name={clsx(user?.name, user?.surname)} size={'large'} />
      </div>
      <div className={classes.container}>
        <Controller
          name={'name'}
          control={control}
          rules={{ required: required('First name') }}
          render={({ fieldState: { error }, field }) => (
            <CustomTextField
              label={error?.message ?? 'First name *'}
              fullWidth
              maxLength={64}
              hideMaxLength
              {...field}
              error={error !== undefined}
            />
          )}
        />
        <Controller
          name={'surname'}
          control={control}
          render={({ fieldState: { error }, field }) => (
            <CustomTextField
              label={error?.message ?? 'Last name'}
              fullWidth
              maxLength={64}
              hideMaxLength
              {...field}
              error={error !== undefined}
            />
          )}
        />
        <Controller
          name={'bio'}
          control={control}
          render={({ fieldState: { error }, field }) => (
            <CustomTextField
              label={error?.message ?? 'Bio'}
              fullWidth
              multiline
              maxLength={70}
              {...field}
              error={error !== undefined}
            />
          )}
        />
      </div>
      <div className={'border'} />
      <div className={tabsClasses.titleContainer}>
        <Typography color={'tertiary'} size={'m'} weight={700}>
          Username
        </Typography>
      </div>
      <div className={classes.container}>
        <Controller
          name={'username'}
          control={control}
          rules={{
            required: required('Username'),
            minLength: {
              value: 5,
              message: 'Username must have at least 5 characters',
            },
            maxLength: {
              value: 34,
              message: "Username can't exceed 32 characters",
            },
            validate: {
              symbols: userNameRule,
            },
          }}
          render={({ fieldState: { error }, field }) => (
            <CustomTextField
              label={error?.message ?? 'Username *'}
              fullWidth
              multiline
              {...field}
              error={error !== undefined}
            />
          )}
        />
        <Typography style={{ lineHeight: 1.33 }} color={'secondary'}>
          You can choose a username on{' '}
          <Typography weight={800} el={'span'} color={'secondary'}>
            Cheburnet
          </Typography>
          . If you do, people will be able to find you by this username and
          contact you without needing your phone number.
        </Typography>
        <Typography style={{ lineHeight: 1.33 }} color={'secondary'}>
          You can use a-z, 0-9 and underscores. Minimum length is 5 characters.
        </Typography>
      </div>
    </>
  );
};

export default ProfileEditForm;
