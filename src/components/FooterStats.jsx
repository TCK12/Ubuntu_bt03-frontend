export default function FooterStats({ stats }) {
  return (
    <footer style={{ marginTop: '50px', padding: '20px', backgroundColor: '#f8fafc', borderTop: '1px solid #e2e8f0', textAlign: 'center' }}>
      <h3 style={{ marginBottom: '15px' }}>Thống kê Đóng góp AI</h3>
      <div style={{ display: 'flex', justifyContent: 'center', gap: '30px', flexWrap: 'wrap' }}>
        {stats.length > 0 ? (
          stats.map((item) => (
            <span key={item.ai_code} style={{ backgroundColor: '#fff', padding: '8px 15px', borderRadius: '20px', boxShadow: '0 1px 3px rgba(0,0,0,0.1)' }}>
              <strong>AI {item.ai_code}</strong>: {item.count} ảnh
            </span>
          ))
        ) : (
          <span>Chưa có dữ liệu.</span>
        )}
      </div>
    </footer>
  );
}