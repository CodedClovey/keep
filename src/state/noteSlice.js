import { createSlice } from '@reduxjs/toolkit'

export const noteSlice = createSlice({
  name: 'note',
  initialState: {
    highlight: null,
    page: 'active',
    archive: [],
    active: []
  },
  reducers: {
    loadNotes:(state,action)=> {
      state.archive = action.payload.archive
      state.active = action.payload.active
    },
    useHighlight:(state,action)=>{
      state.highlight = action.payload
    },
    copyNote: (state , action) => {
        if(action.payload.page == 'archive'){
            state.active.unshift(action.payload.text)
        }
        else if(action.payload.page == 'active'){
            state.archive.unshift(action.payload.text)
        }
    },
    killNote: (state, action) => {
      const index = state[action.payload.page].indexOf(action.payload.text)
      state[action.payload.page].splice(index,1)
    },
    newNote:(state, action) => {
      state[action.payload.page].unshift(action.payload.text)
    },
    updateNote:(state, action) => {

        if(action.payload.text==''){
          state[action.payload.page].splice(action.payload.index,1)
          return
        }
        state[action.payload.page].splice(action.payload.index,1,action.payload.text)
    },
    showPage: (state, action) => {
      state.page = action.payload
      state.highlight = null
    },
  },
})

// Action creators are generated for each case reducer function
export const { copyNote, killNote, newNote, showPage, useHighlight, updateNote ,loadNotes} = noteSlice.actions

export default noteSlice.reducer