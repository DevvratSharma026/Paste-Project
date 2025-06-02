import { createSlice } from '@reduxjs/toolkit'
import toast from 'react-hot-toast';


const initialState = {
  //if the pastes find in local storage, then pastes will be equal to the pastes in local storage
  //else pastes will be an empty array
  pastes: localStorage.getItem("pastes")
    ? JSON.parse(localStorage.getItem("pastes"))
    : []
}

export const pasteSlice = createSlice({
  name: 'paste',
  initialState,
  reducers: {
    addToPastes: (state, action) => {
      //payload is the paste object
      const paste = action.payload;


      //add a check if paste already exists
      const index = state.pastes.findIndex((item) => item._id === paste._id);

      if(index >= 0) {
        //update the paste
        state.pastes[index] = paste;
        //save the pastes array to local storage
        localStorage.setItem("pastes", JSON.stringify(state.pastes));
        toast.success("Paste updated successfully");
        return;
      }
      

      //add the paste to the pastes array
      state.pastes.push(paste);
      //save the pastes array to local storage
      localStorage.setItem("pastes", JSON.stringify(state.pastes));

      //create toast
      toast("Paste created successfully");
    },

    updateToPaste: (state, action) => {
      const paste = action.payload;
      //find the paste
      const index = state.pastes.findIndex((item) => item._id === paste._id);
    
      if(index >= 0) {
        //update the paste
        state.pastes[index] = paste;
        //save the pastes array to local storage
        localStorage.setItem("pastes", JSON.stringify(state.pastes));
        toast.success("Paste updated successfully");
      }
    },
    
    resetAllPastes: (state, action) => {
      state.pastes = [];
      //save the pastes array to local storage
      localStorage.removeItem("pastes");
    },

    removeFromPastes: (state, action) => {
      const pasteId = action.payload;

      console.log(pasteId);
      const index = state.pastes.findIndex((item) => item._id === pasteId);

      if(index >= 0) {
        //remove the paste
        state.pastes.splice(index, 1);
        //save the pastes array to local storage
        localStorage.setItem("pastes", JSON.stringify(state.pastes));
        toast.success("Paste deleted successfully");
      }
    },
  },
})

// Action creators are generated for each case reducer function
export const { addToPastes, updateToPaste, resetAllPastes, removeFromPastes } = pasteSlice.actions

export default pasteSlice.reducer