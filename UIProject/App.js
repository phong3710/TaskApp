/* eslint-disable prettier/prettier */
import 'react-native-gesture-handler';
import React, { useMemo, useEffect, useState, useCallback } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import Login from './src/screens/LoginScreen';
import { Provider, useDispatch, useSelector } from 'react-redux';
import HomeNavigator from './src/navigators/HomeNavigator';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { AuthContext } from './src/service/AuthContext';
import { fetchTokenFailed, fetchTokenRequest, fetchTokenSucess, restoreToken } from './src/action/tokenAction';
import { apiAuthUrl } from './ApiConfig/ApiConfig';
import axios from 'axios';
import { fetchUserLoginFailed, fetchUserLoginRequest, fetchUserLoginSuccess, setUserLogout } from './src/action/userLoginAction';
import NetInfo from "@react-native-community/netinfo";
import PlashScreen from './src/screens/PlashScreen';
import { Alert } from 'react-native';


const Stack = createStackNavigator();

const App = () => {
  const dispatch = useDispatch();
  const user = useSelector(state => state.userLoginReducer.userLogin)
  const token = useSelector( state => state.tokenReducer)
  const [message , setMessage ] = useState('')
  const [loading, setloading] = useState(true) 
  
  useEffect (async () => {
    const tokenStorage = await getAsyncStorage('@token')
    checkConection(tokenStorage)
  }, [])


  const checkConection = (tokenStorage) =>  NetInfo.addEventListener( state => {       
      if(state.isConnected === true){
        dispatch(restoreToken(tokenStorage))
        if (token.tokenRestore === null){
          setloading(false)  
          dispatch(fetchTokenRequest)
          axios.get(apiAuthUrl).then( response => {
            dispatch( fetchTokenSucess(response.data) )} 
          ).catch ( error => {
            var errorMsg = error.Message
            dispatch( fetchTokenFailed(errorMsg) ) 
          })
        } 
        else { setloading(false) }
      }

      if(state.isConnected === false){
        Alert.alert("Thông báo", "Không có kết nối")
      }
  })


  const auth = useMemo(() => ({
    logIn: async (userName, password) => {
        setMessage('')
        dispatch(fetchUserLoginRequest)
        await axios
        .get(`https://icrm-product-api-v2.isdcorp.vn/Auth/CheckLoginMobile`,{
            headers: {
                "Accept": 'application/json',
                'Content-Type': 'application/json',
            },
            params:{
              UserName: userName,
              Password: password,
              CompanyCode: 1000,
              token: token.token.token,
              key: token.token.key

            }
        }).then(async response => {
          if(response.status === 200){
            var userData = response.data
            setMessage(userData.Message)
            if(userData.IsSuccess === true){
              var data = userData.Data
              await AsyncStorage.setItem('@token', token.token.token)
              await AsyncStorage.setItem('@key', token.token.key)
              saveAsyncStorage(data.AccountId, "1000", data.UserName)
            }
            console.log(response)
            dispatch(fetchUserLoginSuccess(response.data))
          }
        })
        .catch((err) => {
            var errMsg = err.Message
            setMessage('Không thể tải dữ liệu!')
            dispatch (fetchUserLoginFailed(errMsg)) 
        })
        
    },

    logOut: async () => {
      dispatch(setUserLogout())
      dispatch(restoreToken(null))
      await AsyncStorage.removeItem('@token');
      setMessage('')
    },

  }), 
    [token, user]
  )

  const saveAsyncStorage = async (uId, companyCode, userName) => {
    try{
        await AsyncStorage.setItem('@uId',uId)
        await AsyncStorage.setItem('@companyCode', companyCode)
        await AsyncStorage.setItem('@userName', userName)

    } catch ( error ){
        console.log(error)
    } 
  }
  
  const getAsyncStorage = async (key) => {
    try {
      const value = await AsyncStorage.getItem(key);
      if(value !== null){
        return value
      }
      return null
    } catch ( err ) {
      console.log ( error )
    }
  }

  return (
      <AuthContext.Provider value={auth}>
        { loading === true ? 
          <PlashScreen loading={loading}/>
        :
          <NavigationContainer>
            <Stack.Navigator initialRouteName="Login" headerMode="none" >
              {(user.length !== 0 && user.Data && user.IsSuccess === true) || token.tokenRestore !== null ?  
              ( <Stack.Screen name= "Home" component={HomeNavigator}/> ) 
              : 
              ( <Stack.Screen name= "Login" children = {() => <Login message = {message}/>} /> )}
            </Stack.Navigator>
          </NavigationContainer>
        }
      </AuthContext.Provider>
  );
};

export default App;
