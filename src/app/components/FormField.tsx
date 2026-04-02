'use client';

import React from 'react';
import {
  Controller,
  type FieldValues,
  type Path,
  type RegisterOptions,
  useFormContext,
} from 'react-hook-form';

import Field from './Field';
import Input, { type InputSelectProps, type InputTextProps, type TextareaProps } from './input';

type CommonProps<TFieldValues extends FieldValues> = {
  name: Path<TFieldValues>;
  label?: string;
  helperText?: string;
  rules?: RegisterOptions<TFieldValues, Path<TFieldValues>>;
  selectRules?: RegisterOptions<TFieldValues, Path<TFieldValues>>;
};

type FormFieldProps<TFieldValues extends FieldValues> =
  | (CommonProps<TFieldValues> & {
      inputProps: Omit<InputTextProps, 'id' | 'isInvalid'> & { id?: string; as?: 'input' };
    })
  | (CommonProps<TFieldValues> & {
      inputProps: Omit<TextareaProps, 'id' | 'isInvalid'> & { id?: string; as: 'textarea' };
    })
  | (CommonProps<TFieldValues> & {
      inputProps: Omit<InputSelectProps, 'id' | 'isInvalid' | 'value' | 'onChange' | 'onBlur'> & {
        id?: string;
        as: 'select';
      };
    });

export default function FormField<TFieldValues extends FieldValues>({
  name,
  label,
  helperText,
  inputProps,
  rules,
  selectRules,
}: FormFieldProps<TFieldValues>) {
  const {
    register,
    control,
    formState: { errors },
  } = useFormContext<TFieldValues>();

  const errorMessage = getErrorMessage(errors, name);
  const id = inputProps.id ?? String(name);

  // ✅ select는 Controller
  if (inputProps.as === 'select') {
    return (
      <Field id={id} label={label} helperText={helperText} error={errorMessage}>
        <Controller
          name={name}
          control={control}
          rules={selectRules}
          render={({ field }) => (
            <Input
              {...inputProps}
              id={id}
              isInvalid={!!errorMessage}
              value={field.value}
              onChange={(e: React.ChangeEvent<HTMLSelectElement>) => field.onChange(e.target.value)}
              onBlur={field.onBlur}
            />
          )}
        />
      </Field>
    );
  }

  const reg = register(name, rules);

  return (
    <Field id={id} label={label} helperText={helperText} error={errorMessage}>
      <Input id={id} isInvalid={!!errorMessage} {...inputProps} {...reg} />
    </Field>
  );
}

function getErrorMessage<TFieldValues extends FieldValues>(
  errors: unknown,
  name: Path<TFieldValues>,
): string | undefined {
  if (!errors || typeof errors !== 'object') return undefined;

  const parts = String(name).split('.');
  let cur: unknown = errors;

  for (const key of parts) {
    if (!cur || typeof cur !== 'object') return undefined;
    cur = (cur as Record<string, unknown>)[key];
  }

  if (!cur || typeof cur !== 'object') return undefined;
  const msg = (cur as Record<string, unknown>)['message'];
  return typeof msg === 'string' ? msg : undefined;
}
