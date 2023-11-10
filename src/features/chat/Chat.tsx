import React, {
  Ref,
  RefObject,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react';
import classes from './Chat.module.scss';
import ChatInput from 'src/components/chatInput/ChatInput';
import Message from './Message';
import { Scrollbars } from 'react-custom-scrollbars-2';
import Scroll from 'src/components/scroll/Scroll';
import CustomAvatar from 'src/components/customAvatar/CustomAvatar';
import clsx from 'clsx';
import { Link, useLocation, useNavigate, useOutlet } from 'react-router-dom';
import { useDevice, useKeydown } from 'src/hooks';
import {
  CSSTransition,
  SwitchTransition,
  TransitionGroup,
} from 'react-transition-group';
import { Collapse } from '@mui/material';
import Typography from 'src/components/typography/Typography';
import SvgSelector from 'src/components/svgSelector/SvgSelector';
import { routes } from 'src/router/Router';

const messages = [
  {
    id: 1,
    text: 'Hello!',
    date: new Date(),
    isOwn: true,
    sent: true,
    read: true,
    user: {
      id: 1,
      firstName: 'Zanuda',
    },
  },
  {
    id: 2,
    text: 'Пиздец потом буду нищей еще и бездомной',
    date: new Date(),
    isOwn: false,
    sent: true,
    read: true,
    user: {
      id: 2,
      firstName: 'Поляк',
    },
  },
  {
    id: 3,
    text: 'сук я верстал сообщения и мне надо было подставить че нибудь и только потом я понял как иронично это выглядит',
    date: new Date(),
    isOwn: true,
    sent: true,
    read: true,
    user: {
      id: 1,
      firstName: 'Zanuda',
    },
  },
  {
    id: 4,
    text: 'Hello!',
    date: new Date(),
    isOwn: true,
    sent: true,
    read: true,
    user: {
      id: 1,
      firstName: 'Zanuda',
    },
  },
  {
    id: 5,
    text: 'Пиздец потом буду нищей еще и бездомной',
    date: new Date(),
    isOwn: false,
    sent: true,
    read: true,
    user: {
      id: 2,
      firstName: 'Поляк',
    },
  },
  {
    id: 6,
    text: 'сук я верстал сообщения и мне надо было подставить че нибудь и только потом я понял как иронично это выглядит',
    date: new Date(),
    isOwn: true,
    sent: true,
    read: true,
    user: {
      id: 1,
      firstName: 'Zanuda',
    },
  },
  {
    id: 7,
    text: 'Hello!',
    date: new Date(),
    isOwn: true,
    sent: true,
    read: true,
    user: {
      id: 1,
      firstName: 'Zanuda',
    },
  },
  {
    id: 8,
    text: 'Пиздец потом буду нищей еще и бездомной',
    date: new Date(),
    isOwn: false,
    sent: true,
    read: true,
    user: {
      id: 2,
      firstName: 'Поляк',
    },
  },
  {
    id: 9,
    text: 'сук я верстал сообщения и мне надо было подставить че нибудь и только потом я понял как иронично это выглядит',
    date: new Date(),
    isOwn: true,
    sent: true,
    read: true,
    user: {
      id: 1,
      firstName: 'Zanuda',
    },
  },
  {
    id: 10,
    text: 'Hello!',
    date: new Date(),
    isOwn: true,
    sent: true,
    read: true,
    user: {
      id: 1,
      firstName: 'Zanuda',
    },
  },
  {
    id: 11,
    text: 'Пиздец потом буду нищей еще и бездомной',
    date: new Date(),
    isOwn: false,
    sent: true,
    read: true,
    user: {
      id: 2,
      firstName: 'Поляк',
    },
  },
  {
    id: 12,
    text: 'сук я верстал сообщения и мне надо было подставить че нибудь и только потом я понял как иронично это выглядит',
    date: new Date(),
    isOwn: true,
    sent: true,
    read: true,
    user: {
      id: 1,
      firstName: 'Zanuda',
    },
  },
  {
    id: 13,
    text: 'Hello!',
    date: new Date(),
    isOwn: true,
    sent: true,
    read: true,
    user: {
      id: 1,
      firstName: 'Zanuda',
    },
  },
  {
    id: 14,
    text:
      'Блин хочу попробовать приготовить рисовые шарики \n' +
      'Мне очень нравится вкус ролл и я бы хотела приблизиться к нему хоть немного самостоятельно\n' +
      'Почти всё что идёт в роллы можно найти дома кроме нори, но оно мне не очень нравится поэтому попробую исключить',
    date: new Date(),
    isOwn: false,
    sent: true,
    read: true,
    user: {
      id: 2,
      firstName: 'Поляк',
    },
  },
  {
    id: 15,
    text: 'К тому же я люблю экспериментировать с едой и методом проб создавать свои идеальные рецепты блюд',
    date: new Date(),
    isOwn: false,
    sent: true,
    read: true,
    user: {
      id: 2,
      firstName: 'Поляк',
    },
  },
  {
    id: 16,
    text: 'Ну лучше Цезаря я пока ничего не создавала',
    date: new Date(),
    isOwn: false,
    sent: true,
    read: true,
    user: {
      id: 2,
      firstName: 'Поляк',
    },
  },
  {
    id: 17,
    text: 'Роллы вкусные благодаря нори',
    date: new Date(),
    isOwn: true,
    sent: true,
    read: true,
    user: {
      id: 1,
      firstName: 'Zanuda',
    },
  },
  {
    id: 18,
    text: 'Мне стыдно но т.к. мне негде беспалевно парить я иду какать и парить одновременно',
    date: new Date(),
    isOwn: true,
    sent: true,
    read: true,
    user: {
      id: 1,
      firstName: 'Zanuda',
    },
  },
];

const structMessages = (messages: any[]): any[][] => {
  const blocks: any[][] = [];
  let block: any[] = [];
  messages.forEach((message, i) => {
    const prevMessage = messages[i - 1];
    if (prevMessage === undefined || prevMessage.user.id === message.user.id) {
      block.push(message);
    } else {
      blocks.push(block);
      block = [];
      block.push(message);
    }
  });
  blocks.push(block);
  return blocks;
};

const Chat: React.FC = () => {
  const scrollRef = useRef<Scrollbars>(null);
  const { width } = useDevice();
  const [messagesData, setMessagesData] = useState(messages);
  const [message, setMessage] = useState('');
  const structuredMessages = useMemo(
    () => structMessages(messagesData),
    [messagesData]
  );
  const location = useLocation();

  const handleChangeMessage = (text: string): void => {
    setMessage(text);
  };

  const handleSubmit = (): void => {
    const newMessage = {
      id: (messagesData.at(-1)?.id ?? -1) + 1,
      text: message,
      date: new Date(),
      isOwn: true,
      sent: false,
      read: false,
      user: {
        id: 1,
        firstName: 'Zanuda',
      },
    };
    setMessagesData([...messagesData, newMessage]);
    setMessage('');
  };
  const currentOutlet = useOutlet();
  const { nodeRef } =
    routes.find((route) => route.path === location.pathname) ?? {};

  useEffect(() => {
    const current = scrollRef.current;
    // eslint-disable-next-line @typescript-eslint/strict-boolean-expressions
    if (!current) return;
    current.scrollToBottom();
  }, [scrollRef, messagesData]);

  const navigate = useNavigate();
  useKeydown('Escape', () => {
    navigate('/');
  });

  return (
    <>
      <div className={classes.wrapper}>
        <Link to={'/1/user'} className={clsx('header', classes.header)}>
          <div className={classes.chatLabel}>
            <CustomAvatar name={'Поляк'} />
            <div className={classes.textContainer}>
              <Typography weight={600}>Поляк </Typography>
              <Typography color={'secondary'} size={'xs'}>
                last seen 5 min ago
              </Typography>
            </div>
          </div>
          <div
            style={{
              display: 'flex',
              gap: '20px',
              alignItems: 'center',
            }}
          >
            {width > 850 && (
              <SvgSelector
                id="settings"
                style={{
                  fill: 'gray',
                  width: '26px',
                }}
              />
            )}
            {width > 850 && <CustomAvatar name={'Zanuda'} size="tiny" />}
          </div>
        </Link>
        <div className={classes.messages}>
          <Scroll ref={scrollRef}>
            {structuredMessages.map((messagesBlock, i) => (
              <div
                key={i}
                className={clsx(classes.container, classes.blockWrapper)}
              >
                <div
                  style={{
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'flex-end',
                  }}
                  className={classes.avatarContainer}
                >
                  {messagesBlock[0].user.id !== 1 && (
                    <CustomAvatar
                      name={messagesBlock[0].user.firstName}
                      className={classes.avatar}
                    />
                  )}
                </div>
                <TransitionGroup key={i} className={classes.block}>
                  {messagesBlock.map((message, j) => (
                    <Collapse key={message.id}>
                      <Message
                        date={message.date}
                        isOwn={message.user.id === 1}
                        showName={j === 0 && message.user.id !== 1}
                        last={j === messagesBlock.length - 1}
                        read={message.read}
                        sent={message.sent}
                        user={message.user}
                        text={message.text}
                      />
                    </Collapse>
                  ))}
                </TransitionGroup>
              </div>
            ))}
          </Scroll>
        </div>
        <div
          className={clsx(classes.container, {
            [classes.mobile]: width <= 750,
          })}
        >
          <ChatInput
            value={message}
            onChange={handleChangeMessage}
            onSubmit={handleSubmit}
          />
        </div>
      </div>
      <SwitchTransition>
        <CSSTransition
          unmountOnExit
          nodeRef={nodeRef as Ref<HTMLElement | undefined> | undefined}
          timeout={300}
          classNames={'right-block'}
          // in={location.pathname === '/1/user'}
          in={location.pathname === '/1/user'}
          key={location.pathname}
        >
          {location.pathname === '/1/user' ? (
            <div
              className={'right-block'}
              ref={nodeRef as RefObject<HTMLDivElement>}
            >
              {currentOutlet}
            </div>
          ) : (
            <div />
          )}
        </CSSTransition>
      </SwitchTransition>
    </>
  );
};

export default Chat;
