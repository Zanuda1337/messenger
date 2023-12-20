import React, { useMemo } from 'react';
import classes from './MessagesList.module.scss';
import chatClasses from '../Chat.module.scss';
import clsx from 'clsx';
import CustomAvatar from 'src/components/customAvatar/CustomAvatar';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import Message from 'src/features/chat/Message';
import Scroll from 'src/components/scroll/Scroll';
import { Scrollbars } from 'react-custom-scrollbars-2';
import { IMessage } from 'src/slices/dialogs/dialogs.types';
import { useIsCurrentUser } from 'src/hooks';

const structMessages = (messages: IMessage[]): IMessage[][] => {
  const blocks: IMessage[][] = [];
  let block: IMessage[] = [];
  messages.forEach((message, i) => {
    const prevMessage = messages[i - 1];
    if (
      prevMessage === undefined ||
      prevMessage.creator._id === message.creator._id
    ) {
      block.push(message);
    } else {
      blocks.push(block);
      block = [];
      block.push(message);
    }
  });
  if (block.length > 0) blocks.push(block);
  return blocks;
};

interface MessagesListProps {
  messages: IMessage[];
  selectModeOn: boolean;
  selectedMessages: string[];
  onContextMenu: (e: React.MouseEvent, message: IMessage) => void;
  onSelect: (
    e: React.MouseEvent<HTMLDivElement, MouseEvent>,
    messageId: string
  ) => void;
  activeMessage: IMessage | undefined;
  smoothScroll: boolean;
}

// eslint-disable-next-line react/display-name
const MessagesList = React.forwardRef<Scrollbars, MessagesListProps>(
  (
    {
      messages,
      selectModeOn,
      selectedMessages,
      onContextMenu,
      onSelect,
      smoothScroll,
      activeMessage,
    },
    ref
  ) => {
    const isCurrentUser = useIsCurrentUser();
    const structuredMessages = useMemo(
      () => structMessages(messages),
      [messages]
    );

    return (
      <Scroll ref={ref} smoothScroll={smoothScroll}>
        <div className={classes.wrapper}>
          {structuredMessages.map((messagesBlock, i) => (
            <div
              key={i}
              className={clsx(chatClasses.container, classes.blockWrapper, {
                [chatClasses.selectMode]: selectModeOn,
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
                {!isCurrentUser(messagesBlock[0].creator._id) && (
                  <CustomAvatar
                    name={clsx(
                      messagesBlock[0].creator.name,
                      messagesBlock[0].creator.surname
                    )}
                    className={classes.avatar}
                    src={messagesBlock[0].creator.photos?.at(-1)}
                  />
                )}
              </div>
              <TransitionGroup key={i} className={classes.block}>
                {messagesBlock.map((message, j) => (
                  <CSSTransition
                    key={message._id}
                    classNames={{
                      enter: classes.enter,
                      enterActive: classes.enterActive,
                      exit: classes.exit,
                      exitActive: classes.exitActive,
                    }}
                    timeout={200}
                  >
                    <Message
                      date={new Date(message.createdAt)}
                      isOwn={isCurrentUser(message.creator._id)}
                      showName={j === 0 && !isCurrentUser(message.creator._id)}
                      last={j === messagesBlock.length - 1}
                      read={true}
                      sent={true}
                      user={message.creator}
                      text={message.text}
                      selectMode={selectModeOn}
                      isSelected={selectedMessages.includes(message._id)}
                      // isActive={message.id === (activeMessage?.id ?? -1)}
                      isActive={false}
                      onClick={(e) => {
                        if (!selectModeOn) return;
                        onSelect(e, message._id);
                      }}
                      onContextMenu={(e) => {
                        if (selectModeOn) return;
                        onContextMenu(e, message);
                      }}
                    />
                  </CSSTransition>
                ))}
              </TransitionGroup>
            </div>
          ))}
        </div>
      </Scroll>
    );
  }
);

export default MessagesList;
