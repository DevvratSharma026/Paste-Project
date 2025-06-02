import React, { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { addToPastes, updateToPaste } from '../redux/pasteSlice';
import { FiSave, FiEdit } from 'react-icons/fi';

const Home = () => {
  const [title, setTitle] = useState('');
  const [value, setValue] = useState('');
  const [searchParams, setSearchParams] = useSearchParams();
  const pasteId = searchParams.get('pasteId');
  const dispatch = useDispatch();
  const allPastes = useSelector((state) => state.paste.pastes);

  useEffect(() => {
    if (pasteId) {
      const paste = allPastes.find((paste) => paste._id === pasteId);
      setTitle(paste?.title || '');
      setValue(paste?.content || '');
    }
  }, [pasteId]);

  function createPaste() {
    if (!title.trim() || !value.trim()) return;

    const paste = {
      title: title,
      content: value,
      _id: pasteId || Date.now().toString(36),
      createdAt: new Date().toISOString(),
    };

    if (pasteId) {
      dispatch(updateToPaste(paste));
    } else {
      dispatch(addToPastes(paste));
    }

    setTitle('');
    setValue('');
    setSearchParams({});
  }

  return (
    <div className="max-w-4xl mx-auto p-4">
      <h1 className="text-2xl font-bold text-gray-100 mb-6">
        {pasteId ? 'Edit Paste' : 'Create New Paste'}
      </h1>

      <div className="mb-6">
        <input
          className="w-full p-3 bg-gray-800 border border-gray-700 rounded-lg text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
          type="text"
          placeholder="Enter title here"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
      </div>

      <div className="mb-6">
        <textarea
          className="w-full p-3 bg-gray-800 border border-gray-700 rounded-lg text-gray-100 font-mono focus:outline-none focus:ring-2 focus:ring-blue-500"
          value={value}
          placeholder="Enter your text here"
          onChange={(e) => setValue(e.target.value)}
          rows={15}
        />
      </div>

      <button
        onClick={createPaste}
        className="flex items-center px-4 py-2 bg-blue-600 hover:bg-blue-700 rounded-lg text-white font-medium"
      >
        {pasteId ? (
          <>
            <FiEdit className="mr-2" /> Update Paste
          </>
        ) : (
          <>
            <FiSave className="mr-2" /> Create Paste
          </>
        )}
      </button>
    </div>
  );
};

export default Home;