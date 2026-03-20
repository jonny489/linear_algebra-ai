import { useState, useRef, useEffect } from 'react';
import './App.css';

import Header from './components/Header';
import ChatContainer from './components/ChatContainer';
import InputBar from './components/InputBar';

const API_BASE = 'http://localhost:8000/api';

function App() {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [uploadedFiles, setUploadedFiles] = useState([]);
  const [uploadStatus, setUploadStatus] = useState(null);
  const [isUploading, setIsUploading] = useState(false);

  const messagesEndRef = useRef(null);

  /* Auto-scroll to latest message */
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isLoading]);

  /* Handle PDF file upload */
  const handleUpload = async (file) => {
    if (!file) return;

    if (!file.name.endsWith('.pdf')) {
      setUploadStatus({ type: 'error', text: 'Only PDF files are supported.' });
      return;
    }

    setIsUploading(true);
    setUploadStatus(null);

    try {
      const formData = new FormData();
      formData.append('file', file);

      const res = await fetch(`${API_BASE}/upload`, {
        method: 'POST',
        body: formData,
      });

      if (!res.ok) {
        const err = await res.json();
        throw new Error(err.detail || 'Upload failed.');
      }

      setUploadedFiles((prev) => [...prev, file.name]);
      setUploadStatus({ type: 'success', text: `"${file.name}" processed.` });
    } catch (err) {
      setUploadStatus({ type: 'error', text: err.message });
    } finally {
      setIsUploading(false);
    }
  };

  /* Send a question to the query endpoint */
  const handleSend = async () => {
    const question = input.trim();
    if (!question || isLoading) return;

    setMessages((prev) => [...prev, { role: 'user', content: question }]);
    setInput('');
    setIsLoading(true);

    try {
      const res = await fetch(`${API_BASE}/query`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ question }),
      });

      if (!res.ok) {
        throw new Error('Failed to get a response.');
      }

      const data = await res.json();
      setMessages((prev) => [
        ...prev,
        { role: 'ai', content: data.answer, sources: data.sources || [] },
      ]);
    } catch (err) {
      setMessages((prev) => [
        ...prev,
        { role: 'ai', content: `Error: ${err.message}`, sources: [] },
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="app">
      <Header
        onUpload={handleUpload}
        isUploading={isUploading}
        uploadStatus={uploadStatus}
        uploadedFiles={uploadedFiles}
      />

      <ChatContainer
        messages={messages}
        isLoading={isLoading}
        messagesEndRef={messagesEndRef}
      />

      <InputBar
        input={input}
        setInput={setInput}
        onSend={handleSend}
        isLoading={isLoading}
      />
    </div>
  );
}

export default App;
