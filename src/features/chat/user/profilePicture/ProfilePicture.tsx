import React, { useEffect, useMemo, useRef, useState } from 'react';
import classes from './ProfilePicture.module.scss';
import chatClasses from 'src/features/chat/Chat.module.scss';
import { Fade, IconButton, Modal } from '@mui/material';
import SvgSelector from 'src/components/svgSelector/SvgSelector';
import clsx from 'clsx';
import Typography from 'src/components/typography/Typography';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import { useDevice, useIsCurrentUser, useKeydown } from 'src/hooks';
import CustomIconButton from 'src/components/customIconButton/CustomIconButton';
import CustomAvatar from 'src/components/customAvatar/CustomAvatar';
import { clamp, stringToColor } from 'src/utils';
import Draggable, { DraggableData, DraggableEvent } from 'react-draggable';
import { Vector2 } from 'src/types';
import { User } from 'src/app/app.types';
import { useBoundActions } from 'src/app/hooks';
import CustomDialogue from 'src/components/customDialogue/CustomDialogue';
import { deletePhotoAsync } from 'src/app/app.slice';

const MAX_IMAGES_ITEMS = 5;
const ZOOM_STEP = 0.7;

interface PaginationItem {
  url: string;
  index: number;
}
const middleItemIndex = Math.ceil(MAX_IMAGES_ITEMS / 2);
const generatePagination = (
  images: string[],
  activeIndex: number
): PaginationItem[] => {
  const items = [];
  const mappedImages = images.map((img, index) => ({ url: img, index }));
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
      items.push(mappedImages[images.length - MAX_IMAGES_ITEMS + i]);
    }
  }
  return items;
};

const initialRect = {
  width: 0,
  bottom: 0,
  height: 0,
  left: 0,
  right: 0,
  top: 0,
  x: 0,
  y: 0,
  toJSON: () => {},
};

const initialCoords = {
  x: 0,
  y: 0,
};

interface ProfilePictureProps {
  user: User | null;
}

const ProfilePicture: React.FC<ProfilePictureProps> = ({ user }) => {
  const boundActions = useBoundActions({ deletePhotoAsync });
  const [fetching, setFetching] = useState(false);
  const images = [...(user?.photos ?? [])].reverse();
  const { isMobileLayout, width } = useDevice();
  const isCurrentUser = useIsCurrentUser(user?._id);
  const [deleteDialog, setDeleteDialog] = useState(false);
  const [activeIndex, setActiveIndex] = useState(0);
  const [activeModalIndex, setActiveModalIndex] = useState(0);
  const [zoomFactor, setZoomFactor] = useState(1);
  const imageContainerRef = useRef<HTMLDivElement>(null);
  const [imageSize, setImageSize] = useState<DOMRect>(initialRect);
  const [pictureSize, setPictureSize] = useState<DOMRect | null>(null);
  const [draggablePos, setDraggablePos] = useState<Vector2 | undefined>(
    initialCoords
  );
  const [open, setOpen] = useState(false);
  const [direction, setDirection] = useState(1);
  const currentImage = images?.[activeIndex];
  const handleChangePage = (index: number) => () => {
    setActiveIndex(index);
    setDirection(index >= activeIndex ? -1 : 1);
  };
  const paginationItems = generatePagination(images ?? [], activeIndex);

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

  useEffect(() => {
    setDraggablePos(initialCoords);
    setPictureSize(null);
  }, [zoomFactor]);

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
    if (deleteDialog) return;
    if (activeModalIndex <= 0 || zoomFactor !== 1) return;
    setActiveModalIndex(activeModalIndex - 1);
    setDirection(-1);
  };
  const handleModalNext = (): void => {
    if (deleteDialog) return;
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

  const handleStartDrag = (
    event: DraggableEvent,
    data: DraggableData
  ): void => {
    setDraggablePos(undefined);
    if (pictureSize === null) {
      setPictureSize(data.node.getBoundingClientRect());
    }
  };

  const handleOpenDelete = (): void => {
    setDeleteDialog(true);
  };
  const handleCloseDelete = (): void => {
    setDeleteDialog(false);
  };

  const handleDeletePhoto = async (): Promise<void> => {
    setFetching(true);
    const imageToDelete = currentImage;
    setActiveModalIndex(0);
    setActiveIndex(0);
    await boundActions.deletePhotoAsync(imageToDelete).unwrap();
    setFetching(false);
    handleCloseDelete();
  };

  useEffect(() => {
    if (images.length > 0) return;
    handleClose();
  }, [images]);

  useKeydown('ArrowLeft', handleModalPrev);
  useKeydown('ArrowRight', handleModalNext);

  const actions = useMemo(
    () =>
      isCurrentUser
        ? [
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
              icon: 'delete',
              hideOnMobile: false,
              onClick: handleOpenDelete,
            },
            {
              icon: 'close',
              hideOnMobile: false,
              onClick: handleClose,
            },
          ]
        : [
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
      <CustomDialogue
        content={''}
        slotProps={{
          title: { children: 'Are you sure?' },
          submit: { color: 'error', fetching, children: 'delete photo' },
        }}
        open={deleteDialog}
        onClose={handleCloseDelete}
        onSubmit={() => {
          void handleDeletePhoto();
        }}
      />
      <TransitionGroup
        className={classes.picture}
        childFactory={(child) =>
          React.cloneElement(child, {
            classNames: clsx(classes.picture, {
              transition: direction === 1,
              'transition-to-right': direction === -1,
            }),
            timeout: 30000,
          })
        }
      >
        <CSSTransition
          key={currentImage}
          timeout={30000}
          classNames={'transition'}
        >
          {images.length > 0 ? (
            <img src={currentImage} alt="" onClick={handleOpen} />
          ) : (
            <div
              className={classes.placeholderContainer}
              style={{
                backgroundColor: stringToColor(clsx(user?.name, user?.surname)),
              }}
            >
              <p>{`${user?.name[0]}${clsx(user?.surname?.[0])}`}</p>
            </div>
          )}
        </CSSTransition>
      </TransitionGroup>
      <CSSTransition in={open} classNames={'picture'} timeout={400}>
        <Modal
          open={open}
          onClose={handleClose}
          disablePortal
          slotProps={{
            backdrop: {
              sx: {
                background: isMobileLayout ? 'black' : 'rgba(0,0,0,0.8)',
              },
              timeout: 400,
            },
          }}
        >
          <Fade in={open} timeout={400}>
            <div className={classes.modal}>
              <div className={clsx(classes.header, 'header')}>
                <div className={chatClasses.chatLabel}>
                  <CustomAvatar name={clsx(user?.name, user?.surname)} />
                  <div className={chatClasses.textContainer}>
                    <Typography weight={600} color={'primary-light'}>
                      {clsx(user?.name, user?.surname)}
                    </Typography>
                    <Typography color={'secondary-light'} size={'xs'}>
                      Profile photo
                    </Typography>
                  </div>
                </div>
                <div className={classes.actions}>
                  {actions
                    .filter(
                      (action) => !(action.hideOnMobile && isMobileLayout)
                    )
                    .map((action) => (
                      <CustomIconButton
                        key={action.icon}
                        onClick={action.onClick}
                      >
                        <SvgSelector
                          id={action.icon}
                          className={clsx('iconButton', 'light')}
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
                          position={draggablePos}
                          axis={
                            (pictureSize?.width ?? 0) > width ? 'both' : 'y'
                          }
                          bounds={{
                            bottom:
                              ((pictureSize?.height ?? 0) -
                                (pictureSize?.bottom ?? 0) +
                                55) /
                              zoomFactor,
                            top: ((pictureSize?.top ?? 0) - 55) / zoomFactor,
                            left: (pictureSize?.left ?? 0) / zoomFactor,
                            right:
                              ((pictureSize?.width ?? 0) -
                                (pictureSize?.right ?? 0)) /
                              zoomFactor,
                          }}
                          onStart={handleStartDrag}
                        >
                          {images.length > 0 ? (
                            <img
                              draggable={false}
                              src={images[activeModalIndex]}
                              alt=""
                              style={{
                                cursor: zoomFactor > 1 ? 'move' : 'default',
                                transition: zoomFactor > 1 ? 'none' : undefined,
                              }}
                            />
                          ) : (
                            <div />
                          )}
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
          {images.length > 1 &&
            paginationItems.map((image) => (
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
                  className={clsx('iconButton', 'light')}
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
                  className={clsx('iconButton', 'light')}
                />
              </IconButton>
            </div>
          )}
        </div>
        <div className={classes.footer}>
          <Typography size={'xl'} color={'primary-light'} weight={700}>
            {clsx(user?.name, user?.surname)}
          </Typography>
          <Typography color={'secondary-light'} weight={500}>
            Last seen 27 minutes ago
          </Typography>
        </div>
        <div className={classes.gradient} />
      </div>
    </div>
  );
};

export default ProfilePicture;
