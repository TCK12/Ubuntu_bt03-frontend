import { useState, useEffect } from 'react';
import axios from 'axios';
import SearchBar from './components/SearchBar';
import Gallery from './components/Gallery';
import FooterStats from './components/FooterStats';
import './style.css'; // Quan trọng: Import file CSS mới

const API_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:8000';
const api = axios.create({ baseURL: API_URL });

function App() {
  const [images, setImages] = useState([]);
  const [stats, setStats] = useState([]);
  const [page, setPage] = useState(1);
  const [isSearching, setIsSearching] = useState(false);

  useEffect(() => {
    fetchImages(page);
    fetchStats();
  }, [page]);

  const fetchImages = async (p) => {
    try {
      const res = await api.get(`/api/images?page=${p}&limit=50`);
      setImages(res.data);
    } catch (error) {
      console.error("Lỗi lấy dữ liệu ảnh", error);
    }
  };

  const fetchStats = async () => {
    try {
      const res = await api.get('/api/stats');
      setStats(res.data);
    } catch (error) {
      console.error("Lỗi lấy thống kê", error);
    }
  };

  const handleSearch = async (keyword) => {
    setIsSearching(true);
    try {
      await api.get(`/api/search?q=${keyword}`);
      setPage(1);
      fetchImages(1);
      fetchStats();
    } catch (error) {
      alert("Đã xảy ra lỗi kết nối AI hoặc timeout. Vui lòng thử lại!");
    } finally {
      setIsSearching(false);
    }
  };

  return (
    <div className="app-container">
      <header>
        <h1 className="header-title">Kho Ảnh Phân Tán</h1>
        <p className="header-subtitle">Khám phá vũ trụ Pixel Art được tạo ra từ sức mạnh đa AI</p>
      </header>
      
      <main>
        <SearchBar onSearch={handleSearch} isSearching={isSearching} />
        <Gallery images={images} page={page} setPage={setPage} />
      </main>

      <FooterStats stats={stats} />
    </div>
  );
}

export default App;