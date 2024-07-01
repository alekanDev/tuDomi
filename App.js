import { StatusBar } from 'expo-status-bar';
import React, { useCallback, useEffect, useState } from 'react';
import { StyleSheet, Text, View, TextInput, Pressable, Keyboard } from 'react-native';
import { useFonts } from 'expo-font';
import LottieView from 'lottie-react-native';
import moto_animation from './utils/images/animation_tuDomi.json'
import * as SplashScreen from 'expo-splash-screen';
import { colorList } from './utils/colors';
import { AntDesign } from '@expo/vector-icons';
import { inputs_loginForm } from './utils/forms/loginForm';
import Toast from 'react-native-toast-message';
import { showToast, toastConfig } from './utils/Toast/Toast';
import { login_auth } from './utils/http_request/API_auth';

SplashScreen.preventAutoHideAsync();

export default function App() {
  const [fontsLoaded, fontError] = useFonts({
    'msMadi': require('./utils/fonts/msMadi.ttf'),
    'pJ': require('./utils/fonts/plusJakartaSans/regular.ttf'),
    'pJ_bold': require('./utils/fonts/plusJakartaSans/Bold.ttf'),
    'pJ_extraBold': require('./utils/fonts/plusJakartaSans/extraBold.ttf')
  });

  const onLayoutRootView = useCallback(async () => {
    if (fontsLoaded || fontError) {
      await SplashScreen.hideAsync();
    }
  }, [fontsLoaded, fontError]);

  if (!fontsLoaded && !fontError) {
    return null;
  }

  const [loginValues, setLoginValues] = useState({
    username: '',
    password: ''
  })

  const [kB_isActive, setKB_isActive] = useState(false)

  useEffect(() => {
    const kB_active = Keyboard.addListener('keyboardDidShow', () => {
      setKB_isActive(true)
    })
    const kB_inactive = Keyboard.addListener('keyboardDidHide', () => {
      setKB_isActive(false)
    })
    return () => {
      kB_active.remove()
      kB_inactive.remove()
    }
  }, [])

  const handleChange = (key, value) => {
    setLoginValues(prevState => ({
      ...prevState,
      [key]: value
    }))
  }

  const handleSubmit = async () => {
    const {status, token, message} = await login_auth(loginValues)
    switch(status){
      case true:
        showToast({
          type: 'success',
          title: '👌 VALIDADO',
          message
        })
        break
      case false:
        showToast({
          type: 'error',
          title: '❌ ERROR de autenticacion',
          message
        })
        break
      default:
        showToast({
          type: 'error',
          title: '🚨 ERROR',
          message: 'Algo salio mal, en el proceso'
        })
    }
    console.log(token)
  }

  return (
    <View style={styles.container} onLayout={onLayoutRootView} >
      <StatusBar style="auto" />
      <View style={{ flex: 2, justifyContent: 'center', alignItems: 'center' }}>
        <LottieView
          source={moto_animation}
          autoPlay
          loop
          speed={.7}
          style={kB_isActive ? { width: 200, height: 200 } : { width: 320, height: 320 }}
        />
        <Toast
          config={toastConfig}
          ref={(ref) => Toast.setRef(ref)}
        />
        <Text style={{ fontFamily: 'msMadi', color: kB_isActive ? colorList('GREEN1_1') : 'white', textAlign: 'center', fontSize: kB_isActive ? 100 : 120 , marginTop: 20, alignSelf: 'flex-end' }} >TuDomi</Text>
      </View>
      <View style={{ flex: 1, width: '100%', height: '100%', justifyContent: 'center', alignItems: 'center', padding: '5%', rowGap: 10 }}>
        {
          inputs_loginForm.map((el, index) => (
            <View
              key={index}
              style={{ width: '100%', rowGap: 10 }}
            >
              <Text style={{ color: 'white', fontSize: 15, fontFamily: 'pJ_bold' }}> {el.title} </Text>
              <TextInput
                style={{
                  width: '100%', height: 50
                  , backgroundColor: colorList('GRAY2_1'), borderRadius: 10, fontFamily: 'pJ_bold', paddingHorizontal: 10, fontSize: 22, textAlign: 'center', alignSelf: 'center', color: colorList('WHITE')
                }}
                name={el.name}
                secureTextEntry={el.entrySec}
                autoCapitalize='none'
                onChangeText={(text) => handleChange(el.name, text)}
              />
            </View>
          ))
        }
        <Pressable
          style={kB_isActive ? styles.hidden : styles.btn_logIn}
          onPress={() => handleSubmit()}
        >
          <View
            style={{ width: '80%', height: '100%', paddingHorizontal: 10, justifyContent: 'space-around', alignItems: 'center', flexDirection: 'row' }}
          >
            <Text style={{ fontFamily: 'pJ_extraBold', fontSize: 24 }} >INGRESAR</Text>
          </View>
          <View
            style={{ width: '20%', justifyContent: 'center', alignItems: 'center' }}
          >
            <AntDesign name="arrowright" size={35} color="black" />
          </View>
        </Pressable>
      </View>
      <View style={{ width: '95%', height: 1, backgroundColor: colorList('GRAY2_1') }} />
      <View style={kB_isActive ? styles.hidden : styles.google_login} >
        <Pressable
          onPress={() => showToast({
            type: 'info',
            title: 'Información',
            message: 'Función en construcción'
          })}
        >
          <AntDesign name="google" size={50} color={colorList('WHITE')} />
        </Pressable>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    display: 'flex',
    flexDirection: 'column',
    backgroundColor: '#2c2c2c'
  },
  btn_logIn: { width: '100%', height: 50, flexDirection: 'row', backgroundColor: colorList('GREEN1_1'), borderRadius: 10, marginTop: 10, marginBottom: 20 },
  google_login: { width: '100%', height: 70, justifyContent: 'center', alignItems: 'center' },
  hidden: { display: 'none' }
});
