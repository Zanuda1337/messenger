import React from 'react';
import classes from './Footer.module.scss';
import chatClasses from '../Chat.module.scss';
import clsx from 'clsx';
import { CSSTransition, SwitchTransition } from 'react-transition-group';
import ChatInput from 'src/components/chatInput/ChatInput';
import SelectToolbar from 'src/components/chatInput/SelectToolbar';
import { useDevice } from 'src/hooks';

interface FooterProps {
  selectedCount: number;
  onCancelSelect: () => void;
  onDelete: () => void;
  onChangeMessage: (text: string) => void;
  onSubmit: () => void;
  selectModeOn: boolean;
  message: string;
}

const Footer: React.FC<FooterProps> = ({
  onChangeMessage,
  onSubmit,
  onCancelSelect,
  selectModeOn,
  selectedCount,
  onDelete,
  message,
}) => {
  const { width } = useDevice();
  return (
    <div
      className={clsx(chatClasses.container, {
        [chatClasses.mobile]: width <= 750,
      })}
    >
      <SwitchTransition>
        <CSSTransition
          key={`${selectModeOn}`}
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
              [classes.tight]: selectModeOn && width > 750,
            })}
          >
            {!selectModeOn ? (
              <ChatInput
                value={message}
                onChange={onChangeMessage}
                onSubmit={onSubmit}
              />
            ) : (
              <SelectToolbar
                selectedCount={selectedCount}
                onDelete={onDelete}
                onCancel={onCancelSelect}
              />
            )}
          </div>
        </CSSTransition>
      </SwitchTransition>
    </div>
  );
};

export default Footer;
