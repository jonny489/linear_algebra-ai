import Message from './Message';
import LoadingDots from './LoadingDots';

/* Displays chat messages or an empty state prompt */
function ChatContainer({ messages, isLoading, messagesEndRef }) {
  const isEmpty = messages.length === 0 && !isLoading;

  if (isEmpty) {
    return (
      <div className="chat-container">
        <div className="chat-empty">
          <div className="chat-empty-icon">Ax = b</div>
          <h2>Ask me anything about linear algebra</h2>
          <p>
            Upload a PDF textbook, then ask questions. I'll find relevant
            sections and explain them to you.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="chat-container">
      <div className="chat-messages">
        {messages.map((msg, i) => (
          <Message
            key={i}
            role={msg.role}
            content={msg.content}
            sources={msg.sources}
          />
        ))}

        {isLoading && <LoadingDots />}

        <div ref={messagesEndRef} />
      </div>
    </div>
  );
}

export default ChatContainer;
