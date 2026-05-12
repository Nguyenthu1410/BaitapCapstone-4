import { Suspense } from 'react';
import SearchResult from '../../../components/SearchResult';

export default function SearchPage() {
  return (
    <main className="min-h-screen bg-[#f4f7f9]">
      <div className="py-4">
        <Suspense
          fallback={
            <div className="max-w-7xl mx-auto px-4 py-16 flex items-center justify-center">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
              <span className="ml-3 text-gray-600">Đang tải...</span>
            </div>
          }
        >
          <SearchResult />
        </Suspense>
      </div>
    </main>
  );
}
