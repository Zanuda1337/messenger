import React, { useState } from 'react';
import classes from 'src/features/chat/user/User.module.scss';
import CustomAvatar from 'src/components/customAvatar/CustomAvatar';
import Typography from 'src/components/typography/Typography';
import ListItem from 'src/components/listItem/ListItem';
import CustomTextField from 'src/components/customTextField/CustomTextField';
import CustomDialogue from 'src/components/customDialogue/CustomDialogue';
import CustomCheckbox from 'src/components/customCheckbox/CustomCheckbox';

interface EditProps {
  user?: undefined;
}

const EditForm: React.FC<EditProps> = ({  }) => {
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);

  const handleOpenDialog = (): void => {
    setDeleteDialogOpen(true);
  };

  const handleCloseDialog = (): void => {
    setDeleteDialogOpen(false);
  };

  const handleDeleteContact = (): void => {
    handleCloseDialog();
  };

  return (
    <>
      <div className={classes.info}>
        <CustomAvatar name={'Поляк'} size={'large'} />
        <Typography weight={700} size={'l'}>
          Поляк
        </Typography>
      </div>
      <div className={classes.container}>
        <CustomTextField
          label={'First name'}
          fullWidth
          defaultValue={'Поляк'}
        />
        <CustomTextField label={'Last name'} fullWidth />
      </div>
      <div className={'list'}>
        <ListItem
          title={'Notifications'}
          subtitle={'Enabled'}
          slots={{
            icon: <CustomCheckbox checked={true} />,
          }}
          slotProps={{ subtitleProps: { color: 'tertiary' } }}
        />
      </div>
      <div className={'border'} />
      <div className={'list'}>
        <ListItem
          title={'Delete contact'}
          iconId={'delete'}
          slotProps={{
            titleProps: { color: 'error' },
            icon: { className: 'errorIcon' },
          }}
          onClick={handleOpenDialog}
        />
      </div>
      <CustomDialogue
        open={deleteDialogOpen}
        onClose={handleCloseDialog}
        onSubmit={handleDeleteContact}
        content={'Are you sure you want delete this contact?'}
        slotProps={{ submit: { color: 'error', children: 'Delete contact' } }}
      />
    </>
  );
};

export default EditForm;
