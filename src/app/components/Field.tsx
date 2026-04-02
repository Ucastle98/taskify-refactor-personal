'use client';

import React from 'react';

import { cn } from '../lib/cn';

type InjectedProps = {
  id?: string;
  isInvalid?: boolean;
  className?: string;
  'aria-describedby'?: string;
};

type FieldProps = {
  id: string;
  label?: string;
  helperText?: string;
  error?: string;
  children: React.ReactElement<InjectedProps>;
};

export default function Field({ id, label, helperText, error, children }: FieldProps) {
  const describedBy = error ? `${id}-error` : helperText ? `${id}-help` : undefined;

  const injectedClass = cn(children.props.className, error && 'is-error');

  const child = React.cloneElement(children, {
    id,
    isInvalid: !!error,
    'aria-describedby': describedBy,
    className: injectedClass,
  });

  return (
    <div className="flex flex-col gap-2">
      {label && (
        <label htmlFor={id} className="text-sm font-medium">
          {label}
        </label>
      )}

      {child}

      {helperText && !error && (
        <p id={`${id}-help`} className="text-xs text-gray-500">
          {helperText}
        </p>
      )}

      {error && (
        <p id={`${id}-error`} role="alert" aria-live="polite" className="text-xs text-red-600">
          {error}
        </p>
      )}
    </div>
  );
}
