import React, { useEffect, useMemo, useRef, useState } from 'react';
import classes from './Chat.module.scss';
import { useCopyToClipboard } from 'src/hooks';
import CustomContextMenu from 'src/components/customContextMenu/CustomContextMenu';
import CustomDialogue from 'src/components/customDialogue/CustomDialogue';
import CustomButton from 'src/components/customButton/CustomButton';
import { toggleArray } from 'src/utils';
import { isBefore } from 'date-fns';
import Header from 'src/features/chat/header/Header';
import DrawerContainer from 'src/features/chat/drawerContainer/DrawerContainer';
import Footer from 'src/features/chat/footer/Footer';
import MessagesList from 'src/features/chat/messagesList/MessagesList';
import { useParams } from 'react-router-dom';
import { useAppSelector, useBoundActions } from 'src/app/hooks';
import {
  createDialogueAsync,
  createMessageAsync,
  fetchChatAsync,
} from 'src/slices/dialogs/dialogs.slice';
import { IMessage } from 'src/slices/dialogs/dialogs.types';
import { clsx } from 'clsx';
import Scrollbars from 'react-custom-scrollbars-2';

const Chat: React.FC = () => {
  const copyToClipboard = useCopyToClipboard();
  const params = useParams();
  const boundActions = useBoundActions({
    fetchChatAsync,
    createDialogueAsync,
    createMessageAsync,
  });
  const dialogues = useAppSelector((state) => state.dialogsReducer.dialogues);
  const user = useAppSelector((state) => state.app.user);
  const chat = useMemo(
    () =>
      dialogues.find((dialogue) =>
        dialogue.members.some((member) => member._id === params.id)
      ),
    [dialogues, params]
  );
  useEffect(() => {
    if (params.id === undefined) return;
    void boundActions.fetchChatAsync(params.id);
  }, [params]);

  const scrollRef = useRef<Scrollbars>(null);

  const [selectMessageMode, setSelectMessageMode] = useState(false);
  const [selectedMessages, setSelectedMessages] = useState<string[]>([]);
  const [message, setMessage] = useState('');
  const [deleteMessageDialogOpen, setDeleteMessageDialogOpen] = useState(false);
  const [smoothScroll, setSmoothScroll] = useState(false);

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

  const handleSubmit = async (): Promise<void> => {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    if (chat === undefined) return;
    if (user === null) return;
    let chatId = '';
    console.log(chat);
    if (chat._id === undefined) {
      const { dialogue } = await boundActions
        .createDialogueAsync(chat.companion._id)
        .unwrap();
      chatId = dialogue._id!;
    }
    void boundActions.createMessageAsync({
      message: {
        createdAt: new Date().toDateString(),
        text: message,
        creator: user,
        updatedAt: null,
      },
      dialogueId: chat._id ?? chatId,
    });
    setMessage('');
    scrollRef.current?.scrollToBottom();
    setSmoothScroll(true);
  };

  useEffect(() => {
    if (scrollRef.current === null) return;
    console.log('kek');
    scrollRef.current?.scrollToBottom();
  }, [scrollRef, chat]);

  const handleDeleteMessageDialogOpen = (): void => {
    setDeleteMessageDialogOpen(true);
  };
  const handleDeleteMessageDialogClose = (): void => {
    setDeleteMessageDialogOpen(false);
  };

  const handleSelectMessage = (
    e: React.MouseEvent<HTMLDivElement, MouseEvent>,
    messageId: string
  ): void => {
    if (chat === undefined) return;
    if (e.shiftKey && !selectedMessages.includes(messageId)) {
      e.preventDefault();
      const lastSelectedMessageId = selectedMessages.at(-1);
      const lastSelectedMessage = chat.messages.find(
        (m) => m._id === lastSelectedMessageId
      );
      const currentMessage = chat.messages.find((m) => m._id === messageId);
      if (lastSelectedMessage === undefined || currentMessage === undefined) {
        return;
      }
      const newSelectedMessages = [...selectedMessages];
      newSelectedMessages.push(messageId);
      for (
        let i = chat.messages.indexOf(currentMessage);
        isBefore(
          new Date(currentMessage.createdAt),
          new Date(lastSelectedMessage.createdAt)
        )
          ? i < chat.messages.indexOf(lastSelectedMessage)
          : i >= chat.messages.indexOf(lastSelectedMessage);
        isBefore(
          new Date(currentMessage.createdAt),
          new Date(lastSelectedMessage.createdAt)
        )
          ? i++
          : i--
      ) {
        const itemId = chat.messages[i]._id;
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
        setSelectedMessages([contextMenu?.message._id]);
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
    setTimeout(() => {
      setSmoothScroll(false);
    }, 300);
  }, [smoothScroll]);

  return (
    <>
      <div
        className={classes.wrapper}
        autoFocus
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
        <Header
          onSelectModeOn={handleSelectModeOn}
          avatarProps={{ src: chat?.companion?.photos?.at(-1) }}
          title={clsx(chat?.companion?.name, chat?.companion?.surname)}
          subtitle={'Last online is a long time ago'}
        />
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
          <MessagesList
            ref={scrollRef}
            smoothScroll={smoothScroll}
            messages={chat?.messages ?? []}
            selectModeOn={selectMessageMode}
            selectedMessages={selectedMessages}
            onContextMenu={handleContextMenu}
            onSelect={handleSelectMessage}
            activeMessage={contextMenu?.message}
          />
        </div>
        <Footer
          selectedCount={selectedMessages.length}
          onCancelSelect={handleSelectModeOff}
          onDelete={handleDeleteMessageDialogOpen}
          onChangeMessage={handleChangeMessage}
          onSubmit={() => {
            void handleSubmit();
          }}
          selectModeOn={selectMessageMode}
          message={message}
        />
      </div>
      <DrawerContainer />
    </>
  );
};

export default Chat;
