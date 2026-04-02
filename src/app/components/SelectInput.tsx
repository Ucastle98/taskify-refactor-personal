'use client';

import React, { useMemo, useRef, useState } from 'react';

import useOutsideClick from '../hooks/useOutsideClick';
import { cn } from '../lib/cn';
import { INPUT_BASE, type InputSelectProps, padIfLeftIcon, padIfRightIcon } from './input';

export default function SelectInput(props: InputSelectProps) {
  const {
    id,
    options,
    placeholderOption,
    wrapperClass,
    leftIcon,
    rightIcon,
    className,
    onChange,
    value,
    isInvalid,
    ref: _ref,
    disabled,
  } = props;

  const [isOpen, setIsOpen] = useState(false);

  const wrapperRef = useRef<HTMLDivElement>(null);
  useOutsideClick(wrapperRef, () => setIsOpen(false));

  // ✅ value + options로 selected를 “계산”
  const selected = useMemo(() => {
    if (value === undefined || value === null || value === '') return null;
    return options.find((opt) => String(opt.value) === String(value)) ?? null;
  }, [value, options]);

  const handleToggle = () => {
    if (disabled) return;
    setIsOpen((prev) => !prev);
  };

  const handleSelect = (option: (typeof options)[number]) => {
    if (disabled || option.disabled) return;

    setIsOpen(false);

    onChange?.({
      target: { value: option.value, name: id },
      currentTarget: { value: option.value, name: id },
    } as unknown as React.ChangeEvent<HTMLSelectElement>);
  };

  return (
    <div ref={wrapperRef} className={cn('relative', wrapperClass)}>
      <button
        id={id}
        type="button"
        onClick={handleToggle}
        disabled={disabled}
        className={cn(
          INPUT_BASE,
          'text-left',
          padIfLeftIcon(Boolean(leftIcon)),
          padIfRightIcon(Boolean(rightIcon)),
          className,
          disabled && 'cursor-not-allowed opacity-60',
        )}
        role="combobox"
        aria-expanded={isOpen}
        aria-controls={`${id}-listbox`}
        aria-invalid={isInvalid || undefined}
        aria-disabled={disabled || undefined}
      >
        <span className={cn('inline-block', !selected && 'text-brand-gray-500/60')}>
          {selected ? selected.label : placeholderOption}
        </span>
      </button>

      {rightIcon && (
        <span
          className={cn(
            'text-brand-gray-400 pointer-events-none absolute inset-y-0 right-3 flex items-center',
            'transform transition-transform duration-200',
            isOpen ? 'rotate-180' : 'rotate-0',
          )}
        >
          {rightIcon}
        </span>
      )}

      {isOpen && !disabled && (
        <ul
          id={`${id}-listbox`}
          role="listbox"
          className={cn(
            'absolute z-10 mt-2 w-full rounded-md bg-white',
            'shadow-[0_10px_30px_3px_rgba(5,16,55,0.15)]',
          )}
        >
          {options.map((option) => {
            const isValue = String(selected?.value) === String(option.value);

            return (
              <li
                key={String(option.value)}
                role="option"
                aria-selected={isValue}
                aria-disabled={option.disabled || undefined}
                onClick={() => handleSelect(option)}
                className={cn(
                  'm-2 cursor-pointer rounded-md p-2',
                  'flex items-center gap-2 text-lg font-normal',
                  option.disabled && 'cursor-not-allowed opacity-50',
                  !isValue && !option.disabled && 'hover:bg-brand-deep-green-50',
                  isValue && 'bg-brand-deep-green-500 text-white',
                )}
              >
                {option.label}
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
}
