// ErrorPage.js
import React from "react";

function ErrorPage() {
  const marginBottom = {
    marginBottom: "10px",
  };

  return (
    <div>
      <h1 style={marginBottom}>Oops! Something went wrong.</h1>
      <p style={marginBottom}>Please try again later.</p>
      <button style={marginBottom} onClick={() => window.location.reload()}>
        Retry
      </button>
    </div>
  );
}

export default ErrorPage;
