import { View, StyleSheet, Pressable } from 'react-native';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';

import { useState, useEffect } from "react";
import { useNavigate } from 'react-router-native';

import theme from '../theme';
import Text from './Text';

const ButtonBg = {
  borderRadius: 12,
  backgroundColor: theme.colors.background,
}

const styles = StyleSheet.create({

  container:{
    marginTop:15,

    borderTopRightRadius: 16,
    borderTopLeftRadius: 16,

    backgroundColor: theme.colors.secondary,
    height: 80,

    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-evenly'
  },

  box: {
    flexDirection: 'column',
    alignItems: 'center',
  },

  bound: {
    width: 64,
    height:32,
    
    alignItems: 'center',
    justifyContent: 'space-evenly'
  },
});

const NavBar = () => {

  const [active, setActive] = useState("Focus")

    const [nav, setNav] = useState("Focus");
    const navigate = useNavigate();
    
    useEffect(() => {
        setActive(nav)
        navigate("/"+nav)
    }, [nav]);

    return (
      
      <View>
        <View style = {styles.container}>
          <Box text="Agenda" icon="today" setNav={setNav} active={active}></Box> 
          <Box text="Focus" icon="radio-button-checked" setNav={setNav} active={active}></Box> 
          <Box text="ToDo" icon="checklist-rtl" setNav={setNav} active={active}></Box> 
          <Box text="Profile" icon="account-circle" setNav={setNav} active={active}></Box>
        </View>
        
      </View> 
    )
};

const Box = ({text,icon,setNav,active}) => {
 
  return(
    <Pressable onPress={()=>setNav(text)}>

    <View style={styles.box}>
      <View style ={[styles.bound, active == text && ButtonBg,  ]}>
      <MaterialIcons name={ icon } size={24} color={theme.colors.primary} />
      </View>
      <Text fontSize='label' fontWeight='bold'>{text}</Text>
    </View>
    </Pressable>
  )
}

export default NavBar