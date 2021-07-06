import React, { useState, useEffect, useContext} from 'react';
import { connect, useDispatch, useSelector } from 'react-redux';
import { 
    View, 
    Image, 
    StyleSheet, 
    Dimensions, 
    TextInput,
    Animated, 
    ActivityIndicator 
} 
from 'react-native';
import { TypingAnimation } from "react-native-typing-animation";
import { Text } from 'react-native-elements';
import { Button, FormControl } from 'native-base'
import { AuthContext } from '../service/AuthContext';
import Loading from '../childrenComponent/Loading';
import SelectComponent from '../childrenComponent/ingredientComponent/SelectComponent';


const {width, height} = Dimensions.get("screen");

const Login = ( props ) => {
    const {logIn} = useContext(AuthContext)
    const [userName, setUserName] = useState("")
    const [password, setPassword] = useState("")
    const [typingUserName, setTypingUserName] = useState(false)
    const [typingPassword, setTypingPassword] = useState(false)
    const [loading, setLoading] = useState(false)


    const onLogin = () => {
        setLoading(true)
        logIn( userName, password)
    }
    
    const _typing = () => {
        return ( 
            <TypingAnimation 
                style={{ marginBottom: 10, marginRight:30}}
                dotColor="#585A96"/>
        )
    }

    const onBlurTextInput = () => {
        setTypingPassword(false)
        setTypingUserName(false)
    }

    const onChangeTextInputUserName = (value) => {
        setUserName(value.trim())   
    }

    const onChangeTextInputPassword = (value) => {
        setPassword(value)   
    }
    return (
        
            <View style={{ backgroundColor:"#fff", justifyContent:"center", flex: 1  }}>
                
               <View style={{alignItems:"center", justifyContent:"center",...StyleSheet.absoluteFill}}>
                   <Animated.Image 
                    source={require('../assets/baseImage.png')} />
               </View>          
                <View style={{ 
                    borderRadius: 10,
                    backgroundColor:"#fff",
                    marginHorizontal: 20,
                    justifyContent:"center",
                    alignContent:"center",
                    height: height/2
                }}>
                    <View 
                        style={{
                            ...style.button, 
                            flexDirection:"row",
                            paddingHorizontal:15, 
                            justifyContent:"space-evenly",
                            alignItems:"center"                       
                        }}>
                            <TextInput
                                defaultValue={userName}
                                style={{width:"100%", fontSize:15}}
                                placeholder="Tên đăng nhập"
                                onFocus={ ()=> { 
                                    setTypingPassword(false), 
                                    setTypingUserName(true),
                                    setUserName('')
                                }}
                                onBlur={ onBlurTextInput }
                                onChangeText = {  onChangeTextInputUserName }
                            />
                            { typingUserName ? _typing() : null}
                    </View>
                    <View 
                        style={{
                            ...style.button, 
                            flexDirection:"row",
                            paddingHorizontal:15, 
                            justifyContent:"space-evenly",
                            alignItems:"center"
                        }}
                    >
                        <TextInput
                            defaultValue={password}
                            secureTextEntry={ true }
                            style={{ width:"100%", fontSize:15}}
                            placeholder="Mật khẩu"
                            onFocus={()=> { 
                                setTypingPassword(true), 
                                setTypingUserName(false), 
                                setPassword('')        
                            }}
                            onBlur={ onBlurTextInput }
                            onChangeText={ onChangeTextInputPassword }
                        />
                        { typingPassword ? _typing() : null}
                    </View>
                    
                    <SelectComponent/>
                    <View 
                        style={{
                            width:"100%",
                            marginVertical:30,
                        }}>
                        <Button 
                            block
                            disabled={(userName === '' || password === "" )? true : false } 
                            style={{
                                height:55,
                                borderRadius: 10,
                                justifyContent: "center", 
                                backgroundColor:"#4bcffa",
                                marginHorizontal: 30,
                                elevation: 8,
                                shadowRadius:10                            
                            }}
                            onPress = { onLogin }
                            >
                            <Text style={{ fontSize: 15, color:(userName === '' || password === "" ? '#ecf0f1' : "#fff" ), fontWeight:"900"}}>
                                Đăng nhập
                            </Text>
                        </Button>
                   </View>
                </View>
                { props.message !== '' ? (
                        <View style={{ paddingHorizontal:15, marginVertical: 10, marginHorizontal: 20}}>
                            <Text style={{ fontSize:15, color:"#fff"}}>
                                {props.message}
                            </Text>
                        </View>
                ): null }
                {props.message === '' &&
                <Loading loading={loading} />    
                }

            </View>
            

     )
}
export default Login

const style = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor:"#fff",
        alignItems:"center",
        justifyContent:"center"
    },
    button: {
        borderBottomColor:"#a29bfe",
        borderBottomWidth: 1,
        height: 55,
        marginHorizontal: 15,
        borderRadius: 10,
        justifyContent: "space-between", 
        marginVertical:5
    }
})