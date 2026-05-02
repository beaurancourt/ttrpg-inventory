import { useState, useRef } from "react";

export function ImportCharactersModal({ show, onClose, onImport }) {
  const [text, setText] = useState("");
  const fileRef = useRef();

  if (!show) return null;

  const handleFile = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (ev) => setText(ev.target.result);
    reader.readAsText(file);
  };

  const handleSubmit = () => {
    if (!text.trim()) return;
    onImport(text);
    setText("");
    if (fileRef.current) fileRef.current.value = "";
  };

  const handleClose = () => {
    setText("");
    if (fileRef.current) fileRef.current.value = "";
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50 p-4">
      <div className="bg-gray-800 rounded-xl shadow-2xl p-6 w-full max-w-lg border border-gray-600">
        <h2 className="text-xl font-bold text-white mb-1">Import Characters</h2>
        <p className="text-sm text-gray-400 mb-4">
          Upload a JSON file or paste exported character JSON below. Characters will be appended to the current party.
        </p>

        <input
          ref={fileRef}
          type="file"
          accept=".json,application/json"
          onChange={handleFile}
          className="block w-full text-sm text-gray-300 mb-3 file:mr-3 file:py-1 file:px-3 file:rounded file:border-0 file:bg-gray-600 file:text-white file:cursor-pointer hover:file:bg-gray-500"
        />

        <textarea
          className="w-full h-48 bg-gray-700 border border-gray-500 rounded-lg p-3 text-sm font-mono text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-teal-500 resize-none"
          placeholder='[{ "name": "Aragorn", "containers": [...] }]'
          value={text}
          onChange={(e) => setText(e.target.value)}
        />

        <div className="flex justify-end gap-3 mt-4">
          <button
            onClick={handleClose}
            className="px-4 py-2 text-sm bg-gray-600 hover:bg-gray-500 text-white rounded-lg transition-colors"
          >
            Cancel
          </button>
          <button
            onClick={handleSubmit}
            disabled={!text.trim()}
            className="px-4 py-2 text-sm bg-teal-600 hover:bg-teal-700 text-white rounded-lg transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
          >
            Import
          </button>
        </div>
      </div>
    </div>
  );
}
