import { useState } from "react";
import { marked } from "https://cdn.jsdelivr.net/npm/marked/lib/marked.esm.js";
import DOMPurify from "dompurify";
import "./App.css";
import { exampleData } from "./data/exampleData";
function App() {
  const [editorText, setEditorText] = useState(exampleData);
  const handleTextareaChange = (event) => {
    const { value } = event.target;
    setEditorText(value);
  };
  const insertTabCharacter = (e) => {
    const { value, selectionEnd } = e;

    // Insert tab character
    e.value = `${value.substring(0, selectionEnd)}\t${value.substring(
      selectionEnd
    )}`;

    // Move cursor to new position
    e.selectionStart = e.selectionEnd = selectionEnd + 1;
  };

  return (
    <div className="App">
      <div className="editor-container gen-container">
        <h1 className="editor-title">Editor:</h1>
        <textarea
          id="editor"
          value={editorText}
          onChange={handleTextareaChange}
          onKeyDown={(e) => {
            if (e.key === "Tab") {
              e.preventDefault();
              insertTabCharacter(e.target);
            }
          }}
        />
      </div>
      <div className="preview-container gen-container">
        <h1 className="preview-title">Preview</h1>
        <div
          id="preview"
          dangerouslySetInnerHTML={{
            __html: DOMPurify.sanitize(marked.parse(editorText)),
          }}
        ></div>
        {console.log(
          marked.parse(
            editorText.replace(/^[\u200B\u200C\u200D\u200E\u200F\uFEFF]/, "")
          )
        )}
      </div>
    </div>
  );
}

export default App;
