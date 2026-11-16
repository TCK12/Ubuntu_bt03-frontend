import { useState, useEffect } from 'react';
import axios from 'axios';
import SearchBar from './components/SearchBar';
import Gallery from './components/Gallery';
import FooterStats from './components/FooterStats';

// Khởi tạo instance kết nối tới Backend (Sửa IP này thành IP của máy chạy FastAPI sau)
const API_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:8000';
const api = axios.create({ baseURL: API_URL });

function App() {
  const [images, setImages] = useState([]);
  const [stats, setStats] = useState([]);
  const [page, setPage] = useState(1);
  const [isSearching, setIsSearching] = useState(false);

  // Tự động lấy danh sách ảnh và thống kê mỗi khi biến 'page' thay đổi
  useEffect(() => {
    fetchImages(page);
    fetchStats();
  }, [page]);

  const fetchImages = async (p) => {
    try {
      const res = await api.get(`/api/images?page=${p}&limit=50`);
      setImages(res.data); // Dữ liệu giả định: [{id: 1, url: '...', filename: '...', prompt_en: '...'}, ...]
    } catch (error) {
      console.error("Lỗi lấy dữ liệu ảnh", error);
    }
  };

  const fetchStats = async () => {
    try {
      const res = await api.get('/api/stats');
      setStats(res.data); // Dữ liệu giả định: [{ai_code: '1.1', count: 500}, ...]
    } catch (error) {
      console.error("Lỗi lấy thống kê", error);
    }
  };

  const handleSearch = async (keyword) => {
    setIsSearching(true);
    try {
      // Logic: Nếu tìm thấy, backend trả ngay. Nếu chưa có, backend báo Worker chạy và giữ kết nối tới khi sinh xong.
      await api.get(`/api/search?q=${keyword}`);
      
      // Khi API hoàn tất (ảnh đã lưu xong vào MinIO và DB), quay về trang 1 và tải lại dữ liệu mới nhất
      setPage(1);
      fetchImages(1);
      fetchStats();
    } catch (error) {
      alert("Đã xảy ra lỗi khi sinh ảnh. Vui lòng thử lại!");
    } finally {
      setIsSearching(false);
    }
  };

  return (
    <div style={{ maxWidth: '1400px', margin: '0 auto', padding: '20px', fontFamily: 'sans-serif' }}>
      <h1 style={{ textAlign: 'center', color: '#1e293b' }}>Bách Khoa Toàn Thư Phân Tán</h1>
      
      <SearchBar onSearch={handleSearch} isSearching={isSearching} />
      <Gallery images={images} page={page} setPage={setPage} />
      <FooterStats stats={stats} />
    </div>
  );
}

export default App;