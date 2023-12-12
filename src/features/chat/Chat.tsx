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
import { useLocation, useNavigate, useOutlet } from 'react-router-dom';
import { useCopyToClipboard, useDevice } from 'src/hooks';
import {
  CSSTransition,
  SwitchTransition,
  TransitionGroup,
} from 'react-transition-group';
import Typography from 'src/components/typography/Typography';
import SvgSelector from 'src/components/svgSelector/SvgSelector';
import { routes } from 'src/router/Router';
import CustomIconButton from 'src/components/customIconButton/CustomIconButton';
import AnimatedIcon from 'src/components/animatedIcon/AnimatedIcon';
import CustomMenu from 'src/components/customMenu/CustomMenu';
import CustomLink from 'src/components/customLink/CustomLink';
import { useHistory } from 'src/providers/HistoryProvider';
import CustomContextMenu from 'src/components/customContextMenu/CustomContextMenu';
import CustomDialogue from 'src/components/customDialogue/CustomDialogue';
import CustomButton from 'src/components/customButton/CustomButton';
import { toggleArray } from 'src/utils';
import { isBefore } from 'date-fns';
import SelectToolbar from 'src/components/chatInput/SelectToolbar';

// todo Временный тип, заменить
interface IMessage {
  id: number;
  text: string;
  date: Date;
  isOwn: boolean;
  sent: boolean;
  read: boolean;
  user: {
    id: number;
    firstName: string;
  };
}
const messages: IMessage[] = [
  {
    id: 1,
    text: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Amet cum, debitis eligendi error ipsum.',
    date: new Date(2023, 11, 26, 7, 46),
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
    text: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Amet cum, debitis eligendi error ipsum iste labore laudantium.',
    date: new Date(2023, 11, 26, 7, 47),
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
    text: 'Velit vero? Minima, molestias, nostrum? Consequatur fugit harum nisi quibusdam.',
    date: new Date(2023, 11, 26, 7, 48),
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
    text: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Amet cum, debitis eligendi error ipsum iste labore laudantium, neque quo reiciendis, velit vero?',
    date: new Date(2023, 11, 26, 7, 49),
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
    text: 'Consequatur fugit harum nisi quibusdam.',
    date: new Date(2023, 11, 26, 7, 50),
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
    text: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Amet cum, debitis eligendi error ipsum iste labore laudantium, neque quo reiciendis, velit vero? Minima, molestias, nostrum? Consequatur fugit harum nisi quibusdam.',
    date: new Date(2023, 11, 26, 7, 51),
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
    text: 'Minima, molestias, nostrum? Consequatur fugit harum nisi quibusdam.',
    date: new Date(2023, 11, 26, 7, 52),
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
    text: 'Amet cum, debitis eligendi error ipsum iste labore laudantium, neque quo reiciendis.',
    date: new Date(2023, 11, 26, 7, 53),
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
    text: 'Я хочу умереть',
    date: new Date(2023, 11, 26, 7, 54),
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
    text: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Amet cum.',
    date: new Date(2023, 11, 26, 7, 55),
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
    text: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Minima, molestias, nostrum? Consequatur fugit harum nisi quibusdam.',
    date: new Date(2023, 11, 26, 7, 56),
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
    text: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit.',
    date: new Date(2023, 11, 26, 7, 57),
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
  const currentOutlet = useOutlet();
  const location = useLocation();
  const navigate = useNavigate();
  const copyToClipboard = useCopyToClipboard();
  const { nodeRef } =
    routes.find((route) => route.path === location.pathname) ?? {};
  const { width, isMobileLayout } = useDevice();
  const { goBack } = useHistory();

  const [selectMessageMode, setSelectMessageMode] = useState(false);
  const [scrollTransition, setScrollTransition] = useState(false);
  const [selectedMessages, setSelectedMessages] = useState<number[]>([]);
  const [messagesData, setMessagesData] = useState(messages);
  const [message, setMessage] = useState('');
  const [deleteMessageDialogOpen, setDeleteMessageDialogOpen] = useState(false);
  const structuredMessages = useMemo(
    () => structMessages(messagesData),
    [messagesData]
  );

  const [contextMenu, setContextMenu] = React.useState<{
    message: IMessage;
    mouseX: number;
    mouseY: number;
  } | null>(null);

  const handleContextMenu = (
    event: React.MouseEvent,
    message: IMessage
  ): void => {
    event.preventDefault();
    setContextMenu(
      contextMenu === null
        ? {
            message,
            mouseX: event.clientX,
            mouseY: event.clientY,
          }
        : null
    );
  };

  const handleClose = (): void => {
    setContextMenu(null);
  };

  const handleChangeMessage = (text: string): void => {
    setMessage(text);
  };

  const handleSubmit = (): void => {
    const newMessage = {
      id: (messagesData.at(-1)?.id ?? -1) + 1,
      text: message,
      date: new Date(),
      isOwn: true,
      sent: true,
      read: true,
      user: {
        id: 1,
        firstName: 'Zanuda',
      },
    };
    setMessagesData([...messagesData, newMessage]);
    setMessage('');
  };

  const handleDeleteMessageDialogOpen = (): void => {
    setDeleteMessageDialogOpen(true);
  };
  const handleDeleteMessageDialogClose = (): void => {
    setDeleteMessageDialogOpen(false);
  };

  const handleSelectMessage = (
    e: React.MouseEvent<HTMLDivElement, MouseEvent>,
    messageId: number
  ): void => {
    if (e.shiftKey && !selectedMessages.includes(messageId)) {
      e.preventDefault();
      const lastSelectedMessageId = selectedMessages.at(-1);
      const lastSelectedMessage = messages.find(
        (m) => m.id === lastSelectedMessageId
      );
      const currentMessage = messages.find((m) => m.id === messageId);
      if (lastSelectedMessage === undefined || currentMessage === undefined) {
        return;
      }
      const newSelectedMessages = [...selectedMessages];
      newSelectedMessages.push(messageId);
      for (
        let i = messages.indexOf(currentMessage);
        isBefore(currentMessage.date, lastSelectedMessage.date)
          ? i < messages.indexOf(lastSelectedMessage)
          : i >= messages.indexOf(lastSelectedMessage);
        isBefore(currentMessage.date, lastSelectedMessage.date) ? i++ : i--
      ) {
        const itemId = messages[i].id;
        if (!newSelectedMessages.includes(itemId)) {
          newSelectedMessages.push(itemId);
        }
      }
      setSelectedMessages(newSelectedMessages);
      return;
    }
    const newSelectedMessages = toggleArray(selectedMessages, messageId);
    setSelectedMessages(newSelectedMessages);
    if (newSelectedMessages.length === 0) {
      handleSelectModeOff();
    }
  };

  const handleSelectModeOn = (): void => {
    setSelectMessageMode(true);
  };
  const handleSelectModeOff = (): void => {
    setSelectMessageMode(false);
    setSelectedMessages([]);
  };

  const options = [
    {
      value: '1',
      label: 'Edit',
      icon: 'edit',
      onClick: () => {
        navigate('user/edit');
      },
    },
    {
      value: '2',
      label: 'Select messages',
      icon: 'select',
      onClick: handleSelectModeOn,
    },
    { value: '3', label: 'Mute', icon: 'mute' },
    {
      value: '4',
      label: 'Block user',
      icon: 'block',
      dividerAfter: true,
    },
    {
      value: '5',
      label: 'Delete chat',
      icon: 'delete',
      iconProps: { className: 'errorIcon' },
      labelClassName: 'text_color_error',
    },
  ];

  if (isMobileLayout) {
    options.unshift({
      value: '0',
      label: 'Search',
      icon: 'search2',
      onClick: () => {
        navigate('search');
      },
    });
  }

  const contextMenuOptions = [
    {
      value: 'reply',
      label: 'Reply',
      icon: 'reply',
    },
    {
      value: 'edit',
      label: 'Edit',
      icon: 'edit',
    },
    {
      value: 'copy',
      label: 'Copy Text',
      icon: 'copy',
      onClick: () => {
        if (contextMenu === null) return;
        copyToClipboard(contextMenu.message.text);
      },
    },
    {
      value: 'pin',
      label: 'Pin',
      icon: 'pin',
    },
    {
      value: 'forward',
      label: 'Forward',
      icon: 'reply',
      iconProps: { style: { transform: 'scaleX(-1)' } },
    },
    {
      value: 'select',
      label: 'Select',
      icon: 'select',
      onClick: () => {
        handleSelectModeOn();
        if (contextMenu === null) return;
        setSelectedMessages([contextMenu?.message.id]);
      },
    },
    {
      value: 'delete',
      label: 'Delete',
      icon: 'delete',
      iconProps: { className: 'errorIcon' },
      labelClassName: 'text_color_error',
      onClick: handleDeleteMessageDialogOpen,
    },
  ];

  useEffect(() => {
    const current = scrollRef.current;
    if (current === null) return;
    current.scrollToBottom();
  }, [scrollRef, messagesData]);

  useEffect(() => {
    setScrollTransition(true);
  }, []);

  return (
    <>
      <div
        className={classes.wrapper}
        tabIndex={0}
        onKeyDown={(e) => {
          if (selectMessageMode) e.stopPropagation();
          if (e.key === 'Escape') {
            handleSelectModeOff();
          }
        }}
      >
        <CustomDialogue
          title={'Delete message'}
          content={'Are you sure you want to delete this message?'}
          open={deleteMessageDialogOpen}
          classes={{ buttons: classes.dialogButtons }}
          slots={{
            submit: (
              <>
                <CustomButton color={'error'}>delete just for me</CustomButton>
                <CustomButton color={'error'}>
                  delete for me and Поляк
                </CustomButton>
              </>
            ),
          }}
          onClose={handleDeleteMessageDialogClose}
        />
        <div className={clsx('header', classes.header)}>
          {width <= 850 && (
            <CustomIconButton onClick={goBack}>
              <AnimatedIcon icon={'arrow'} />
            </CustomIconButton>
          )}
          <CustomLink to={'user'} className={classes.link}>
            <div className={classes.chatLabel}>
              <CustomAvatar name={'Поляк'} />
              <div className={classes.textContainer}>
                <Typography weight={600}>Поляк </Typography>
                <Typography color={'secondary'} size={'xs'}>
                  last seen 5 min ago
                </Typography>
              </div>
            </div>
          </CustomLink>

          <div
            style={{
              display: 'flex',
              gap: '10px',
              alignItems: 'center',
            }}
          >
            <CustomMenu
              closeOnClick
              mode={'click'}
              options={options}
              placement={'top-end'}
              offset={{ top: 12, right: 0 }}
            >
              <CustomIconButton>
                <SvgSelector id="more" className={classes.actionIcon} />
              </CustomIconButton>
            </CustomMenu>
            {width > 850 && (
              <CustomIconButton
                onClick={() => {
                  navigate('search');
                }}
              >
                <SvgSelector id="search2" className={classes.actionIcon} />
              </CustomIconButton>
            )}
          </div>
        </div>
        <div
          className={classes.messages}
          onContextMenu={(e) => {
            if (selectMessageMode) return;
            e.preventDefault();
          }}
        >
          <CustomContextMenu
            open={contextMenu !== null}
            onClose={handleClose}
            anchorReference="anchorPosition"
            closeOnClick
            anchorPosition={
              contextMenu !== null
                ? { top: contextMenu.mouseY, left: contextMenu.mouseX }
                : undefined
            }
            transformOrigin={{
              horizontal: 'left',
              vertical:
                (contextMenu?.mouseY ?? 0) > window.innerHeight / 2
                  ? 'bottom'
                  : 'top',
            }}
            options={contextMenuOptions}
          />
          <Scroll ref={scrollRef} smoothScroll={scrollTransition}>
            {structuredMessages.map((messagesBlock, i) => (
              <div
                key={i}
                className={clsx(classes.container, classes.blockWrapper, {
                  [classes.selectMode]: selectMessageMode,
                })}
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
                    <CSSTransition
                      key={message.id}
                      classNames={{
                        enter: classes.enter,
                        enterActive: classes.enterActive,
                        exit: classes.exit,
                        exitActive: classes.exitActive,
                      }}
                      timeout={200}
                    >
                      <Message
                        date={message.date}
                        isOwn={message.user.id === 1}
                        showName={j === 0 && message.user.id !== 1}
                        last={j === messagesBlock.length - 1}
                        read={message.read}
                        sent={message.sent}
                        user={message.user}
                        text={message.text}
                        selectMode={selectMessageMode}
                        isSelected={selectedMessages.includes(message.id)}
                        isActive={
                          message.id === (contextMenu?.message.id ?? -1)
                        }
                        onClick={(e) => {
                          if (!selectMessageMode) return;
                          handleSelectMessage(e, message.id);
                        }}
                        onContextMenu={(e) => {
                          if (selectMessageMode) return;
                          handleContextMenu(e, message);
                        }}
                      />
                    </CSSTransition>
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
          <SwitchTransition>
            <CSSTransition
              key={selectMessageMode ? '1' : '2'}
              timeout={300}
              classNames={{
                enter: classes.tightEnter,
                enterActive: classes.tightEnterActive,
                exit: classes.tightExit,
                exitActive: classes.tightExitActive,
              }}
            >
              <div
                className={clsx({
                  [classes.tight]: selectMessageMode && width > 750,
                })}
              >
                {!selectMessageMode ? (
                  <ChatInput
                    value={message}
                    onChange={handleChangeMessage}
                    onSubmit={handleSubmit}
                  />
                ) : (
                  <SelectToolbar
                    selectedCount={selectedMessages.length}
                    onDelete={handleDeleteMessageDialogOpen}
                    onCancel={handleSelectModeOff}
                  />
                )}
              </div>
            </CSSTransition>
          </SwitchTransition>
        </div>
      </div>
      <SwitchTransition>
        <CSSTransition
          unmountOnExit
          mountOnEnter
          nodeRef={nodeRef as Ref<HTMLElement | undefined> | undefined}
          timeout={300}
          classNames={'right-block'}
          in={location.pathname.split('/').length > 2}
          key={location.pathname.split('/').slice(0, 3).length ?? ''}
        >
          {location.pathname.split('/').length > 2 ? (
            <div
              className={'right-block'}
              ref={nodeRef as RefObject<HTMLDivElement>}
            >
              {currentOutlet}
            </div>
          ) : (
            <></>
          )}
        </CSSTransition>
      </SwitchTransition>
    </>
  );
};

export default Chat;
