import { useCallback, useEffect, useRef } from 'react';
import { useRouter, usePathname, useSearchParams } from 'next/navigation';

export const useSearch = () => {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  
  const currentKeyword = searchParams.get('keyword') || '';
  const keywordRef = useRef(currentKeyword);
  const debounceRef = useRef<number | null>(null);
  const inputRef = useRef<HTMLInputElement | null>(null);

  const navigateWithKeyword = useCallback(
    (rawKeyword: string, method: 'push' | 'replace') => {
      const kw = rawKeyword.trim();
      const params = new URLSearchParams(searchParams.toString());

      if (kw) {
        params.set('keyword', kw);
      } else {
        params.delete('keyword');
      }

      const query = params.toString();
      
      const targetPath = pathname; 
      
      const nextUrl = query ? `${targetPath}?${query}` : targetPath;
      const currentQuery = searchParams.toString();
      const currentUrl = currentQuery ? `${pathname}?${currentQuery}` : pathname;

      if (nextUrl === currentUrl) return;

      if (method === 'replace') {
        router.replace(nextUrl);
        return;
      }

      router.push(nextUrl);
    },
    [pathname, router, searchParams]
  );

  const handleAutoSearch = useCallback(
    (nextKeyword: string) => {
      keywordRef.current = nextKeyword;

      if (debounceRef.current !== null) {
        window.clearTimeout(debounceRef.current);
      }

      debounceRef.current = window.setTimeout(() => {
        navigateWithKeyword(nextKeyword, 'replace');
      }, 300);
    },
    [navigateWithKeyword]
  );

  useEffect(() => {
    keywordRef.current = currentKeyword;
    if (inputRef.current && document.activeElement !== inputRef.current) {
      inputRef.current.value = currentKeyword;
    }
  }, [currentKeyword]);

  useEffect(
    () => () => {
      if (debounceRef.current !== null) {
        window.clearTimeout(debounceRef.current);
      }
    },
    []
  );

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (debounceRef.current !== null) {
      window.clearTimeout(debounceRef.current);
      debounceRef.current = null;
    }
    navigateWithKeyword(keywordRef.current, 'push');
  };

  return {
    currentKeyword,
    inputRef,
    handleAutoSearch,
    handleSearch,
  };
};