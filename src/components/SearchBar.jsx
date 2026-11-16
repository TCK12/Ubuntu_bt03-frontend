import { useState } from 'react';
import { Loader2, Search } from 'lucide-react';

export default function SearchBar({ onSearch, isSearching }) {
  const [keyword, setKeyword] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (keyword.trim()) onSearch(keyword);
  };

  return (
    <div className="search-container">
      <form className="search-form" onSubmit={handleSubmit}>
        <input
          type="text"
          className="search-input"
          placeholder="Nhập từ khóa tiếng Anh (VD: cyberpunk city, cat)..."
          value={keyword}
          onChange={(e) => setKeyword(e.target.value)}
          disabled={isSearching}
        />
        <button type="submit" className="search-btn" disabled={isSearching || !keyword.trim()}>
          {isSearching ? (
            <>
              <Loader2 size={18} className="animate-spin" />
              Đang vẽ...
            </>
          ) : (
            <>
              <Search size={18} />
              Tìm ảnh
            </>
          )}
        </button>
      </form>
    </div>
  );
}