import { StyleSheet, View } from 'react-native';
import { Route, Routes, Navigate } from 'react-router-native';

import { loadStore, saveStore } from '../storage'

import { Platform, NativeModules } from 'react-native';
const { StatusBarManager } = NativeModules;

import Agenda from './Agenda';
import ToDo from './ToDo';
import Profile from './Profile';
import Focus from './Focus';

import NavBar from './NavBar';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import theme from '../theme';



const styles = StyleSheet.create({
  page: {
    
    backgroundColor:theme.colors.background,
    paddingHorizontal:20,
    flexGrow: 1,
    flexShrink:1,
    paddingTop: Platform.OS === 'android' ? StatusBarManager.HEIGHT : 0,
  },
});

const Loader = ()=>{

  const tables = useSelector((state)=> state.table.tables)
  const weekmark = useSelector((state)=> state.table.weekmark)
  const score = useSelector((state)=> state.data.score)
  const timer = useSelector((state)=> state.data.timer)
  const archive = useSelector((state)=> state.note.archive)
  const active = useSelector((state)=> state.note.active)
  const lsize = useSelector((state)=> state.data.lsize)

  const dispatch = useDispatch()

  useEffect(()=>{
    if(archive.length !=0 || active.length !=0){
      dispatch(saveStore({tables:tables,weekmark:weekmark,score:score,timer:timer,archive:archive,active:active,lsize:lsize}))
    }
  },[tables,weekmark,score,timer,archive,active,lsize])

  return(
    <></>
  )
}

const Main =() => {

  const dispatch = useDispatch()

  useEffect(()=>
    {
      dispatch(loadStore())
    }
  ,[])

  return (
    <View style={styles.page}>
        <Routes>
          <Route path="/Agenda" element={<Agenda />} />
          <Route path="/Focus" element={<Focus />} />
          <Route path="/ToDo" element={<ToDo />} />
          <Route path="/Profile" element={<Profile />} />
          <Route path="*" element={<Navigate to="/Focus" replace />} />

      </Routes>
      <NavBar ></NavBar>
      <Loader></Loader>
    </View>
  );
};

export default Main;