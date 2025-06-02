import React, { useEffect, useState } from 'react'
import { useSearchParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { addToPastes, updateToPaste } from '../redux/pasteSlice';

const Home = () => {
  const [title, setTitle] = useState('');
  const [value, setValue] = useState('');
  const [searchParams, setSearchParams] = useSearchParams();
  const pasteId = searchParams.get('pasteId');
  const dispatch = useDispatch();
  const allPastes = useSelector((state) => state.paste.pastes);

   //if pasteId is present, it means we are updating the paste
   useEffect(() => {
    if(pasteId) {
      const paste = allPastes.find((paste) => paste._id === pasteId);
      setTitle(paste.title);
      setValue(paste.content);
    }
  }, [pasteId])


  //this will create a new paste and send it to the slice
  function createPaste() {
    const paste = {
      title: title,
      content: value, 
      _id: pasteId || Date.now().toString(36),
      createdAt: new Date().toISOString(),
    }

    if(pasteId) {
      //update paste  
      dispatch(updateToPaste(paste));
    }
    else {
      //create paste
      dispatch(addToPastes(paste));
    }

    //after creation or updation, reset the form
    setTitle('');
    setValue('');
    setSearchParams({});
  }

  return (
    <div>
      <div className='flex flex-row gap-6 place-content-between'>
        <input
          className='p-1 rounded-xl mt-2 bg-black w-[66%] pl-4'
          type='text'
          placeholder='enter title here'
          value={title}
          onChange={(e) => setTitle(e.target.value)} />

        <button 
          onClick={createPaste}
          className='p-2 rounded-xl mt-2 bg-black'>
          {
            pasteId ? 'Update My Paste' : 'Create My Paste'
          }
        </button>
      </div>

      <div className='mt-8'>
        <textarea 
          className='border rounded-2xl mt-4 min-w-[500px] p-4'
          value={value}
          placeholder='enter your text here'
          onChange={(e) => setValue(e.target.value)}
          rows={20}
          />
      </div>
    </div>
  )
}

export default Home