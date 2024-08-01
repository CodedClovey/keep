import AsyncStorage from '@react-native-async-storage/async-storage';


import { loadTables } from './state/tableSlice'
import { loadData } from './state/dataSlice'
import { loadNotes } from './state/noteSlice'

const loadStore = () => {

  return async (dispatch) => {

    const store = new dataStorage()
    const data =await store.getData()
    
    if(data.length != 0){
      dispatch(loadData(data))
      dispatch(loadTables(data))
      dispatch(loadNotes(data))
    }
  }

}

const saveStore = (state) => {

  return async () => {
    

    const store = new dataStorage()
    await store.addData(state)
  }

}

export {loadStore, saveStore}


export default class dataStorage {
  constructor(namespace = 'Keep') {
    this.namespace = namespace;
  }

  async getData() {
    const data = await AsyncStorage.getItem(
      `${this.namespace}:data`,
    );

    return data ? JSON.parse(data) : [];
  }

  async addData(data) {
    await AsyncStorage.setItem(
      `${this.namespace}:data`,
      JSON.stringify(data),
    );

  }
}
  
  

