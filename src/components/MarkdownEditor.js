import React, { useState, useEffect } from "react";

function parseMarkdown(markdown) {
  let html = markdown;

  // Escape basic HTML special chars first
  html = html
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;");

  // Headings
  html = html.replace(/^###### (.*)$/gim, "<h6>$1</h6>");
  html = html.replace(/^##### (.*)$/gim, "<h5>$1</h5>");
  html = html.replace(/^#### (.*)$/gim, "<h4>$1</h4>");
  html = html.replace(/^### (.*)$/gim, "<h3>$1</h3>");
  html = html.replace(/^## (.*)$/gim, "<h2>$1</h2>");
  html = html.replace(/^# (.*)$/gim, "<h1>$1</h1>");

  // Bold and italic
  html = html.replace(/\*\*\*(.*?)\*\*\*/gim, "<strong><em>$1</em></strong>");
  html = html.replace(/\*\*(.*?)\*\*/gim, "<strong>$1</strong>");
  html = html.replace(/\*(.*?)\*/gim, "<em>$1</em>");

  // Inline code
  html = html.replace(/`(.*?)`/gim, "<code>$1</code>");

  // Line breaks
  html = html.replace(/\n/g, "<br />");

  return html;
}

function MarkdownEditor() {
  const [markdown, setMarkdown] = useState("");
  const [html, setHtml] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    const timer = setTimeout(() => {
      setHtml(parseMarkdown(markdown));
      setLoading(false);
    }, 0);

    return () => clearTimeout(timer);
  }, [markdown]);

  const handleChange = (e) => {
    setMarkdown(e.target.value);
  };

  return (
    <div className="markdown-editor">
      <textarea
        className="textarea"
        value={markdown}
        onChange={handleChange}
        placeholder="Write your markdown here..."
      />
      {loading ? (
        <div className="loading">Loading...</div>
      ) : (
        <div
          className="preview"
          dangerouslySetInnerHTML={{ __html: html }}
        />
      )}
    </div>
  );
}

export default MarkdownEditor;
