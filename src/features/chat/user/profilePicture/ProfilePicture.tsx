import React, { useEffect, useMemo, useRef, useState } from 'react';
import classes from './ProfilePicture.module.scss';
import userClasses from '../User.module.scss';
import chatClasses from 'src/features/chat/Chat.module.scss';
import { Fade, IconButton, Modal } from '@mui/material';
import SvgSelector from 'src/components/svgSelector/SvgSelector';
import clsx from 'clsx';
import Typography from 'src/components/typography/Typography';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import { useDevice, useKeydown } from 'src/hooks';
import CustomIconButton from 'src/components/customIconButton/CustomIconButton';
import CustomAvatar from 'src/components/customAvatar/CustomAvatar';
import { clamp } from 'src/utils';
import Draggable from 'react-draggable';

const MAX_IMAGES_ITEMS = 5;
const ZOOM_STEP = 0.7;

interface PaginationItem extends Image {
  index: number;
}
const middleItemIndex = Math.ceil(MAX_IMAGES_ITEMS / 2);
const generatePagination = (
  images: Image[],
  activeIndex: number
): PaginationItem[] => {
  const items = [];
  const mappedImages = images.map((img, index) => ({ ...img, index }));
  if (activeIndex < middleItemIndex) {
    for (let i = 0; i < MAX_IMAGES_ITEMS && i < mappedImages.length; i++) {
      items.push(mappedImages[i]);
    }
  } else if (activeIndex <= images.length - middleItemIndex - 1) {
    for (let i = 0; i < MAX_IMAGES_ITEMS && i < mappedImages.length; i++) {
      items.push(mappedImages[i + activeIndex - middleItemIndex + 1]);
    }
  } else {
    for (let i = 0; i < MAX_IMAGES_ITEMS; i++) {
      console.log(i);
      console.log(images.length - MAX_IMAGES_ITEMS + i - 1);
      items.push(mappedImages[images.length - MAX_IMAGES_ITEMS + i]);
    }
  }
  return items;
};

interface Image {
  url: string;
}

interface ProfilePictureProps {
  images: Image[];
}

const ProfilePicture: React.FC<ProfilePictureProps> = ({ images }) => {
  const { width } = useDevice();
  const [activeIndex, setActiveIndex] = useState(0);
  const [activeModalIndex, setActiveModalIndex] = useState(0);
  const [zoomFactor, setZoomFactor] = useState(1);
  const imageContainerRef = useRef<HTMLDivElement>(null);
  const [imageSize, setImageSize] = useState<DOMRect>({
    width: 0,
    bottom: 0,
    height: 0,
    left: 0,
    right: 0,
    top: 0,
    x: 0,
    y: 0,
    toJSON: () => {},
  });
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [transformMode, setTransformMode] = useState(false);
  const [open, setOpen] = useState(false);
  const [direction, setDirection] = useState(1);
  const currentImage = images[activeIndex];
  const handleChangePage = (index: number) => () => {
    setActiveIndex(index);
    setDirection(index >= activeIndex ? -1 : 1);
  };
  const paginationItems = generatePagination(images, activeIndex);

  useEffect(() => {
    const curr = imageContainerRef.current;
    if (curr === null) return;
    setImageSize(curr.getBoundingClientRect());
    setTimeout(() => {
      setImageSize(curr.getBoundingClientRect());
    }, 300);
    const handleResize = (): void => {
      setImageSize(curr.getBoundingClientRect());
    };
    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, [imageContainerRef]);

  const handleOpen = (): void => {
    setOpen(true);
    setActiveModalIndex(activeIndex);
    setZoomFactor(1);
  };

  const handleClose = (): void => {
    setOpen(false);
    setActiveIndex(activeModalIndex);
  };

  const handleModalPrev = (): void => {
    if (activeModalIndex <= 0 || zoomFactor !== 1) return;
    setActiveModalIndex(activeModalIndex - 1);
    setDirection(-1);
  };
  const handleModalNext = (): void => {
    if (activeModalIndex >= images.length - 1 || zoomFactor !== 1) return;
    setActiveModalIndex(activeModalIndex + 1);
    setDirection(1);
  };

  const handleChangeZoom = (value: number): void => {
    setZoomFactor(clamp(value, 1, 1 + ZOOM_STEP * 3));
  };

  const handleZoomIn = (): void => {
    handleChangeZoom(zoomFactor + ZOOM_STEP);
  };
  const handleZoomOut = (): void => {
    handleChangeZoom(zoomFactor - ZOOM_STEP);
  };

  useKeydown('ArrowLeft', handleModalPrev);
  useKeydown('ArrowRight', handleModalNext);

  const actions = useMemo(
    () => [
      {
        icon: 'zoomOut',
        hideOnMobile: true,
        onClick: handleZoomOut,
      },
      {
        icon: 'zoomIn',
        hideOnMobile: true,
        onClick: handleZoomIn,
      },
      {
        icon: 'close',
        hideOnMobile: false,
        onClick: handleClose,
      },
    ],
    [handleZoomIn, handleZoomOut]
  );

  return (
    <div className={classes.profileContainer} ref={imageContainerRef}>
      <TransitionGroup
        className={classes.picture}
        childFactory={(child) =>
          React.cloneElement(child, {
            classNames: clsx(classes.picture, {
              transition: direction === 1,
              'transition-to-right': direction === -1,
            }),
            timeout: 300,
          })
        }
      >
        <CSSTransition
          key={currentImage.url}
          timeout={300}
          classNames={'transition'}
        >
          <img src={currentImage.url} alt="" onClick={handleOpen} />
        </CSSTransition>
      </TransitionGroup>
      <CSSTransition in={open} classNames={'picture'} timeout={400}>
        <Modal
          open={open}
          onClose={handleClose}
          disableAutoFocus
          disablePortal
          slotProps={{
            backdrop: {
              sx: {
                background: width < 850 ? 'black' : 'rgba(0,0,0,0.8)',
              },
              timeout: 400,
            },
          }}
        >
          <Fade in={open} timeout={400}>
            <div className={classes.modal}>
              <div className={clsx(classes.header, 'header')}>
                <div className={chatClasses.chatLabel}>
                  <CustomAvatar name={'Поляк'} />
                  <div className={chatClasses.textContainer}>
                    <Typography weight={600} color={'primary-light'}>
                      Поляк
                    </Typography>
                    <Typography color={'secondary-light'} size={'xs'}>
                      Profile photo
                    </Typography>
                  </div>
                </div>
                <div className={classes.actions}>
                  {actions
                    .filter((action) => !(action.hideOnMobile && width < 850))
                    .map((action) => (
                      <CustomIconButton
                        key={action.icon}
                        onClick={action.onClick}
                      >
                        <SvgSelector
                          id={action.icon}
                          className={clsx(
                            userClasses.iconButton,
                            userClasses.light
                          )}
                        />
                      </CustomIconButton>
                    ))}
                </div>
              </div>
              <div className={classes.body}>
                <TransitionGroup
                  style={
                    zoomFactor > 1
                      ? { transform: `scale(${zoomFactor})`, transition: '.4s' }
                      : { transition: '.4s' }
                  }
                  childFactory={(child) =>
                    React.cloneElement(child, {
                      classNames: clsx({
                        modal: direction === 1,
                        'modal-to-right': direction === -1,
                      }),
                      timeout: 300,
                    })
                  }
                >
                  <CSSTransition
                    key={activeModalIndex}
                    timeout={300}
                    classNames={'modal'}
                  >
                    <div>
                      <div
                        className={classes.picture}
                        style={{
                          position: 'absolute',
                          top: imageSize.top,
                          left: imageSize.left,
                          width: imageSize.width,
                          height: imageSize.height,
                        }}
                      >
                        <Draggable
                          disabled={zoomFactor <= 1}
                          scale={zoomFactor}
                        >
                          <img
                            draggable={false}
                            src={images[activeModalIndex].url}
                            alt=""
                            style={{
                              cursor: zoomFactor > 1 ? 'move' : 'default',
                              transition: zoomFactor > 1 ? 'none' : undefined,
                            }}
                          />
                        </Draggable>
                      </div>
                    </div>
                  </CSSTransition>
                </TransitionGroup>
              </div>
            </div>
          </Fade>
        </Modal>
      </CSSTransition>

      <div className={classes.layer}>
        <div className={classes.header}>
          {images.length > MAX_IMAGES_ITEMS &&
            activeIndex >= middleItemIndex && (
              <div
                className={clsx(
                  classes.carouselItem,
                  classes.small,
                  classes.first
                )}
              />
            )}
          {paginationItems.map((image) => (
            <div
              key={image.index}
              className={clsx(classes.carouselItem, {
                [classes.active]: activeIndex === image.index,
              })}
              onClick={handleChangePage(image.index)}
            />
          ))}
          {images.length > MAX_IMAGES_ITEMS &&
            activeIndex < images.length - middleItemIndex && (
              <div
                className={clsx(
                  classes.carouselItem,
                  classes.small,
                  classes.last
                )}
              />
            )}
        </div>
        <div className={classes.body}>
          {activeIndex > 0 ? (
            <div
              className={classes.wrapper}
              onClick={handleChangePage(activeIndex - 1)}
            >
              <IconButton onClick={handleChangePage(activeIndex - 1)}>
                <SvgSelector
                  id="arrowLeft"
                  className={clsx(userClasses.iconButton, userClasses.light)}
                />
              </IconButton>
            </div>
          ) : (
            <div />
          )}
          {activeIndex < images.length - 1 && (
            <div
              className={classes.wrapper}
              onClick={handleChangePage(activeIndex + 1)}
            >
              <IconButton onClick={handleChangePage(activeIndex + 1)}>
                <SvgSelector
                  id="arrowRight"
                  className={clsx(userClasses.iconButton, userClasses.light)}
                />
              </IconButton>
            </div>
          )}
        </div>
        <div className={classes.footer}>
          <Typography size={'xl'} color={'primary-light'} weight={700}>
            Поляк
          </Typography>
          <Typography color={'secondary-light'} weight={500}>
            Last seen 27 minutes ago
          </Typography>
        </div>
      </div>
    </div>
  );
};

export default ProfilePicture;
