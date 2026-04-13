/**
 * cursor 기반 infinite scroll을 처리하는 훅
 * - IntersectionObserver로 자동 로딩
 * - 중복 요청 방지
 * - reset 지원
 */
import type { RefObject } from 'react';
import { useCallback, useEffect, useRef, useState } from 'react';

// API 응답 형태(서버에서 받아온 아이템 + 다음 커서)
export interface InfiniteScrollPage<Item> {
  items: Item[];
  nextCursor: number | null;
}

// 훅을 동작하는 인터페이스
export interface UseInfiniteScrollOptions<Item> {
  fetchPage: (cursor: number | null) => Promise<InfiniteScrollPage<Item>>;
  initialCursor?: number | null;
  enabled?: boolean;
  immediate?: boolean;
  root?: Element | null;
  rootMargin?: string;
  threshold?: number;
}

// 반환값 인터페이스
export interface UseInfiniteScrollResult<Item> {
  items: Item[];
  isLoading: boolean;
  error: Error | null;
  hasMore: boolean;
  sentinelRef: RefObject<HTMLDivElement | null>;
  loadMore: () => Promise<void>;
  reset: () => void;
}

export const useInfiniteScroll = <Item>({
  fetchPage,
  initialCursor = null,
  enabled = true,
  immediate = true,
  root = null,
  rootMargin = '200px',
  threshold = 0,
}: UseInfiniteScrollOptions<Item>): UseInfiniteScrollResult<Item> => {
  const [items, setItems] = useState<Item[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);
  const [hasMore, setHasMore] = useState(true);

  // 리스트의 끝을 감지하기 위한 sentinel element
  // 이 요소가 viewport에 들어오면 다음 페이지를 로드
  const sentinelRef = useRef<HTMLDivElement | null>(null);
  // re-render 없이 현재 cursor를 유지하기 위해 ref 사용
  const nextCursorRef = useRef<number | null>(initialCursor);
  // 동시에 여러 요청이 발생하는 것을 막기 위한 lock
  const isFetchingRef = useRef(false);
  const didInitialLoadRef = useRef(false);

  // 데이터 가져오기
  const loadMore = useCallback(async () => {
    // 훅이 비활성화 되어있다면
    if (!enabled) {
      return;
    }

    // IntersectionObserver가 여러 번 실행될 수 있기 때문에
    // 이미 진행 중인 요청이 있으면 추가 요청 방지
    if (isFetchingRef.current) {
      return;
    }

    // 더 이상 가져올 데이터가 없다면
    if (!hasMore) {
      return;
    }

    isFetchingRef.current = true;
    setIsLoading(true);
    setError(null);

    try {
      // fetchPage:
      // - cursor를 받아 다음 페이지를 반환해야 함
      // - nextCursor가 null이면 더 이상 데이터 없음
      // - 동일 cursor에 대해 중복 데이터가 오지 않아야 함
      const page = await fetchPage(nextCursorRef.current);

      setItems((prev) => [...prev, ...page.items]);
      // 다음 페이지 커서 업데이트(현재 가져온 페이지 표시)
      nextCursorRef.current = page.nextCursor;
      // 다음 페이지가 있다면 hasMore true
      setHasMore(page.nextCursor !== null);
    } catch (unknownError) {
      const normalizedError =
        unknownError instanceof Error ? unknownError : new Error('Failed to load more data.');
      setError(normalizedError);
    } finally {
      isFetchingRef.current = false;
      setIsLoading(false);
    }
  }, [enabled, fetchPage, hasMore]);

  useEffect(() => {
    if (!enabled || !immediate || didInitialLoadRef.current) {
      return;
    }

    didInitialLoadRef.current = true;
    void loadMore();
  }, [enabled, immediate, loadMore]);

  useEffect(() => {
    if (!enabled) {
      return;
    }

    // IntersectionObserver가 감지할 대상(마지막 아이템)을 찾음
    const target = sentinelRef.current;
    // 없으면 훅 종료
    if (!target) {
      return;
    }

    // target이 화면에 들어왔는지 감시
    const observer = new IntersectionObserver(
      (entries) => {
        const firstEntry = entries[0];

        if (firstEntry?.isIntersecting) {
          loadMore();
        }
      },
      {
        root,
        rootMargin,
        threshold,
      },
    );

    // 감시 시작
    observer.observe(target);

    return () => {
      observer.unobserve(target);
      observer.disconnect();
    };
  }, [enabled, loadMore, root, rootMargin, threshold]);

  // 데이터를 다시 불러와야 할 때, 초기화
  const reset = useCallback(() => {
    setItems([]);
    setError(null);
    setHasMore(true);
    setIsLoading(false);

    nextCursorRef.current = initialCursor;
    isFetchingRef.current = false;
    didInitialLoadRef.current = false;
  }, [initialCursor]);

  return {
    items,
    isLoading,
    error,
    hasMore,
    sentinelRef,
    loadMore,
    reset,
  };
};
