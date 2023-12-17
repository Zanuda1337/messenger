import React, { useEffect, useRef, useState, WheelEvent } from 'react';
import { Fade, Modal } from '@mui/material';
import classes from './ImageCropper.module.scss';
import CustomIconButton from 'src/components/customIconButton/CustomIconButton';
import SvgSelector from 'src/components/svgSelector/SvgSelector';
import Typography from 'src/components/typography/Typography';
import CustomSlider from 'src/components/customSlider/CustomSlider';
import Draggable from 'react-draggable';
import { Vector2 } from 'src/types';
import { clamp } from 'src/utils';
import { useDevice } from 'src/hooks';

interface ImageCropperProps {
  open: boolean;
  onClose?: () => void;
  imageUrl: string;
  onSubmit?: (dataUrl: string) => void;
}

const ImageCropper: React.FC<ImageCropperProps> = ({
  open,
  onClose,
  imageUrl,
  onSubmit,
}) => {
  const canvas = useRef<HTMLCanvasElement>(null);
  const imageRef = useRef<HTMLImageElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const { width } = useDevice();

  const [containerSize, setContainerSize] = useState(400);
  const [scale, setScale] = useState(1);
  const [minScale, setMinScale] = useState(1);
  const [drag, setDrag] = useState<Vector2>({ x: 0, y: 0 });
  const [imageSize, setImageSize] = useState({ width: 0, height: 0 });
  const scaledImage = {
    width: imageSize.width * scale,
    height: imageSize.height * scale,
  };

  useEffect(() => {
    setTimeout(() => {
      if (imageRef.current === null) return;
      setImageSize({
        width: imageRef.current.width,
        height: imageRef.current.height,
      });
      const newMinScale =
        containerSize /
        Math.max(
          Math.min(imageRef.current.width, imageRef.current.height),
          containerSize
        );
      setMinScale(newMinScale);
      setScale(newMinScale);
    }, 0);
  }, [imageRef, open, containerSize]);

  useEffect(() => {
    const step = (1.5 - minScale) / 10;
    const handleScroll = (event: WheelEvent): void => {
      if (event.deltaY < 0) {
        setScale(clamp(scale + step, minScale, 1.5));
        return;
      }
      setScale(clamp(scale - step, minScale, 1.5));
    };
    // @ts-expect-error type
    window.addEventListener('wheel', handleScroll);
    return () => {
      // @ts-expect-error type
      window.removeEventListener('wheel', handleScroll);
    };
  }, [scale, minScale]);

  useEffect(() => {
    if (containerRef.current === null) return;
    setContainerSize(containerRef.current.getBoundingClientRect().width);
    console.log(containerRef.current.getBoundingClientRect().width);
  }, [open, containerRef, width]);

  const cropImage = (
    canvas: HTMLCanvasElement | null,
    image: HTMLImageElement | null
  ): void => {
    if (canvas === null) return;
    if (image === null) return;
    const ctx = canvas.getContext('2d');
    if (ctx === null) return;

    const pixelRatio = window.devicePixelRatio;
    const scaleX = image.naturalWidth / scaledImage.width;
    const scaleY = image.naturalHeight / scaledImage.height;

    canvas.width = Math.floor(containerSize * scaleX * pixelRatio);
    canvas.height = Math.floor(containerSize * scaleY * pixelRatio);

    ctx.scale(1, 1);
    ctx.imageSmoothingQuality = 'high';
    ctx.save();

    const cropX = drag.x * scaleX;
    const cropY = drag.y * scaleY;

    ctx.translate(cropX, cropY);

    console.log('cropX', cropX);
    console.log('cropY', cropY);

    ctx.drawImage(
      image,
      0,
      0,
      image.width,
      image.height,
      0,
      0,
      image.width,
      image.height
    );

    ctx.restore();
  };

  useEffect(() => {
    if (!open) return;
    setDrag({ x: 0, y: 0 });
    setScale(1);
  }, [open]);

  return (
    <Modal open={open} onClose={onClose}>
      <Fade in={open}>
        <div className={classes.wrapper}>
          <div className={classes.container}>
            <div className={classes.header}>
              <CustomIconButton onClick={onClose}>
                <SvgSelector id={'close'} className={'iconButton'} />
              </CustomIconButton>
              <Typography weight={700} size={'xl'}>
                Drag to reposition
              </Typography>
            </div>
            <div className={classes.imageContainer} ref={containerRef}>
              <Draggable
                defaultClassName={classes.draggable}
                position={drag}
                bounds={{
                  top: -scaledImage.height + containerSize,
                  bottom: 0,
                  left: -scaledImage.width + containerSize,
                  right: 0,
                }}
                onDrag={(e, data) => {
                  setDrag({ x: data.x, y: data.y });
                }}
              >
                <div
                  style={{
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    height: (imageRef.current?.height ?? 0) * scale,
                    width: (imageRef.current?.width ?? 0) * scale,
                  }}
                >
                  <img
                    draggable={false}
                    className={classes.image}
                    src={imageUrl}
                    alt={'Upload'}
                    ref={imageRef}
                    style={{ transform: `scale(${scale})` }}
                  />
                </div>
              </Draggable>
            </div>
            <canvas
              ref={canvas}
              style={{
                display: 'none',
              }}
            />
            <div className={classes.sliderContainer}>
              <CustomSlider
                value={scale}
                min={minScale}
                max={1.5}
                step={(1.5 - minScale) / 100}
                hideValue
                onChange={(event, value) => {
                  const newScale = value as number;
                  setDrag({
                    x: clamp(
                      drag.x,
                      -imageSize.width * newScale + containerSize,
                      0
                    ),
                    y: clamp(
                      drag.y,
                      -imageSize.height * newScale + containerSize,
                      0
                    ),
                  });
                  setScale(newScale);
                }}
              />
            </div>
            <div className={classes.footer}>
              <CustomIconButton
                size={'large'}
                color={'primary'}
                disableProgressOnHover
                onClick={() => {
                  cropImage(canvas.current, imageRef.current);
                  const dataUrl = canvas.current?.toDataURL();
                  if (dataUrl === undefined) return;
                  onSubmit?.(dataUrl);
                  onClose?.();
                }}
              >
                <SvgSelector id={'check'} className={'iconButton white'} />
              </CustomIconButton>
            </div>
          </div>
        </div>
      </Fade>
    </Modal>
  );
};

export default ImageCropper;
