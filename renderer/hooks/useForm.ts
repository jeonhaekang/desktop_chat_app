import { ChangeEvent, useCallback, useEffect, useRef, useState } from 'react';

const useForm = <T>(init: T) => {
  const [isValid, setIsValid] = useState(false);
  const [form, setForm] = useState(init);

  const inputs = useRef(new Map());

  const validation = useCallback(() => {
    let result = true;

    inputs.current.forEach((input) => {
      const { required, validity } = input;

      if (required && !validity.valid) {
        result = false;
      }
    });

    setIsValid(result);
  }, []);

  const setValue = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => {
      const { name, value } = e.target;

      setForm((prev) => {
        return { ...prev, [name]: value };
      });

      validation();
    },
    [validation]
  );

  const register = useCallback(
    (name: keyof T) => {
      return {
        name,
        onChange: setValue,
        value: form[name],
        ref: (el: HTMLInputElement) => inputs.current.set(name, el),
      };
    },
    [form, setValue]
  );

  const reset = useCallback(() => {
    setForm(init);
  }, [init]);

  useEffect(() => {
    validation();
  }, [validation]);

  return { isValid, form, register, reset };
};

export default useForm;
