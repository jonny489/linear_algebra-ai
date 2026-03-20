/* Animated loading indicator shown while waiting for AI response */
function LoadingDots() {
  return (
    <div className="message ai">
      <span className="message-label">Tutor</span>
      <div className="message-bubble">
        <div className="loading-dots">
          <span />
          <span />
          <span />
        </div>
      </div>
    </div>
  );
}

export default LoadingDots;
