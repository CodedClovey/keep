import { createSlice } from '@reduxjs/toolkit'

export const dataSlice = createSlice({
  name: 'data',
  initialState: {
    lsize: 30,
    score: 0,
    timer: 30,
    watch: 0
  },
  reducers: {
    setLevel:(state,action)=>{
      state.lsize= action.payload
    },
    loadData:(state,action)=> {
      state.score = action.payload.score
      state.timer = action.payload.timer
      state.lsize= action.payload.lsize
    },
    cleanScore: (state) => {
      state.score = 0
    },
    increaseScore: (state) => {
        state.score += state.timer
    },

    setTimer: (state, action) => {
      if(action.payload){
        state.timer = action.payload
      }

    },
    cleanWatch: (state) => {
      state.watch = 0
    },
    increaseWatch: (state) => {
      state.watch += 1
    },
  },
})

// Action creators are generated for each case reducer function
export const { cleanScore, increaseScore, setTimer, cleanWatch ,increaseWatch, loadData, setLevel } = dataSlice.actions

export default dataSlice.reducer