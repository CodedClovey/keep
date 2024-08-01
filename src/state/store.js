import { configureStore } from '@reduxjs/toolkit'
import dataReducer from './dataSlice'
import noteReducer from './noteSlice'
import tableReducer from './tableSlice'

export default configureStore({
  reducer: {
    data: dataReducer,
    note: noteReducer,
    table: tableReducer,
  },
})