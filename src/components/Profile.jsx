import { View, StyleSheet, Pressable, Alert, TextInput} from 'react-native';
import Svg, { Circle, G } from "react-native-svg";
import theme from '../theme';
import Text from './Text';

import MaterialIcons from '@expo/vector-icons/MaterialIcons';

import { useSelector, useDispatch } from 'react-redux'
import {cleanScore, setLevel, setTimer } from '../state/dataSlice'
import { useState } from 'react';

const styles = StyleSheet.create({
  body: {
    flexGrow:1,
  },
  head:{
    zIndex:1,
    justifyContent: 'space-between',
    height:56,
    borderRadius: 8,
    marginBottom:20,

    backgroundColor:theme.colors.secondary,
    paddingHorizontal:20,

    flexDirection: 'row',
    alignItems: 'center',
  },
  button:{
    height:56,
    borderRadius: 8,
    backgroundColor:theme.colors.primary,

    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-evenly'
  },
  item:{
   
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',

    paddingVertical:12,
    paddingHorizontal:20,
  }
})

const ListItem = ({select,selector,title,desc,value,tag,func}) => {

  const [type, onChangeText] = useState(value);
  const dispatch = useDispatch()

  return (
    <>
      <View style={styles.item}>
        <View>
        <Text >{title}</Text>
        <Text fontSize='subheading'>{desc}</Text>
        </View>
        <View>
          {select==tag ?
          <TextInput onFocus={()=>{onChangeText(value)}} 
          onBlur={()=> {dispatch( func(type));selector(null)}} autoFocus={true} 
          style={{fontSize:22, color:theme.colors.teritiary}} onChangeText={onChangeText} value={type}></TextInput>
          :
          <Text style={{fontSize:22, color:theme.colors.teritiary}}>{value}</Text>
          }
          </View>
      </View>
    </>
  )
}

const Profile = () => {

  const [select,selector]=useState(0)
  const [menu,useMenu]=useState(false)

  const timer = useSelector((state) => state.data.timer)
  const level = useSelector((state) => state.data.lsize)
  const score = useSelector((state) => state.data.score)

  const dispatch = useDispatch()

  const resetalert = () => {
    Alert.alert( 'Reset Score?', 'You score will be set to 0', [ {text:'Cancel', onPress:()=>{}},{text:'Reset', onPress:()=>dispatch(cleanScore())} , ] )
  }

  return (
    <>

      <View style={styles.body}>
        <View style={styles.head}>
          <Text fontWeight='bold'>Profile</Text>
          <Pressable onPress={()=>{menu?useMenu(false):useMenu(true)}} >
            <MaterialIcons name='more-vert' size={24} color={theme.colors.primary} />

            {menu?<Pressable onPress={()=>{useMenu(false);resetalert()}}><View style={{
              position:'absolute',
              right:-20,
               top:10,
               width:150, 
               padding:10,
               backgroundColor:theme.colors.background,
               borderWidth:1,
               borderColor:theme.colors.secondary
               }}><Text>Reset Progress</Text></View></Pressable>:null}

          </Pressable>
        </View>

        <Pressable onStartShouldSetResponderCapture={()=>{true}} 
          onPress={()=>{useMenu(false);selector(0)}}
          style={{zIndex:0}}>
          <View style={styles.body}>
            
            <View >
            <Pressable onPress={()=>{selector("timer")}}>
              <ListItem select={select} selector={selector} func={setTimer} tag='timer' title="Focus Timer" desc="Minutes reqired to gain one point." value={timer}></ListItem>
            </Pressable>
            <Pressable onPress={()=>{selector("level")}}>
              <ListItem select={select} selector={selector} func={setLevel} tag='level' title="Level Length" desc="Points needed to move up a level." value={level}></ListItem>
            </Pressable>
            </View>

            <View style ={{marginTop:125, flexGrow:0, alignItems:'center', justifyContent:'center'}}>
              <Svg height={250} width={250} viewBox="0 0 100 100" >
                  <G rotation={-90} origin={[50,50]}>
                  <Circle cx="50" cy="50" r="45" stroke={theme.colors.highlight} strokeWidth="4" fill='transparent' 
                  style={{opacity:0.2}}
                  strokeLinecap='round'/>
                  <Circle cx="50" cy="50" r="45" stroke={theme.colors.highlight} strokeWidth="4" fill='transparent' 
                  strokeDasharray={2*Math.PI*45}  strokeDashoffset={ 2*Math.PI*45 - ( ( ( (score/timer) %level) /level) *2*Math.PI*45 )}
                  strokeLinecap='round'/>
                  </G>
              </Svg>
              <View style={{position:'absolute', alignItems:'center', justifyContent:'center'}}>
                <Text fontSize='body'>level</Text>
                <Text style={{fontSize:57}} fontWeight='bold' >{ ((score/timer)-((score/timer) %level))/level }</Text>
                <Text fontSize='body'>{ (score/timer)%level} / {level}</Text>
              </View>
            
            </View>

          </View>
        </Pressable>
      </View>
    </>
  );
};

export default Profile
