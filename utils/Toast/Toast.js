
import Toast, { BaseToast, ErrorToast } from 'react-native-toast-message';
import { colorList } from '../colors';

export const showToast = (dataToast) => {
  const {type, title, message} = dataToast
  
  Toast.show({
    type: type, // Puedes usar 'success', 'error', 'info'
    text1: title,
    text2: message,
    position: 'top',
  });
};

export const toastConfig = {
  success: (props) => (
    <BaseToast
      {...props}
      style={{ borderLeftColor: colorList('GREEN1_1') }}
      contentContainerStyle={{ paddingHorizontal: 15 }}
      text1Style={{
        fontSize: 18,
        fontWeight: '400', 
        fontFamily: 'pJ_bold'
      }}
      text2Style={{
        fontSize: 14,
        fontWeight: '400',
        fontFamily: 'pJ'
      }}
    />
  ),
  error: (props) => (
    <ErrorToast
      {...props}
      style={{ borderLeftColor: colorList('RED1_1') }}
      text1Style={{
        fontSize: 18,
        fontFamily: 'pJ_bold'
      }}
      text2Style={{
        fontSize: 14,
        fontFamily: 'pJ'
      }}
    />
  ),
  info: (props) => (
    <BaseToast
      {...props}
      style={{ borderLeftColor: colorList('BLUE1_1') }}
      text1Style={{
        fontSize: 18,
        fontFamily: 'pJ_bold'
      }}
      text2Style={{
        fontSize: 14,
        fontFamily: 'pJ'
      }}
    />
  ),
  alert: (props) => (
    <BaseToast
      {...props}
      style={{ borderLeftColor: colorList('ORANGE1_1') }}
      text1Style={{
        fontSize: 18,
        fontFamily: 'pJ_bold'
      }}
      text2Style={{
        fontSize: 14,
        fontFamily: 'pJ'
      }}
    />
  ),
};
