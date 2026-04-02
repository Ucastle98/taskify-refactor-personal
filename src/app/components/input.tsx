'use client';

import type { ComponentPropsWithoutRef } from 'react';
import React, { useId, useState } from 'react';

import Visibility from '../assets/Visibility.svg';
import VisibilityOff from '../assets/VisibilityOff.svg';
import { cn } from '../lib/cn';
import Button from './Button';
import SelectInput from './SelectInput';

export const INPUT_BASE = 'w-full h-12 px-4 bg-white border border-[#D9D9D9] rounded-md';
const INVALID_CLASS = 'border-[#D6173A] focus:border-red-500 focus:ring-1 focus:ring-red-500';
const TEXTAREA_BASE = 'min-h-[110px] p-4 resize-none';

export const padIfRightIcon = (has: boolean) => (has ? 'pr-12' : 'pr-5 ');
export const padIfLeftIcon = (has: boolean) => (has ? 'pl-10' : 'pl-5 ');

type BaseInputProps = ComponentPropsWithoutRef<'input'>;
type BaseSelectProps = ComponentPropsWithoutRef<'select'>;
type BaseTextareaProps = ComponentPropsWithoutRef<'textarea'>;

interface BaseProps {
  id?: string;
  isInvalid?: boolean;
  className?: string;
  wrapperClass?: string;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
}

export interface InputTextProps
  extends Omit<BaseInputProps, 'size' | 'id' | 'ref' | 'type'>, BaseProps {
  as?: 'input';
  type?: 'text' | 'email' | 'password' | 'number';
  ref?: React.Ref<HTMLInputElement>;
}

export interface SelectOption {
  value: string | number;
  label: string;
  disabled?: boolean;
}

export interface InputSelectProps extends Omit<BaseSelectProps, 'size' | 'id' | 'ref'>, BaseProps {
  as: 'select';
  options: SelectOption[];
  placeholderOption?: string;
  ref?: React.Ref<HTMLSelectElement>;
}

export interface TextareaProps extends Omit<BaseTextareaProps, 'id' | 'ref'>, BaseProps {
  as: 'textarea';
  ref?: React.Ref<HTMLTextAreaElement>;
}

export type Props = InputTextProps | InputSelectProps | TextareaProps;

function isSelectProps(p: Props): p is InputSelectProps {
  return p.as === 'select';
}
function isTextareaProps(p: Props): p is TextareaProps {
  return p.as === 'textarea';
}

function PasswordInput(
  props: Omit<InputTextProps, 'type'> & { id: string; ref?: React.Ref<HTMLInputElement> },
) {
  const { id, ref, isInvalid, className, wrapperClass, leftIcon, rightIcon, ...inputDomProps } =
    props;

  const [showPw, setShowPw] = useState(false);

  const leftPad = padIfLeftIcon(Boolean(leftIcon));
  const rightPad = padIfRightIcon(true);

  return (
    <div className={cn('relative', wrapperClass)}>
      {leftIcon && <span className="absolute inset-y-0 left-3 flex items-center">{leftIcon}</span>}

      <input
        id={id}
        ref={ref}
        className={[INPUT_BASE, leftPad, rightPad, isInvalid ? INVALID_CLASS : '', className].join(
          ' ',
        )}
        type={showPw ? 'text' : 'password'}
        aria-invalid={isInvalid || undefined}
        {...inputDomProps}
      />

      <Button
        type="button"
        onClick={() => setShowPw((v) => !v)}
        aria-label={showPw ? '비밀번호 숨기기' : '비밀번호 표시'}
        className="absolute inset-y-0 right-2 flex items-center px-2"
        variant="icon"
      >
        {showPw ? (
          <VisibilityOff className="svg-fill h-6 w-6" />
        ) : (
          <Visibility className="svg-fill h-6 w-6" />
        )}
      </Button>
    </div>
  );
}

export default function Input(props: Props) {
  const autoId = useId();
  const id = props.id ?? `input-${autoId}`;

  // 1) select
  if (isSelectProps(props)) {
    const { ref, ...rest } = props;
    return <SelectInput {...rest} id={id} ref={ref} />;
  }

  // 2) textarea
  if (isTextareaProps(props)) {
    const { as: _, ref, isInvalid, className, wrapperClass, leftIcon, rightIcon, ...rest } = props;

    const leftPad = padIfLeftIcon(Boolean(leftIcon));
    const rightPad = padIfRightIcon(Boolean(rightIcon));

    return (
      <div className={cn('relative', wrapperClass)}>
        {leftIcon && (
          <span className="absolute top-3 left-3 flex items-center text-gray-400">{leftIcon}</span>
        )}

        <textarea
          id={id}
          ref={ref}
          className={[
            INPUT_BASE,
            TEXTAREA_BASE,
            leftPad,
            rightPad,
            isInvalid ? INVALID_CLASS : '',
            className,
          ].join(' ')}
          aria-invalid={isInvalid || undefined}
          {...rest}
        />

        {rightIcon && (
          <span className="absolute top-3 right-3 flex items-center text-gray-400">
            {rightIcon}
          </span>
        )}
      </div>
    );
  }
  // 3) input (default)
  const {
    as: _as,
    ref,
    type = 'text',
    isInvalid,
    className,
    wrapperClass,
    leftIcon,
    rightIcon,
    ...inputDomProps
  } = props as InputTextProps;

  if (type === 'password') {
    return (
      <PasswordInput
        id={id}
        ref={ref}
        isInvalid={isInvalid}
        className={className}
        wrapperClass={wrapperClass}
        leftIcon={leftIcon}
        rightIcon={rightIcon}
        {...inputDomProps}
      />
    );
  }

  const leftPad = padIfLeftIcon(Boolean(leftIcon));
  const rightPad = padIfRightIcon(Boolean(rightIcon));

  return (
    <div className={cn('relative', wrapperClass)}>
      {leftIcon && (
        <span className="absolute inset-y-0 left-3 flex items-center text-gray-400">
          {leftIcon}
        </span>
      )}

      <input
        id={id}
        ref={ref}
        className={[INPUT_BASE, leftPad, rightPad, isInvalid ? INVALID_CLASS : '', className].join(
          ' ',
        )}
        type={type}
        aria-invalid={isInvalid || undefined}
        {...(inputDomProps as Omit<BaseInputProps, 'id' | 'ref' | 'type'>)}
      />

      {rightIcon && (
        <span className="absolute inset-y-0 right-3 flex items-center text-gray-400">
          {rightIcon}
        </span>
      )}
    </div>
  );
}
