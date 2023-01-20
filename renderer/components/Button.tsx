import styles from '@/styles/components/button.module.scss';
import cn from '@/styles/index';

import { ButtonHTMLAttributes, ForwardedRef, forwardRef, ReactNode } from 'react';

interface IProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  color?: 'blue' | 'white' | 'red';
  size?: 'medium' | 'small';
  full?: boolean;
  children: ReactNode;
}

const Button = (
  { color = 'blue', size = 'medium', children, ...rest }: IProps,
  ref: ForwardedRef<HTMLButtonElement>
) => {
  return (
    <button ref={ref} className={cn(styles.button, styles[color], styles[size])} {...rest}>
      {children}
    </button>
  );
};

export default forwardRef(Button);
