import { createSlice } from '@reduxjs/toolkit'

export const tableSlice = createSlice({
  name: 'table',
  initialState: {
    maxindex:0,
    highlight:null,
    weekmark:[0,0,0,0,0,0,0],
    currentpage:0,
    tables:[[]]
  },
  reducers: {
    loadTables:(state,action)=> {
      state.weekmark = action.payload.weekmark
      if(action.payload.tables != undefined){
        state.tables = action.payload.tables
        state.maxindex = action.payload.tables.length - 1
      }

    },
    useHighlight:(state, action)=>{
      state.highlight = action.payload
    },
    setWeek:(state, action) =>{
      state.weekmark[action.payload] = state.currentpage
    },
    editText:(state,action)=> {
      if(action.payload.text != ""){
        state.tables[state.currentpage][action.payload.index][1] = action.payload.text
        if(state.tables[state.currentpage].length==1){
          state.maxindex = state.tables.length-1
        }
      }
      else{
        state.tables[state.currentpage].splice(action.payload.index, 1)

        if(state.tables[state.currentpage].length == 0){

          state.tables.splice(state.currentpage, 1)
          state.maxindex=state.tables.length-1
          if(state.tables.length == 0){ state.tables[0] = [] }

          state.weekmark = state.weekmark.map((num)=>{
            if(num==state.currentpage){
              return 0
            }else if(num<state.currentpage){
              return num
            }else {
              return num-1
            }
          })
        }
      }
    },
    editTime:(state,action)=> {
      state.tables[state.currentpage][action.payload.index][0] = action.payload.text

      state.tables[state.currentpage].sort((a, b)=>{
        if (a[0] < b[0]) {return -1;}
        if (a[0] > b[0]) {return 1;}
        return 0;
      });
    },
    newRoutine: (state) => {
      if(state.tables[state.currentpage] == undefined){
        state.tables[state.currentpage] = []
      }
      state.tables[state.currentpage].unshift(["00:00",""])
    },
    nextPage: (state) => {
      if(state.currentpage <= state.maxindex  ){
        state.currentpage += 1
        if(state.tables[state.currentpage] == undefined) { state.tables[state.currentpage]=[] }
      }
      console.log(state.currentpage)
    },
    prevPage: (state) => {
      if(state.currentpage > 0){
        state.currentpage -= 1
      }
      console.log(state.currentpage)
    }
  },
})

// Action creators are generated for each case reducer function
export const { newRoutine, nextPage ,prevPage, setWeek ,useHighlight, editText, editTime, loadTables} = tableSlice.actions

export default tableSlice.reducer