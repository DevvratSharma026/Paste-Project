import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useState } from 'react';
import { removeFromPastes } from '../redux/pasteSlice';
import { toast } from 'react-hot-toast';

const Paste = () => {

  const pastes = useSelector((state) => state.paste.pastes);
  const [searchTerm, setSearchTerm] = useState('');
  const dispatch = useDispatch();

  const filterData = pastes.filter((paste) => {
    return paste.title.toLowerCase().includes(searchTerm.toLowerCase());
  });

  function handleDelete(pasteId) {
    dispatch(removeFromPastes(pasteId));
  }

  return (
    <div>
      {/* we gonna show all the pastes here */}
      <input
        className='border-2 border-white rounded-xl p-2 min-w-[600px] mt-5'
        type='search'
        placeholder='Search'
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />

      <div className='flex flex-col gap-5 mt-5'>
        {
          filterData.length > 0 &&
          filterData.map((paste) => {
            return (
              <div key={paste?._id} className='border-2 border-white rounded-xl p-2 min-w-[600px]'>
                <div>{paste.title}</div>
                <div>{paste.content}</div>
                <div className='flex flx-row gap-4 place-content-evenly'>

                  <button>
                    <a href={`/?pasteId=${paste?._id}`}>Edit</a>
                  </button>

                  <button>
                    <a href={`/pastes/${paste?._id}`}>View</a>
                  </button>

                  <button onClick={() => handleDelete(paste?._id)}>Delete</button>

                  <button onClick={() => {
                    navigator.clipboard.writeText(paste?.content);
                    toast.success("Copied to clipboard");
                  }}>Copy</button>

                  <button onClick={() => {
                    if (navigator.share) {
                      navigator.share({
                        title: paste.title,
                        text: paste.content,
                        url: window.location.href
                      }).then(() => {
                        toast.success("Paste shared successfully!");
                      }).catch((error) => {
                        toast.error("Share cancelled or failed");
                      });
                    } else {
                      toast.error("Web Share API not supported on this device");
                    }
                  }}>Share</button>

                </div>
                <div>
                  {paste.createdAt}
                </div>
              </div>
            )
          })
        }
      </div>
    </div>
  )
}

export default Paste