import React from 'react';
import Dialogue from 'src/features/tabs/root/dialogs/dialogue/Dialogue';
import Scroll from 'src/components/scroll/Scroll';
import { useParams } from 'react-router-dom';
import { clsx } from 'clsx';
import { format } from 'date-fns';
import { IDialogue } from 'src/slices/dialogs/dialogs.types';
import { useIsCurrentUser } from 'src/hooks';

interface DialogsProps {
  dialogues: IDialogue[];
}
const Dialogs: React.FC<DialogsProps> = ({ dialogues }) => {
  const params = useParams();
  const isCurrentUser = useIsCurrentUser();

  return (
    <Scroll>
      {dialogues.map((dialogue) => (
        <Dialogue
          key={dialogue._id}
          id={dialogue.companion._id}
          subtitle={dialogue.messages.at(-1)?.text ?? ''}
          active={
            params.id !== undefined && params.id === dialogue.companion._id
          }
          title={clsx(dialogue.companion.name, dialogue.companion.surname)}
          // titleIcon={dialogue.muted ? 'mute' : undefined}
          // badge={!dialogue.message.read}
          // badgeProps={{
          //   value: dialogue.unreadCount,
          //   variant: dialogue.message.user.id === 1 ? 'dot' : 'standard',
          //   color: dialogue.muted ? 'pale' : 'primary',
          // }}
          avatarProps={{
            name: clsx(dialogue.companion.name, dialogue.companion.surname),
            src: dialogue.companion.photos?.at(-1),
          }}
          date={
            dialogue.messages.at(-1)?.createdAt !== undefined
              ? format(
                  new Date(dialogue.messages.at(-1)?.createdAt ?? ''),
                  'hh:mm'
                )
              : ''
          }
          prefix={
            isCurrentUser(dialogue.messages.at(-1)?.creator._id)
              ? 'you:'
              : undefined
          }
        />
      ))}
    </Scroll>
  );
};

export default Dialogs;

// const dialogs = [
//   {
//     id: '1',
//     message: {
//       user: { id: 2, name: 'Поляк' },
//       read: false,
//       date: new Date(),
//       text: 'Hello',
//     },
//     unreadCount: 3,
//     title: 'Поляк',
//     active: true,
//     muted: false,
//   },
//   {
//     id: '2',
//     message: {
//       user: { id: 2, name: 'Ваня' },
//       read: true,
//       date: new Date(),
//       text: 'тут и верстка поменялась местами',
//     },
//     unreadCount: 0,
//     title: 'Ваня',
//     active: false,
//     muted: false,
//   },
//   {
//     id: '3',
//     message: {
//       user: { id: 2, name: 'Папа' },
//       read: false,
//       date: new Date(),
//       text: 'Ок',
//     },
//     unreadCount: 7,
//     title: 'Папа',
//     active: false,
//     muted: false,
//   },
//   {
//     id: '4',
//     message: {
//       user: { id: 1, name: 'Соленый ебенок' },
//       read: true,
//       date: new Date(),
//       text: 'Окс',
//     },
//     unreadCount: 0,
//     title: 'Соленый ебенок',
//     active: false,
//     muted: false,
//   },
//   {
//     id: '5',
//     message: {
//       user: { id: 1, name: 'Спидрид' },
//       read: false,
//       date: new Date(),
//       text: 'Хахах',
//     },
//     unreadCount: 3,
//     title: 'Спидрид',
//     active: false,
//     muted: false,
//   },
//   {
//     id: '6',
//     message: {
//       user: { id: 2, name: 'Андрей Парыгин' },
//       read: false,
//       date: new Date(),
//       text: 'Я передумал потом',
//     },
//     unreadCount: 1,
//     title: 'Андрей Парыгин',
//     active: false,
//     muted: false,
//   },
//   {
//     id: '7',
//     message: {
//       user: { id: 2, name: 'Лёва' },
//       read: true,
//       date: new Date(),
//       text: 'но это не точно*',
//     },
//     unreadCount: 0,
//     title: 'Лёва',
//     active: false,
//     muted: false,
//   },
//   {
//     id: '8',
//     message: {
//       user: { id: 1, name: 'Сема' },
//       read: false,
//       date: new Date(),
//       text: 'Так и знал что так скажешь',
//     },
//     unreadCount: 3,
//     title: 'Сема',
//     active: false,
//     muted: false,
//   },
//   {
//     id: '9',
//     message: {
//       user: { id: 2, name: 'Анна Калинина' },
//       read: true,
//       date: new Date(),
//       text: 'Спасибо, и вам',
//     },
//     unreadCount: 0,
//     title: 'Анна Калинина',
//     active: false,
//     muted: false,
//   },
//   {
//     id: '10',
//     message: {
//       user: { id: 2, name: 'Ирина Мочалова' },
//       read: false,
//       date: new Date(),
//       text: 'Иван, добрый день! Меня зовут Ирина, я HR в компании ELMA',
//     },
//     unreadCount: 1,
//     title: 'Ирина Мочалова',
//     active: false,
//     muted: true,
//   },
//   {
//     id: '11',
//     message: {
//       user: { id: 2, name: 'Поляк' },
//       read: true,
//       date: new Date(),
//       text: 'Hello',
//     },
//     unreadCount: 0,
//     title: 'Поляк',
//     active: false,
//     muted: false,
//   },
//   {
//     id: '12',
//     message: {
//       user: { id: 2, name: 'Поляк' },
//       read: true,
//       date: new Date(),
//       text: 'Hello',
//     },
//     unreadCount: 0,
//     title: 'Поляк',
//     active: false,
//     muted: false,
//   },
//   {
//     id: '13',
//     message: {
//       user: { id: 2, name: 'Поляк' },
//       read: true,
//       date: new Date(),
//       text: 'Hello',
//     },
//     unreadCount: 0,
//     title: 'Поляк',
//     active: false,
//     muted: false,
//   },
// ];
