import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { Prism as SyntaxHighlighter } from 'prism-react-renderer';
import { FiCopy, FiShare2, FiChevronLeft } from 'react-icons/fi';
import { toast } from 'react-hot-toast';

const ViewPage = () => {
  const { id } = useParams();
  const allPastes = useSelector((state) => state.paste.pastes);
  const paste = allPastes.find((paste) => paste._id === id);
  const [title, setTitle] = useState(paste?.title || '');
  const [value, setValue] = useState(paste?.content || '');

  const handleCopy = () => {
    navigator.clipboard.writeText(value);
    toast.success('Copied to clipboard!');
  };

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: title,
        text: value,
        url: window.location.href
      }).catch(() => toast.error('Share cancelled'));
    } else {
      toast.error('Web Share API not supported');
    }
  };

  if (!paste) return <div className="p-4 text-red-400">Paste not found</div>;

  return (
    <div className="max-w-4xl mx-auto p-4">
      <div className="flex items-center mb-6">
        <a href="/" className="flex items-center text-blue-400 hover:text-blue-300 mr-4">
          <FiChevronLeft className="mr-1" /> Back
        </a>
        <h1 className="text-2xl font-bold text-gray-100">{title}</h1>
      </div>

      <div className="bg-gray-800 rounded-lg p-4 mb-4">
        <div className="flex justify-between items-center mb-4">
          <span className="text-sm text-gray-400">
            Created: {new Date(paste.createdAt).toLocaleString()}
          </span>
          <div className="flex space-x-2">
            <button
              onClick={handleCopy}
              className="flex items-center px-3 py-1 bg-gray-700 rounded hover:bg-gray-600 text-gray-200"
            >
              <FiCopy className="mr-1" /> Copy
            </button>
            <button
              onClick={handleShare}
              className="flex items-center px-3 py-1 bg-gray-700 rounded hover:bg-gray-600 text-gray-200"
            >
              <FiShare2 className="mr-1" /> Share
            </button>
          </div>
        </div>

        <div className="bg-gray-900 rounded p-4 overflow-auto">
          <pre className="text-gray-100 font-mono text-sm whitespace-pre-wrap">
            {value}
          </pre>
        </div>
      </div>
    </div>
  );
};

export default ViewPage;