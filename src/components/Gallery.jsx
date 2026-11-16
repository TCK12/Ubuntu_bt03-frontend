export default function Gallery({ images, page, setPage }) {
  return (
    <div className="gallery-section">
      <div style={{ 
        display: 'grid', 
        gridTemplateColumns: 'repeat(auto-fill, minmax(180px, 1fr))', 
        gap: '15px' 
      }}>
        {images.map((img) => (
          <div key={img.id} style={{ border: '1px solid #ddd', padding: '5px', borderRadius: '8px' }}>
            <img 
              src={img.url} 
              alt={img.prompt_en} 
              style={{ width: '100%', height: '180px', objectFit: 'cover', borderRadius: '4px' }} 
            />
            <p style={{ fontSize: '12px', textAlign: 'center', margin: '5px 0 0 0', color: '#555' }}>
              {img.filename}
            </p>
          </div>
        ))}
      </div>

      <div style={{ display: 'flex', justifyContent: 'center', gap: '20px', marginTop: '30px' }}>
        <button disabled={page === 1} onClick={() => setPage(page - 1)}>
          &laquo; Trang trước
        </button>
        <span style={{ padding: '5px 10px', fontWeight: 'bold' }}>Trang {page}</span>
        {/* Vô hiệu hóa nút Next nếu số ảnh trả về ít hơn 50 (nghĩa là đã hết data) */}
        <button disabled={images.length < 50} onClick={() => setPage(page + 1)}>
          Trang tiếp &raquo;
        </button>
      </div>
    </div>
  );
}