import { View ,StyleSheet, FlatList, Pressable, TextInput, PanResponder,} from 'react-native';
import theme from '../theme';
import Text from './Text';

import { useSelector,useDispatch } from 'react-redux'
import { newRoutine, nextPage, prevPage, setWeek, useHighlight, editText, editTime } from '../state/tableSlice'
import { useEffect, useRef, useState } from 'react';
import Period from './Period';

const styles = StyleSheet.create({
  body: {
    flexGrow:1,
    flexShrink:1
  },
  head:{
    height:56,
    borderRadius: 8,
    marginVertical:0,

    backgroundColor:theme.colors.secondary,

    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center'
  },
  box:{
    height: 22,
    width: 22,

    borderWidth:3,
    borderRadius:6,
    borderColor:theme.colors.teritiary,

    margin:6,
    padding:3
  },
  button:{

    borderWidth: 2,
    borderBottomWidth:1,
    borderRadius: 8,
    height:45,
    borderColor: '#858585',

    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-evenly'
  },
  listbody:{
    paddingHorizontal:10,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',

    borderWidth: 2,
    borderBottomWidth:1,
    borderRadius: 8,
    height:45,
    borderColor: '#858585',

  },
  snack:{

    position:'absolute',
    left:0,
    right:0,
    bottom:10,
    paddingHorizontal:10,
    
    alignItems:'center',
    justifyContent:'center', 
    
  }
})

function findday(index) {
  const days=['sunday','monday','tuesday','wednesday','thursday','friday','saturday']
  return days[index]
}

function buttonbuilder(weekmark,page,dispatch,popupSet) {
  return weekmark.map((item,index)=> {
    return(
      <Pressable onPress={()=>{dispatch(setWeek(index));popupSet([true, findday(index) ])}} key={index} style={styles.box}>
        <View style={[{flexGrow:1}, item == page && { backgroundColor:theme.colors.teritiary}]}></View>
      </Pressable>
      )
  })
}

function dotbuilder(page,maxindex) {
  console.log(maxindex+" "+page)

  return <View style={{padding:10,gap:5,flexDirection:'row',alignItems: 'center',justifyContent: 'center',flexGrow:1}}>
    {Array(maxindex+1).fill().map((_,index)=> {
    return(
        <View key={index} style={[{height:10,width:10,borderRadius:5,backgroundColor:theme.colors.secondary},
          index == page && { backgroundColor:theme.colors.teritiary}]}></View>
      )
    })}</View>
}

const Block = ({item,index,dispatch,tag}) => {

  const highlight = useSelector((state)=> state.table.highlight)
  const [type, onChangeText] = useState(item[1]);
  const [time, useTime] = useState(false);

  return(
    <View style={styles.listbody}>
      <View>
        { highlight==index && time
        ? 
        <TextInput maxLength={5} style={{minWidth:45}} onFocus={()=>{onChangeText(item[0])}}
        onBlur={()=> {
          dispatch(useHighlight(null));
          dispatch(editTime( {index:index, text:type} ))
          useTime(false) 
        }}
        autoFocus={true} onChangeText={onChangeText} value={type}></TextInput>
        :
        <View >
        <Pressable style={{flexDirection:'row',alignItems:'center',justifyContent:'flex-start',flexGrow:1,height:25,minWidth:40}}
          onPress={()=>{
          dispatch( useHighlight(index));
          useTime(true)

          }} 
          ><Text >{item[0]}</Text></Pressable></View>
        }
      </View>
      
      { highlight==index && !time
      ?
      <TextInput onFocus={()=>{onChangeText(item[1])}} maxLength={35}
      onBlur={()=> {
        dispatch(useHighlight(null));
        dispatch(editText( {index:index, text:type} ))
      }}
      autoFocus={true} onChangeText={onChangeText} value={type}></TextInput>
      :
      <Pressable onPress={()=>{ dispatch(useHighlight(index)) ;tag.current.scrollToIndex({
        index:index,
        viewPosition:0,
        animated:false
      }) 
      } } style={{textDirection:'row',alignItems:'center',flexGrow:0,minWidth:40}}><Text >{item[1]}</Text></Pressable>
      }

      <Period index={index}></Period>

    </View>
  )
}

const Agenda = () => {

  const list = useRef();

  const [popup,popupSet] = useState([false,''])

  const dispatch = useDispatch()

  const page = useSelector((state)=> state.table.currentpage)
  const tables = useSelector((state)=> state.table.tables)
  const weekmark = useSelector((state)=> state.table.weekmark)
  const maxindex = useSelector((state)=> state.table.maxindex)

  const highlight = useSelector((state)=> state.table.highlight)

  const panResponder = useRef(
    PanResponder.create({
      onStartShouldSetPanResponder: () => false,
      onStartShouldSetPanResponderCapture: () => false,
      onMoveShouldSetPanResponder: (evt, gestureState) => {
        if( gestureState.dx > -70 && gestureState.dx < 70 ) {return false}
        else return true
      },
      onMoveShouldSetPanResponderCapture: () => false,

      onPanResponderRelease: (evt, gestureState) => {
        if(gestureState.dx < -70){
          dispatch(nextPage())
        }
        if(gestureState.dx > 70){
          dispatch(prevPage())
        }
      },
    }),
  ).current;

  let timeout

  useEffect(()=>{
    timeout =setTimeout(()=>{
      if(popup[0]) {popupSet([false,''])}
    },1000)
    return () => {clearTimeout(timeout)}
  },[popup])

  return (
    
    <>
      <View style={styles.body}>
        
        <View style={[styles.head,{marginBottom:20}]}>
          
          {buttonbuilder(weekmark,page,dispatch,popupSet)}
        </View>

        

        <View style={styles.body}>
        
        <FlatList showsVerticalScrollIndicator={false}  {...panResponder.panHandlers}
          ListFooterComponent ={<View style={{height:500}}></View>}
          style={{flexShrink:1}} ref={list}
          data={ tables[page] }
          renderItem={ ({item,index}) => <Block dispatch={dispatch} tag={list} index={index} item={item}></Block> }
        />
        
        </View>
        {highlight != null ? null :
        
        <View style={{flexDirection:'column'}}>
          {dotbuilder(page,maxindex+1)}
          <Pressable style={{flexGrow:1,marginHorizontal:5}} onPress={()=>{
            dispatch(newRoutine());
            dispatch(useHighlight(0))
            }}>
            <View style={styles.button}>
              <Text color='primary'>New Task</Text>
            </View>
          </Pressable>
        </View>
}
        { popup[0] ? <Snack text={"routine set for "+popup[1]}></Snack> : null}

      </View>
    </> 
  );
};

const Snack = ({text}) => {
  return(
    <>
      <View style={styles.snack}>
        <View style={{
          backgroundColor:theme.colors.primary,
          paddingHorizontal:20,paddingVertical:2,
          borderRadius:5
          }}><Text color='white'>{text}</Text></View>
      </View>
    </>
  )
}

export default Agenda