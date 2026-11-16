import { Cpu } from 'lucide-react';

export default function FooterStats({ stats }) {
  return (
    <footer className="footer-stats">
      <div className="stats-container">
        <h3 className="stats-title">Thống kê Đóng góp hệ thống AI</h3>
        <div className="stats-grid">
          {stats.length > 0 ? (
            stats.map((item) => (
              <div className="stat-pill" key={item.ai_code}>
                <Cpu size={16} />
                <span>AI {item.ai_code}</span>
                <span className="stat-count">{item.count}</span>
              </div>
            ))
          ) : (
            <span style={{ color: '#64748b' }}>Hệ thống đang chờ dữ liệu...</span>
          )}
        </div>
      </div>
    </footer>
  );
}