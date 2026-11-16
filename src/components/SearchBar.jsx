import { useState } from 'react';
import { Loader2 } from 'lucide-react';

export default function SearchBar({ onSearch, isSearching }) {
  const [keyword, setKeyword] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (keyword.trim()) onSearch(keyword);
  };

  return (
    <form onSubmit={handleSubmit} style={{ textAlign: 'center', margin: '30px 0' }}>
      <input
        type="text"
        placeholder="Nhập từ khóa tiếng Anh..."
        value={keyword}
        onChange={(e) => setKeyword(e.target.value)}
        disabled={isSearching}
        style={{ padding: '12px', width: '350px', borderRadius: '4px', border: '1px solid #ccc' }}
      />
      <button 
        type="submit" 
        disabled={isSearching} 
        style={{ padding: '12px 24px', marginLeft: '10px', cursor: isSearching ? 'not-allowed' : 'pointer' }}
      >
        {isSearching ? (
          <span style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <Loader2 size={16} className="animate-spin" /> Đang xử lý...
          </span>
        ) : (
          'Tìm kiếm ảnh'
        )}
      </button>
    </form>
  );
}