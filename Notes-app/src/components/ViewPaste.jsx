import React, { useEffect, useState } from 'react'
import { useParams, useSearchParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { addToPastes, updateToPaste } from '../redux/pasteSlice';

const ViewPage = () => {

  const {id} = useParams();
  const allPastes = useSelector((state) => state.paste.pastes);
  const paste = allPastes.find((paste) => paste._id === id);
  const [title, setTitle] = useState(paste.title);
  const [value, setValue] = useState(paste.content);

  return (
    <div>
      <div className='flex flex-row gap-6 place-content-between'>
        <input
          className='p-1 rounded-xl mt-2 bg-black w-[66%] pl-4'
          type='text'
          placeholder='enter title here'
          value={title}
          disabled={true}
          onChange={(e) => setTitle(e.target.value)} />

        {/* <button 
          onClick={createPaste}
          className='p-2 rounded-xl mt-2 bg-black'>
          {
            pasteId ? 'Update My Paste' : 'Create My Paste'
          }
        </button> */}
      </div>

      <div className='mt-8'>
        <textarea 
          className='border rounded-2xl mt-4 min-w-[500px] p-4'
          value={value}
          disabled={true}
          placeholder='enter your text here'
          onChange={(e) => setValue(e.target.value)}
          rows={20}
          />
      </div>
    </div>
  )
}

export default ViewPage