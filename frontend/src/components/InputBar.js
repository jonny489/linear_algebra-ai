import { useRef, useEffect } from 'react';
import { SendIcon } from './Icons';

/* Fixed bottom input bar for typing questions */
function InputBar({ input, setInput, onSend, isLoading }) {
  const textareaRef = useRef(null);

  /* Auto-resize textarea height as user types */
  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto';
      textareaRef.current.style.height = `${Math.min(textareaRef.current.scrollHeight, 140)}px`;
    }
  }, [input]);

  /* Submit on Enter, allow Shift+Enter for newlines */
  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      onSend();
    }
  };

  return (
    <div className="input-area">
      <div className="input-wrapper">
        <textarea
          ref={textareaRef}
          className="input-field"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="Ask a question about linear algebra..."
          rows={1}
          disabled={isLoading}
        />
        <button
          className="send-btn"
          onClick={onSend}
          disabled={!input.trim() || isLoading}
        >
          <SendIcon />
        </button>
      </div>
    </div>
  );
}

export default InputBar;
