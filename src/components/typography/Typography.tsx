import React from 'react';
import clsx from 'clsx';

type Elements = 'p' | 'span' | 'h1';
type Weights = 100 | 200 | 300 | 400 | 500 | 600 | 700 | 800 | 900;
type Sizes = 'xxs' | 'xs' | 's' | 'm' | 'l' | 'xl' | 'xxl' | 'xxxl' | 'xxxxl';
type Transforms = 'initial' | 'capitalize' | 'lowercase' | 'uppercase';
export type Colors =
  | 'primary'
  | 'secondary'
  | 'secondary-light'
  | 'tertiary'
  | 'interactive-primary'
  | 'primary-light'
  | 'error';

export interface TypographyProps {
  el?: Elements;
  size?: Sizes;
  weight?: Weights;
  color?: Colors;
  transform?: Transforms;
  translate?: boolean;
  className?: string;
  style?: React.CSSProperties;
  children?:
    | JSX.Element
    | string
    | number
    | Array<JSX.Element | string | number>;
}

// eslint-disable-next-line react/display-name
const Typography = React.forwardRef<any, TypographyProps>(
  (
    {
      el = 'p',
      weight = 400,
      color = 'primary',
      transform = 'initial',
      translate = false,
      size = 's',
      style,
      className,
      children,
    },
    ref
  ) => {
    return React.createElement(
      el,
      {
        ref,
        style,
        className: clsx(
          `${el}_${size} text_transform_${transform} text_color_${color} text_weight_${weight}`,
          className
        ),
      },
      children
    );
  }
);

export default Typography;
