import React from 'react';
import tabsClasses from 'src/features/tabs/Tabs.module.scss';
import TabHeader from 'src/components/tabHeader/TabHeader';
import ProfileEditForm from 'src/components/forms/profileEditForm/ProfileEditForm';
import { useAppSelector } from 'src/app/hooks';
import Scroll from 'src/components/scroll/Scroll';

const UserEdit: React.FC = () => {
  const user = useAppSelector((state) => state.app.user);
  return (
    <div className={tabsClasses.wrapper}>
      <TabHeader label={'Edit profile'} />
      <div className={'border'} />
      <Scroll>
        <ProfileEditForm
          user={user}
          initialValues={{
            name: user?.name ?? '',
            bio: '',
            surname: user?.surname,
            username: user?.username ?? '',
          }}
          onSubmit={() => {}}
        />
      </Scroll>
    </div>
  );
};

export default UserEdit;
