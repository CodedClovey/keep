import { View, StyleSheet, FlatList, Pressable, TextInput } from 'react-native';
import Text from './Text';
import theme from '../theme';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';

import { useSelector, useDispatch } from 'react-redux'
import { copyNote, showPage, killNote, useHighlight, updateNote, newNote } from '../state/noteSlice'
import { useState } from 'react';


const styles = StyleSheet.create({
  center:{
    flexDirection:'row',
    alignItems: 'center',
    justifyContent: 'space-evenly',
  },
  body: {
    flexGrow:1,
    flexShrink:1
  },
  select: {
    borderRadius:8,
    padding:20,
    backgroundColor: theme.colors.secondary,
    height:56,
    gap:20
  },
  box:{
    flexGrow:1,
    backgroundColor:theme.colors.secondary,
    height:40,
    borderRadius:8,
    
  },

  item:{
    marginVertical:10,
    flexDirection:'row',
    alignItems: 'flex-start',
    justifyContent: 'space-between',
  },
  button:{
    height:56,
    borderRadius: 8,
    backgroundColor:theme.colors.primary,

  },
  input:{
    flexShrink:1,
    flexWrap: 'wrap',
    flexGrow:1,
    borderRadius: 8,
    borderWidth:1,
    borderColor:theme.colors.teritiary,

    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal:10,
    paddingVertical:10,
  },
})


const ToDo = () => {

  const active = useSelector((state) => state.note.active)
  const archive = useSelector((state) => state.note.archive)
  const highlight = useSelector((state) => state.note.highlight)

  const page = useSelector((state) => state.note.page)
  const dispatch = useDispatch()

  return (
    <>
      
      <View style={styles.body}>

        <View style={[styles.select,styles.center]}>
          <View style={{flexGrow:1}}>
          <Pressable onPress={()=>{dispatch(showPage('active'))}}>
            <View style={[styles.box,styles.center,page == 'active' && {backgroundColor:theme.colors.background}]}><Text fontWeight='bold'>Active</Text></View>
          </Pressable>
          </View>
          <View style={{flexGrow:1}}>
          <Pressable onPress={()=>{dispatch(showPage('archive'))}}>
            <View style={[styles.box,styles.center,page == 'archive' && {backgroundColor:theme.colors.background}]}><Text>Archive</Text></View>
          </Pressable></View>
        </View>

        <FlatList showsVerticalScrollIndicator={false}
            ListFooterComponent ={<View style={{height:500}}></View>}
            style={{flexShrink:1,}}
            data={ page=='active'? active : archive}
            renderItem={ ({item,index}) => <Item page={page} index={index} text={item}></Item> }
        />
      </View>
      <Pressable onPress={()=>{
        dispatch(newNote({index:0, text:'', page:page}))
        dispatch(useHighlight(0))
        }
        }>
        {highlight!=null ?<></>:
        <View style={[styles.button,styles.center]}>
          <Text fontWeight='bold' color='white'>New List</Text>
        </View>
        }
      </Pressable>
    </> 
  );
};

const Item = ({text,page,index}) => {

  const dispatch = useDispatch()
  const highlight = useSelector((state)=>state.note.highlight)

  const archive = useSelector((state)=>state.note.archive)
  const active = useSelector((state)=>state.note.active)

  const [type, onChangeText] = useState(text);


  return(
    <>
    <View style={styles.item}>
      <View style={{padding:5}}><MaterialIcons name='menu' size={36} color={theme.colors.teritiary} /></View>
      { highlight==index
      ?
      <TextInput multiline={true} numberOfLines = {1} onFocus={()=>{onChangeText(page=='active'?active[highlight]:archive[highlight])}} 
      onBlur={()=> {
        dispatch(useHighlight(null));
        dispatch(updateNote( {index:index, text:type, page:page} ))
      }}
      autoFocus={true} style={styles.input} onChangeText={onChangeText} value={type}></TextInput>
      :
      <Pressable onPress={()=>{dispatch(useHighlight(index))}} 
      style={{textDirection:'row',paddingLeft:10,paddingTop:10, flexGrow:1}}><Text >{text}</Text></Pressable>
      }
      <Pressable onPress={()=>{
        dispatch(copyNote({page:page, text:text}))
        dispatch(killNote({page:page, text:text}))
        }}>
        <View style={{padding:5}}><MaterialIcons name='archive' size={36} color={theme.colors.teritiary} /></View>
      </Pressable>

    </View>
    <View style={{borderBottomWidth:1, borderColor: theme.colors.teritiary, marginHorizontal:5}}></View>
    </>
  )
}

export default ToDo 