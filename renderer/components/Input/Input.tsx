import styles from './input.module.scss';

import { ForwardedRef, forwardRef, InputHTMLAttributes } from 'react';

interface IProps extends InputHTMLAttributes<HTMLInputElement> {
  name?: string;
  title?: string;
  full?: boolean;
  description?: string;
}

const Input = ({ name, title, description, ...rest }: IProps, ref: ForwardedRef<HTMLInputElement>) => {
  return (
    <div className={styles.inputBox}>
      {title && (
        <label htmlFor={name} className={styles.title}>
          {title} {rest.required && <span className={styles.required}>*</span>}
        </label>
      )}

      <input ref={ref} id={name} className={styles.input} name={name} {...rest} />

      {description && <p className={styles.description}>{description}</p>}
    </div>
  );
};

export default forwardRef(Input);
