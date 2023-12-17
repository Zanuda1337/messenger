import React, { useState } from 'react';
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
import ImageCropper from 'src/components/imageCropper/ImageCropper';

export interface ProfileFields {
  name: string;
  surname?: string;
  bio?: string;
  username: string;
  photo?: string;
}
interface ProfileEditFormProps extends Omit<Form<ProfileFields>, 'onSubmit'> {
  user?: User | null;
  usernameFetching: boolean;
  usernameAvailable: boolean;
  onChangeUsername: (username: string) => void;
  onSubmit: (data: ProfileFields, originalFilename: string) => void;
}

const ProfileEditForm: React.FC<ProfileEditFormProps> = ({
  user,
  initialValues,
  onSubmit,
  fetching,
  onChangeUsername,
  usernameAvailable,
  usernameFetching,
}) => {
  const [open, setOpen] = useState(false);
  const [imageUrl, setImageUrl] = useState<{
    src: string;
    originalFilename: string;
  } | null>(null);
  const {
    control,
    reset,
    handleSubmit,
    formState: { isValid, isDirty },
  } = useForm({
    mode: 'all',
    values: initialValues,
    reValidateMode: 'onSubmit',
  });

  const handleOpenCrop = (): void => {
    setOpen(true);
  };
  const handleCloseCrop = (): void => {
    setOpen(false);
  };

  const handleSelectFile = (e: React.ChangeEvent<HTMLInputElement>): void => {
    const file = e.currentTarget.files?.[0];
    if (file === undefined) return;
    const reader = new FileReader();
    reader.addEventListener('load', () => {
      const imageUrl = reader.result?.toString() ?? '';
      setImageUrl({ src: imageUrl, originalFilename: file.name });
      handleOpenCrop();
    });
    reader.readAsDataURL(file);
    e.currentTarget.value = '';
  };

  const usernameError = !usernameAvailable && !usernameFetching;
  const hidden = !isDirty || !isValid || usernameError;

  return (
    <>
      <div
        className={clsx('floatingButton', {
          hidden,
        })}
      >
        <CustomIconButton
          disableProgressOnHover
          size={'large'}
          color={'primary'}
          fetching={fetching}
          onClick={(event) => {
            if (usernameFetching) return;
            void handleSubmit((data) => {
              onSubmit(data, imageUrl?.originalFilename ?? 'unknown.jpg');
            })(event);
            reset(
              {},
              {
                keepValues: true,
              }
            );
          }}
        >
          <SvgSelector id={'check'} className={'iconButton white'} />
        </CustomIconButton>
      </div>
      <Controller
        control={control}
        name={'photo'}
        render={({ field: { value, onChange } }) => (
          <>
            <div className={classes.info}>
              <label className={classes.avatarButton}>
                <CustomAvatar
                  name={clsx(user?.name, user?.surname)}
                  size={'large'}
                  src={value}
                />
                <input
                  onChange={handleSelectFile}
                  type={'file'}
                  accept={'image/png, image/jpeg'}
                  style={{ display: 'none' }}
                />
                <SvgSelector id={'photo'} className={classes.icon} />
              </label>
            </div>
            <ImageCropper
              open={open}
              onClose={handleCloseCrop}
              imageUrl={imageUrl?.src ?? ''}
              onSubmit={(file) => {
                onChange(file);
              }}
            />
          </>
        )}
      />
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
          render={({ fieldState: { error, isDirty }, field }) => (
            <CustomTextField
              label={
                error?.message ??
                (usernameError
                  ? 'This username is already taken'
                  : 'Username *')
              }
              fullWidth
              multiline
              {...field}
              onChange={(event) => {
                const username = event.target.value.trim();
                field.onChange(username);
                onChangeUsername(username);
              }}
              error={error !== undefined || usernameError}
              color={
                isDirty && usernameAvailable && !usernameFetching
                  ? 'success'
                  : undefined
              }
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
