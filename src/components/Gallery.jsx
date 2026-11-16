import { Image as ImageIcon } from 'lucide-react';

export default function Gallery({ images, page, setPage }) {
  if (!images || images.length === 0) {
    return (
      <div className="empty-state">
        <ImageIcon size={48} style={{ margin: '0 auto 15px', opacity: 0.2 }} />
        <h3>Chưa có hình ảnh nào</h3>
        <p>Hãy nhập từ khóa để AI bắt đầu sáng tạo.</p>
      </div>
    );
  }

  return (
    <div className="gallery-section">
      <div className="gallery-grid">
        {images.map((img) => (
          <div className="image-card" key={img.id}>
            <div className="image-wrapper">
              <img src={img.url} alt={img.prompt_en} loading="lazy" />
            </div>
            <div className="image-info">
              <div className="image-prompt" title={img.prompt_en}>
                {img.prompt_en}
              </div>
              <div className="badge-ai">Worker {img.ai_code}</div>
              <div className="image-meta">
                ID: #{img.id}
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="pagination">
        <button className="page-btn" disabled={page === 1} onClick={() => setPage(page - 1)}>
          &laquo; Trang trước
        </button>
        <div className="page-indicator">Trang {page}</div>
        <button className="page-btn" disabled={images.length < 50} onClick={() => setPage(page + 1)}>
          Trang tiếp &raquo;
        </button>
      </div>
    </div>
  );
}