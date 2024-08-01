import { View, StyleSheet, Pressable, Alert, ActivityIndicator } from 'react-native';
import Text from './Text';
import theme from '../theme';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import { useEffect, useState } from 'react';

import { useSelector, useDispatch } from 'react-redux'
import { increaseScore, increaseWatch, cleanWatch } from '../state/dataSlice';

const styles = StyleSheet.create({
  center:{
    flexDirection:'row',
    alignItems: 'center',
    justifyContent: 'space-evenly',
  },
  body: {
    flexGrow:1
  },
  clock:{
    height:56, 
    flexDirection:'row',
  },
  piece:{
    backgroundColor: theme.colors.secondary,
    paddingHorizontal: 20,
    borderRadius: 8
  },
  mid:{
    flexGrow:1,
    marginHorizontal:5,
    borderRadius: 8,
    borderColor:theme.colors.secondary,
    borderWidth:2

  },
  paper:{
    height:56,
    marginVertical:10,
    borderRadius: 8,
    backgroundColor: '#C7EBCD'
  },
  timer:{
    position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, justifyContent: 'center', alignItems: 'center'
  },
  button:{
    position: 'absolute', left: 0, right: 0, bottom: 0, justifyContent: 'center', alignItems: 'center',
  },
  head:{
    height:56,
    borderRadius: 8,
    marginBottom:20,

    backgroundColor:theme.colors.secondary,
    paddingHorizontal:20,

    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between'
  },
})

const Focus = () => {

  //const active = useSelector((state) => state.note.active)

  const score = useSelector((state) => state.data.score)
  const watch = useSelector((state) => state.data.watch)
  const timer = useSelector((state) => state.data.timer)

  const dispatch = useDispatch()

  const [play,onPlay] = useState(false)

  let interval

  useEffect(()=>{

    if(play){
      interval = setInterval(()=>{
        dispatch(increaseWatch())
        dispatch(increaseScore())
      }, (1000*60)*timer);
    }
    return ()=> {clearInterval(interval);dispatch(cleanWatch())}

  },[play])

  const buttonfunc = () => {
    if(play) {
      Alert.alert('Turn off timer?',"Timer will be turned off",[{text:'No',onPress:()=>{} },{text:'Yes',onPress:()=>{onPlay(!play)} }] )
    }
    else {
      onPlay(true)
    }
  }

  return (
    <>
      <View style={styles.body}>
      <View style={styles.head}>
          <Text fontWeight='bold'>Timer</Text>{play? <ActivityIndicator color={theme.colors.primary}></ActivityIndicator>: null}
        </View>
{/*
        <View style={styles.clock}>
          <View style={[styles.center,styles.piece]}><Text fontWeight='bold'>2:00</Text></View>
          <View style={[styles.center,styles.mid]}><Text>Work</Text></View>
          <View style={[styles.center,styles.piece]}><Text fontWeight='bold'>2:00</Text></View>
        </View>

        <View style={[styles.center,styles.paper]}><Text fontSize='body'>{active[0]?active[0]:'ʕ •ᴥ•ʔ'}</Text></View>
*/}
        <View style={styles.timer}><Text fontWeight='bold' style={{fontSize:57}}>{play ? watch : score/timer}</Text></View>

        <View style={styles.button}>
          <Pressable onPress={buttonfunc}>
            <View style={[{width:96, height:96,backgroundColor:theme.colors.secondary,borderRadius: 28},styles.center]}>
              <MaterialIcons name={play ? "pause" : "play-arrow"} size={36} color={theme.colors.primary} />
            </View>
          </Pressable>
        </View>
      </View>
    </> 
  );
};

export default Focus