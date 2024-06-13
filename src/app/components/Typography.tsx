import cn from 'classnames';
import React from 'react';

export type Variant =
  | 'heading'
  | 'title'
  | 'title2'
  | 'subTitle'
  | 'h4'
  | 'h5'
  | 'h6'
  | 'p'
  | 'sm'
  | 'xs';


type TypographyProps = {
    variant?: Variant;
    children: React.ReactNode;
    className?: string;
    style?: React.CSSProperties;
};

const Typography: React.FC<TypographyProps> = ({
    variant = 'p',
    children,
    className = '',
    style,
}) => {
    const component = React.useMemo(() => {
        switch (variant) {
            case 'heading':
                return 'h1';
            case 'title':
            case 'title2':
                return 'h2';
            case 'subTitle':
                return 'h3';
            case 'sm':
            case 'xs':
                return 'p';
            default:
                return variant;
        }
    }, [variant]);

    const classes = cn(`tracking-normal ${className}`, {
        'text-2xl md:text-title': variant === 'heading' || variant === 'title',
        'text-4xl': variant === 'title2',
        'text-lg md:text-xl lg:text-2xl': variant === 'subTitle',
        'text-sm md:text-xl':
            variant === 'h4' ||
            variant === 'h5' ||
            variant === 'h6' ||
            variant === 'p',
        'text-sm': variant === 'sm',
        'text-xs': variant === 'xs',
        'font-normal': variant === 'p',
        'font-medium': variant === 'subTitle',
        'font-semibold': !['p', 'sm', 'xs', 'subTitle'].includes(variant),
    });

    return React.createElement(
        component,
        { className: classes, style },
        children
    );
};

export default Typography;
