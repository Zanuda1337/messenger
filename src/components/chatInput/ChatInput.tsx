import React from 'react';
import classes from './ChatInput.module.scss';
import SvgSelector from 'src/components/svgSelector/SvgSelector';
import { clsx } from 'clsx';
import { CSSTransition } from 'react-transition-group';
import EmojiPicker from 'emoji-picker-react';
import CustomMenu from 'src/components/customMenu/CustomMenu';
import CustomPopper from 'src/components/customPopper/CustomPopper';

interface ChatInputProps {
  value: string;
  onChange: (value: string) => void;
  onSubmit: () => void;
}

const ChatInput: React.FC<ChatInputProps> = ({
  value,
  onChange,
  onSubmit,
}) => {
  const [fileMenuOpen, setFileMenuOpen] = React.useState(false);
  const [emojiPickerOpen, setEmojiPickerOpen] = React.useState(false);
  return (
    <div className={classes.wrapper}>
      <CustomPopper
        placement={'top-start'}
        style={{ transform: 'translate(-14px,0)' }}
        offset={{ bottom: 6 }}
        content={
          <EmojiPicker
            searchDisabled
            previewConfig={{ showPreview: false }}
            height={350}
            width={400}
          />
        }
        onClose={() => {
          setEmojiPickerOpen(false);
        }}
        onOpen={() => {
          setEmojiPickerOpen(true);
        }}
        open={emojiPickerOpen}
      >
        <button
          className={clsx(classes.icon, { [classes.active]: emojiPickerOpen })}
        >
          <SvgSelector id="emoji" />
        </button>
      </CustomPopper>
      <textarea
        placeholder={'Message'}
        style={{ resize: 'none' }}
        value={value}
        onChange={(e) => {
          onChange(e.target.value);
        }}
        onKeyDown={(e) => {
          if (e.code === 'Enter') {
            e.preventDefault();
            onSubmit();
          }
        }}
      />
      <div className={classes.items}>
        <CustomMenu
          offset={{ bottom: 6 }}
          placement={'bottom-end'}
          options={[
            { value: 'photo', label: 'Photo or Video', icon: 'mute' },
            { value: 'file', label: 'File', icon: 'attachFile' },
          ]}
          open={fileMenuOpen}
          onOpen={() => {
            setFileMenuOpen(true);
          }}
          onClose={() => {
            setFileMenuOpen(false);
          }}
        >
          <button
            className={clsx(classes.icon, { [classes.active]: fileMenuOpen })}
          >
            <SvgSelector id="attachFile" />
          </button>
        </CustomMenu>

        <CSSTransition
          in={value.length !== 0}
          timeout={300}
          classNames={'chat-input-button'}
        >
          <button
            onClick={() => {
              if (value.length !== 0) {
                onSubmit();
              }
            }}
            className={clsx(classes.icon, {
              [classes.send]: value.length !== 0,
            })}
          >
            <SvgSelector id={value.length !== 0 ? 'send' : 'microphone'} />
          </button>
        </CSSTransition>
      </div>
    </div>
  );
};

export default ChatInput;
