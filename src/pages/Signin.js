import { ImageBackground, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import React, { useLayoutEffect, Dimensions, useState, useContext } from 'react';
import { Button, TextInput, Snackbar } from 'react-native-paper';
import InputField from './../Components/Ui/InputField';
import CustomButton from './../Components/Ui/CustomButton';
import Colorss from './../Utils/Colorss';
import LottieView from 'lottie-react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Spinner from 'react-native-loading-spinner-overlay/lib';
import { AuthContext } from './../Context/AuthContext';
import AwesomeAlert from 'react-native-awesome-alerts';

const Signin = ({ navigation }) => {
  const { IsLoading, login, visibles, snackText, setvisible } = useContext(AuthContext)
  const [userName, setuserName] = useState('');
  const [password, setpassword] = useState('');
  const [errorPassMsg, setErrorPassMsg] = useState("");
  const [errorMsg, setErrorMsg] = useState("");
  const [isValidUser, setisValidUser] = useState(1)
  const [isValidPassword, setisValidPassword] = useState(12)
  const [donIcon, setDoneIcon] = useState(false)
  const [donIconPassword, setDoneIconPassword] = useState(false)
  const [UnderlineColor, setUnderlineColor] = useState(false);
  const [UnderlineColorPass, setUnderlineColorPass] = useState(false);

  useLayoutEffect(() => {
    navigation.setOptions({
      headerShown: false,
      contentStyle: {
        backgroundColor: Colorss.black900,
      },
    });
  }, []);

  function onMobileTyping(val) {
    if (val.trim().length == 10) {
      setuserName(val)
      setisValidUser(1)
      setDoneIcon(true)
      setUnderlineColor(false)

    } else if (isNaN(val.trim())) {
      setisValidUser(-2)
      setDoneIcon(false)
      setUnderlineColor(true)
      setErrorMsg('Please enter digits only');
    } else {
      setisValidUser(-1)
      setDoneIcon(false)
      setUnderlineColor(true)
      setErrorMsg('Please enter valid 10 digit number');
    }
  }

  function onPasswordTyping(val) {
    if (val.trim().length == 6) {
      setisValidPassword(12)
      setpassword(val)
      setDoneIconPassword(true)
      setUnderlineColorPass(false)
    }
    else if (val.trim().length >= 10) {
      setisValidPassword(-2)
      setDoneIconPassword(false)
      setUnderlineColorPass(true)
      setErrorPassMsg('password should not be more than 10 charctors');
    } else if (val.trim().length > 6) {
      setisValidPassword(12)
      setpassword(val)
      setDoneIconPassword(true)
      setUnderlineColorPass(false)
    }
    else {
      setisValidPassword(-9)
      setDoneIconPassword(false)
      setUnderlineColorPass(true)
      setErrorPassMsg('Please enter 6 charcators');
    }
  }

  function onSubmitButton() {
    if (isValidUser != 1 || isValidPassword != 12) {
      alert('Invalid Credentials')
    } else if (userName == 0 || password == 0) {
      alert('All fields are mandtory')
    }
    else {
      login(userName, password)
    }
  }
  return (
    <ImageBackground
      blurRadius={50}
      style={styles.backGrnd}
      resizeMode="cover"
      source={require('../Assets/Background/Gradient/Gradient-Phone-Wallpaper-017.jpg')}>
      <View style={styles.mainView}>
        <Spinner visible={IsLoading} />
        <View style={styles.innerView}>
          <Text style={styles.title}>Signin</Text>
          <Text style={styles.title2}>to manage all assets </Text>
          <View>
            <View style={{ marginBottom: 15 }}>
              <InputField
                label={<Text style={{ color: '#fff' }}>Mobile Number</Text>}
                iconName="call-sharp"
                iconSize={30}
                iconColor={Colorss.White}
                keyboardType="number-pad"
                onChangeText={onMobileTyping}
                activeUnderlineColor={UnderlineColor ? Colorss.redError2 : Colorss.White}
                rightItem={<TextInput.Icon name={() => donIcon ? <Ionicons name='checkmark-done-circle-sharp' color={'#D9F8C4'} size={30} /> : null} />}
              />
              {
                isValidUser == 1 ? null : <Text style={styles.errorText}>{errorMsg}</Text>
              }

            </View>
            <View >
              <InputField
                label={<Text style={{ color: '#fff' }}>Password</Text>}
                iconName="lock-closed-sharp"
                iconSize={30}
                iconColor={Colorss.White}
                onChangeText={onPasswordTyping}
                secureTextEntry={true}
                activeUnderlineColor={UnderlineColorPass ? Colorss.redError2 : Colorss.White}
                rightItem={<TextInput.Icon name={() => donIconPassword ? <Ionicons name='checkmark-done-circle-sharp' color={'#D9F8C4'} size={30} /> : null} />}
              />
              {
                isValidPassword == 12 ? null : <Text style={styles.errorText}>{errorPassMsg}</Text>
              }
            </View>

          </View>

          <View>

            <CustomButton
              newStyle={{ marginTop: 20 }}
              btnTitle={'Login'}
              btnType="contained"
              onPress={onSubmitButton}
            />
            <TouchableOpacity
              onPress={() => {
                navigation.navigate('Signup');
              }}>
              <Text style={styles.newuser}>New User ? Register Now</Text>
            </TouchableOpacity>

          </View>

        </View>
        <View style={styles.lottie}>

          <LottieView
            style={{ height: undefined, width: '100%' }}
            resizeMode="cover"
            source={require('../Assets/Lotties/greenCloud.json')}
            autoPlay
            loop
          />
          {/* <Snackbar
            visible={visibles}
            onDismiss={() => { setvisible(false) }}
            action={{
              label: 'Try Again..',
              onPress: () => { setvisible(false) }
              ,
            }}>
            {snackText}
          </Snackbar> */}


          <AwesomeAlert
            show={visibles}
            showProgress={false}
            title="Oopss ! 😕"
            message={snackText}
            messageStyle={{ fontSize: 20, textAlign: 'center', fontWeight: 'bold' }}
            closeOnTouchOutside={true}
            closeOnHardwareBackPress={false}
            // showCancelButton={false}
            showConfirmButton={true}
            // cancelText="No, cancel"
            confirmText="Try Again..."
            confirmButtonColor="#DD6B55"
            // onCancelPressed={() => {
            //   setvisible(false)
            // }}
            onConfirmPressed={() => {
              setvisible(false)
            }}
          />


        </View>
      </View>
    </ImageBackground>
  );
};

export default Signin;

const styles = StyleSheet.create({
  backGrnd: {
    flex: 1,
    width: '100%',
    height: '100%',
  },
  errorText: {
    color: '#FF8C8C',
    fontWeight: '500'
  },
  innerView: {
    flex: 3,
    // backgroundColor: 'red',
    justifyContent: 'center',
    paddingHorizontal: 20,
  },
  lottie: {
    flex: 1,
  },
  mainView: {
    flex: 1,
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    // backgroundColor: 'rgba(0,0,0,0.3)'
  },
  title: {
    fontSize: 35,
    marginVertical: 5,
    color: Colorss.black900,
    color: Colorss.White,
  },
  title2: {
    fontSize: 15,
    color: Colorss.greyFine,
    marginBottom: 35,
  },
  newuser: {
    fontSize: 15,
    color: Colorss.White,
    textAlign: 'center',
    marginTop: 20,
  },
});
