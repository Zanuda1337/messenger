import React, { useState } from 'react';
import tabsClasses from 'src/features/tabs/Tabs.module.scss';
import TabHeader from 'src/components/tabHeader/TabHeader';
import ProfileEditForm, {
  ProfileFields,
} from 'src/components/forms/profileEditForm/ProfileEditForm';
import { useAppSelector, useBoundActions } from 'src/app/hooks';
import Scroll from 'src/components/scroll/Scroll';
import { appActions } from 'src/slices/app/app.slice';
import {
  useCheckUsernameMutation,
  useUpdateProfileMutation,
} from 'src/api/profileApi/profileApi';

const UserEdit: React.FC = () => {
  const user = useAppSelector((state) => state.app.user);
  const meta = useAppSelector((state) => state.app.meta);
  const boundActions = useBoundActions(appActions);
  const [updateProfile] = useUpdateProfileMutation();
  const [checkUsername, checkUsernameMeta] = useCheckUsernameMutation();

  const [isTaken, setTaken] = useState(false);

  const handleSubmit = async (
    data: ProfileFields,
    file: File | undefined
  ): Promise<void> => {
    const { photo, ...body } = data;
    if (user !== null) {
      boundActions.setUser({
        ...user,
        ...body,
        photos:
          photo !== undefined ? [...(user.photos ?? []), photo] : user.photos,
      });
    }
    const { user: newUser } = await updateProfile({
      ...body,
      photo: file,
    }).unwrap();
    boundActions.setUser(newUser);
  };

  const handleCheck = async (username: string): Promise<void> => {
    if (username.length <= 5) return;
    const { isTaken } = await checkUsername(username).unwrap();
    setTaken(isTaken);
  };

  return (
    <div className={tabsClasses.wrapper}>
      <TabHeader label={'Edit profile'} />
      <div className={'border'} />
      <Scroll>
        <ProfileEditForm
          user={user}
          initialValues={{
            photo: user?.photos?.at(-1),
            name: user?.name ?? '',
            bio: user?.bio ?? '',
            surname: user?.surname,
            username: user?.username ?? '',
          }}
          onSubmit={(data, originalFilename) => {
            void handleSubmit(data, originalFilename);
          }}
          fetching={meta.updating}
          onChangeUsername={(username) => {
            void handleCheck(username);
          }}
          usernameAvailable={!isTaken}
          usernameFetching={checkUsernameMeta.isLoading}
        />
      </Scroll>
    </div>
  );
};

export default UserEdit;
