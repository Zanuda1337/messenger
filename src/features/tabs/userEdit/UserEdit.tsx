import React, { useState } from 'react';
import tabsClasses from 'src/features/tabs/Tabs.module.scss';
import TabHeader from 'src/components/tabHeader/TabHeader';
import ProfileEditForm, {
  ProfileFields,
} from 'src/components/forms/profileEditForm/ProfileEditForm';
import { useAppSelector, useBoundActions } from 'src/app/hooks';
import Scroll from 'src/components/scroll/Scroll';
import { updateProfileAsync } from 'src/app/app.slice';
import { profileApi } from 'src/api/profileApi/profileApi';
import { dataUrlToFile } from 'src/utils';

const UserEdit: React.FC = () => {
  const user = useAppSelector((state) => state.app.user);
  const meta = useAppSelector((state) => state.app.meta);
  const boundActions = useBoundActions({ updateProfileAsync });

  const [isTaken, setTaken] = useState(false);
  const [checking, setChecking] = useState(false);

  const handleSubmit = (
    data: ProfileFields,
    originalFilename: string
  ): void => {
    const { photo, ...body } = data;
    void boundActions.updateProfileAsync({
      ...body,
      photo:
        photo !== undefined
          ? dataUrlToFile(photo, originalFilename)
          : undefined,
    });
  };

  const handleCheck = async (username: string): Promise<void> => {
    console.log(username);
    setChecking(true);
    const { data } = await profileApi.checkUsername(username);
    setChecking(false);
    setTaken(data.isTaken);
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
          onSubmit={handleSubmit}
          fetching={meta.updating}
          onChangeUsername={(username) => {
            void handleCheck(username);
          }}
          usernameAvailable={!isTaken}
          usernameFetching={checking}
        />
      </Scroll>
    </div>
  );
};

export default UserEdit;
