import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { removeFromPastes } from '../redux/pasteSlice';
import { toast } from 'react-hot-toast';
import { FiEdit, FiTrash2, FiCopy, FiShare2, FiSearch } from 'react-icons/fi';

const Paste = () => {
  const pastes = useSelector((state) => state.paste.pastes);
  const [searchTerm, setSearchTerm] = useState('');
  const dispatch = useDispatch();

  const filteredPastes = pastes.filter((paste) => {
    return paste.title.toLowerCase().includes(searchTerm.toLowerCase());
  });

  const handleDelete = (pasteId) => {
    if (window.confirm('Are you sure you want to delete this paste?')) {
      dispatch(removeFromPastes(pasteId));
      toast.success('Paste deleted');
    }
  };

  const handleCopy = (content) => {
    navigator.clipboard.writeText(content);
    toast.success('Copied to clipboard!');
  };

  const handleShare = (paste) => {
    if (navigator.share) {
      navigator.share({
        title: paste.title,
        text: paste.content,
        url: window.location.href
      }).catch(() => toast.error('Share cancelled'));
    } else {
      toast.error('Web Share API not supported');
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-4">
      <h1 className="text-2xl font-bold text-gray-100 mb-6">Your Pastes</h1>

      <div className="relative mb-6">
        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
          <FiSearch className="text-gray-400" />
        </div>
        <input
          className="w-full pl-10 p-3 bg-gray-800 border border-gray-700 rounded-lg text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
          type="search"
          placeholder="Search pastes..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      {filteredPastes.length === 0 ? (
        <div className="text-center py-10 text-gray-400">
          {searchTerm ? 'No matching pastes found' : 'No pastes available'}
        </div>
      ) : (
        <div className="space-y-4">
          {filteredPastes.map((paste) => (
            <div key={paste._id} className="bg-gray-800 rounded-lg overflow-hidden border border-gray-700">
              <div className="p-4">
                <div className="flex justify-between items-start mb-2">
                  <h3 className="text-lg font-medium text-gray-100 break-all">{paste.title}</h3>
                  <span className="text-xs text-gray-400 whitespace-nowrap ml-2">
                    {new Date(paste.createdAt).toLocaleDateString()}
                  </span>
                </div>
                
                <div className="bg-gray-900 rounded p-3 mb-3 max-h-40 overflow-y-auto">
                  <pre className="text-gray-300 text-sm font-mono whitespace-pre-wrap break-all">
                    {paste.content.length > 200 
                      ? `${paste.content.substring(0, 200)}...` 
                      : paste.content}
                  </pre>
                </div>

                <div className="flex flex-wrap gap-2">
                  <a
                    href={`/?pasteId=${paste._id}`}
                    className="flex items-center px-3 py-1 bg-blue-600 hover:bg-blue-700 rounded text-white text-sm"
                  >
                    <FiEdit className="mr-1" /> Edit
                  </a>
                  <a
                    href={`/pastes/${paste._id}`}
                    className="flex items-center px-3 py-1 bg-gray-700 hover:bg-gray-600 rounded text-gray-200 text-sm"
                  >
                    View Full
                  </a>
                  <button
                    onClick={() => handleDelete(paste._id)}
                    className="flex items-center px-3 py-1 bg-red-600 hover:bg-red-700 rounded text-white text-sm"
                  >
                    <FiTrash2 className="mr-1" /> Delete
                  </button>
                  <button
                    onClick={() => handleCopy(paste.content)}
                    className="flex items-center px-3 py-1 bg-gray-700 hover:bg-gray-600 rounded text-gray-200 text-sm"
                  >
                    <FiCopy className="mr-1" /> Copy
                  </button>
                  <button
                    onClick={() => handleShare(paste)}
                    className="flex items-center px-3 py-1 bg-gray-700 hover:bg-gray-600 rounded text-gray-200 text-sm"
                  >
                    <FiShare2 className="mr-1" /> Share
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Paste;