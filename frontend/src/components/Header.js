import { useRef } from 'react';
import { UploadIcon, FileIcon } from './Icons';

/* Header bar with title and PDF upload controls */
function Header({ onUpload, isUploading, uploadStatus, uploadedFiles }) {
  const fileInputRef = useRef(null);

  const handleFileChange = (e) => {
    const file = e.target.files?.[0];
    onUpload(file);
    /* Reset so the same file can be re-uploaded */
    if (fileInputRef.current) fileInputRef.current.value = '';
  };

  return (
    <header className="header">
      <div className="header-title">
        <h1>Linear Algebra Tutor</h1>
        <span>AI-powered learning assistant</span>
      </div>

      <div className="upload-section">
        <input
          ref={fileInputRef}
          type="file"
          accept=".pdf"
          onChange={handleFileChange}
          hidden
        />

        <button
          className={`upload-btn ${isUploading ? 'uploading' : ''}`}
          onClick={() => fileInputRef.current?.click()}
          disabled={isUploading}
        >
          <UploadIcon />
          {isUploading ? 'Processing...' : 'Upload PDF'}
        </button>

        {uploadStatus && (
          <span className={`upload-status ${uploadStatus.type}`}>
            {uploadStatus.text}
          </span>
        )}

        <div className="uploaded-files">
          {uploadedFiles.map((name, i) => (
            <span key={i} className="file-chip">
              <FileIcon />
              {name}
            </span>
          ))}
        </div>
      </div>
    </header>
  );
}

export default Header;
