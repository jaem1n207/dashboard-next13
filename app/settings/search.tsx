'use client';

import { MagnifyingGlassIcon } from '@heroicons/react/24/solid';
import { usePathname, useRouter } from 'next/navigation';
import { useTransition } from 'react';

const Search = () => {
  const { replace } = useRouter();
  const pathname = usePathname();
  const [isPending, startTransition] = useTransition();

  const handleSearch = (term: string) => {
    const params = new URLSearchParams(window.location.search);
    if (term) {
      params.set('q', term);
    } else {
      params.delete('q');
    }

    startTransition(() => {
      replace(`${pathname}?${params.toString()}`);
    });
  };

  return (
    <div className="relative max-w-md mt-5">
      <label htmlFor="search" className="sr-only">
        이름 또는 이메일로 검색...
      </label>
      <div className="rounded-md shadow-sm">
        <div
          className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none"
          aria-hidden="true">
          <MagnifyingGlassIcon className="w-4 h-4 mr-3 text-gray-400" aria-hidden="true" />
        </div>
        <input
          type="text"
          name="search"
          id="search"
          className="block w-full h-10 border border-gray-200 rounded-md pl-9 focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
          placeholder="파트너사 검색..."
          spellCheck={false}
          onChange={e => handleSearch(e.target.value)}
        />
      </div>

      {isPending && (
        <div className="absolute top-0 bottom-0 right-0 flex items-center justify-center">
          <svg
            className="w-5 h-5 mr-3 -ml-1 text-gray-700 animate-spin"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24">
            <circle
              className="opacity-25"
              cx="12"
              cy="12"
              r="10"
              stroke="currentColor"
              stroke-width="4"
            />
            <path
              className="opacity-75"
              fill="currentColor"
              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
            />
          </svg>
        </div>
      )}
    </div>
  );
};

export default Search;
