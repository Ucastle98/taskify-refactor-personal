// ActionChip.tsx

import PlusMark from '@/components/icons/PlusMark';

type ActionChipVariant = 'avatar' | 'task' | 'column';

interface ActionChipProps {
  onClick: () => void;
  label?: string;
  variant?: ActionChipVariant;
  className?: string;
  text?: string;
}

const VARIANT_STYLES: Record<ActionChipVariant, { button: string; plus: string; text?: string }> = {
  avatar: {
    // 마이페이지 이미지 추가 + 버튼
    button: 'w-19 h-19 rounded-xl bg-[#F1EFFD] text-[#5534DA]',
    plus: 'text-2xl font-bold -translate-y-[1px]',
  },
  task: {
    // 할 일 생성 이미지 추가 + 버튼
    button: 'w-14 h-14 rounded-xl bg-[#F1EFFD] text-[#5534DA]',
    plus: 'text-xl font-bold -translate-y-[1px]',
  },
  column: {
    // 컬럼 생성 + 버튼
    button:
      'w-70 h-12.5 rounded-[8px] bg-white text-[#5534DA] border border-[#D9D9D9] flex items-center justify-center',
    plus: 'ml-4 flex items-center justify-center w-6 h-6 bg-[#F1EFFD] rounded-[4px] group-hover:bg-gray-300',
    text: 'text-lg font-bold text-[#333236]',
  },
};

export default function ActionChip({
  onClick,
  label,
  variant = 'task',
  className = '',
  text,
}: ActionChipProps) {
  const styles = VARIANT_STYLES[variant];
  const contentText = text ?? (variant === 'column' ? '새로운 컬럼 추가하기' : undefined);

  return (
    <button
      type="button"
      aria-label={label ?? contentText ?? 'Add'}
      onClick={onClick}
      className={`group hover:bg-gray-300 ${styles.button} ${className}`}
    >
      {contentText && <span className={styles.text}>{contentText}</span>}

      {variant === 'column' ? (
        <span className={`${styles.plus} group-hover:bg-gray-300`}>
          <PlusMark size={11} thickness={2} />
        </span>
      ) : (
        <span className={styles.plus}>+</span>
      )}
    </button>
  );
}
