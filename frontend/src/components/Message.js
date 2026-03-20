import ReactMarkdown from 'react-markdown';
import remarkMath from 'remark-math';
import rehypeKatex from 'rehype-katex';
import 'katex/dist/katex.min.css';
import { SourceIcon } from './Icons';

/* Single chat message bubble with optional source tags.
   AI messages are rendered as markdown with LaTeX math support
   so expressions like $Ax = b$ and $$\det(A)$$ display correctly. */
function Message({ role, content, sources }) {
  return (
    <div className={`message ${role}`}>
      <span className="message-label">
        {role === 'user' ? 'You' : 'Tutor'}
      </span>
      <div className="message-bubble">
        {role === 'ai' ? (
          <ReactMarkdown remarkPlugins={[remarkMath]} rehypePlugins={[rehypeKatex]}>
            {content}
          </ReactMarkdown>
        ) : (
          content
        )}
      </div>
      {sources?.length > 0 && (
        <div className="message-sources">
          {sources.map((src, j) => (
            <span key={j} className="source-tag">
              <SourceIcon />
              {src}
            </span>
          ))}
        </div>
      )}
    </div>
  );
}

export default Message;
