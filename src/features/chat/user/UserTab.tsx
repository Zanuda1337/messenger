import React, { useMemo } from 'react';
import User from 'src/features/chat/user/User';
import { useAppSelector } from 'src/app/hooks';
import { useParams } from 'react-router-dom';

const UserTab: React.FC = () => {
  const params = useParams();
  const dialogues = useAppSelector((state) => state.dialogsReducer.dialogues);
  const chat = useMemo(
    () =>
      dialogues.find((dialogue) =>
        dialogue.members.some((member) => member._id === params.id)
      ),
    [dialogues]
  );
  return <User user={chat?.companion ?? null} />;
};

export default UserTab;
