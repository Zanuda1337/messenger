import React from 'react';
import classes from '../Root.module.scss';
import Dialogue from 'src/features/tabs/root/dialogs/dialogue/Dialogue';
import { clsx } from 'clsx';
import Typography from 'src/components/typography/Typography';
import Scroll from 'src/components/scroll/Scroll';
import { format } from 'date-fns';

const Search: React.FC = () => {
  return (
    <Scroll>
      <div className={classes.wrapper}>
        <div className={classes.title}>
          <Typography color={'tertiary'} size={'m'} weight={700}>
            Contacts
          </Typography>
        </div>
        {searchResult.users.map((user) => (
          <Dialogue
            key={user.id}
            id={user.id}
            subtitle={'Last seen 27 minutes ago'}
            title={clsx(user.name, user.surname)}
            avatarProps={{ name: clsx(user.name, user.surname) }}
          />
        ))}
        <div className={classes.title}>
          <Typography color={'tertiary'} size={'m'} weight={700}>
            Channels
          </Typography>
        </div>
        {searchResult.channels.map((channel) => (
          <Dialogue
            key={channel.id}
            id={channel.id}
            subtitle={`${channel.members} subscribers`}
            title={channel.name}
            avatarProps={{ name: channel.name }}
            prefix={`@${channel.link},`}
          />
        ))}
        <div className={classes.title}>
          <Typography color={'tertiary'} size={'m'} weight={700}>
            Chats
          </Typography>
        </div>
        {searchResult.chats.map((chat) => (
          <Dialogue
            key={chat.id}
            id={chat.id}
            subtitle={`${chat.members} members`}
            title={chat.name}
            avatarProps={{ name: clsx(chat.name) }}
          />
        ))}
        <div className={classes.title}>
          <Typography color={'tertiary'} size={'m'} weight={700}>
            Messages
          </Typography>
        </div>
        {searchResult.messages.map((dialogue) => (
          <Dialogue
            key={dialogue.id}
            id={dialogue.id}
            subtitle={dialogue.message.text}
            title={dialogue.title}
            badgeProps={{
              value: dialogue.unreadCount,
              variant: dialogue.message.user.id === 1 ? 'dot' : 'standard',
              color: dialogue.muted ? 'pale' : 'primary',
            }}
            avatarProps={{ name: clsx(dialogue.message.user.name) }}
            date={format(dialogue.message.date, 'hh:mm')}
          />
        ))}
      </div>
    </Scroll>
  );
};

const searchResult = {
  users: [
    { id: '1', name: 'Поляк', surname: undefined },
    { id: '2', name: 'Ваня', surname: undefined },
  ],
  channels: [
    { id: '1', members: 1242, name: 'Влад Бумага', link: 'A4Vlad' },
    { id: '2', name: 'Казань', members: 1204012, link: 'kazan' },
  ],
  chats: [{ id: '4', members: 3, name: 'Заброшки' }],
  messages: [
    {
      id: '4',
      message: {
        user: { id: 1, name: 'Соленый ебенок' },
        read: true,
        date: new Date(),
        text: 'Окс',
      },
      unreadCount: 0,
      title: 'Соленый ебенок',
      active: false,
      muted: false,
    },
    {
      id: '5',
      message: {
        user: { id: 1, name: 'Спидрид' },
        read: false,
        date: new Date(),
        text: 'Хахах',
      },
      unreadCount: 3,
      title: 'Спидрид',
      active: false,
      muted: false,
    },
    {
      id: '6',
      message: {
        user: { id: 2, name: 'Андрей Парыгин' },
        read: false,
        date: new Date(),
        text: 'Я передумал потом',
      },
      unreadCount: 1,
      title: 'Андрей Парыгин',
      active: false,
      muted: false,
    },
  ],
};

export default Search;
