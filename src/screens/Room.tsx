import { useDimensions } from '@react-native-community/hooks';
import { StackNavigationProp } from '@react-navigation/stack';
import React, { useState } from 'react';
import {
  // Image,
  ImageBackground,
  SafeAreaView,
  StyleSheet,
  // View,
} from 'react-native';
import RoomUI from '../components/RoomUI';
import { MainStackParams } from '../navigation/Main';
import roomImage from '../../assets/Images/roomExample.png';

// import Button from '../components/buttons/Buttons';
// import FormModal from '../components/modals/FormModal';
// import { Text } from '../components/Text';
// import { useLogin } from '../util/auth';

type Props = {
  navigation: StackNavigationProp<MainStackParams, 'RoomScreen'>;
};

export const RoomScreen: React.FC<Props> = ({ navigation }: Props) => {
  const dimensions = useDimensions();
  const [smallScreen] = useState(dimensions.screen.height < 600);
  // const [btnClicked, setBtnClicked] = useState<string | undefined>();
  // const [component, setComponent] = useState<JSX.Element | undefined>();
  // const { currentUser, logout } = useLogin();

  const styles = StyleSheet.create({
    WelcomeSign: {
      justifyContent: 'center',
      alignSelf: 'center',
      width: smallScreen ? 350 : 450,
      height: smallScreen ? 100 : 140,
      top: 10,
      marginBottom: 10,
      zIndex: 5,
    },
    Background: {
      position: 'relative',
      width: '100%',
      height: '100%',
    },
    tiger: {
      position: 'absolute',
      bottom: 0,
      left: smallScreen ? '15%' : '18%',
      flex: 1,
      height: 180,
      width: 130,
    },
    SafeArea: {
      overflow: 'hidden',
      position: 'absolute',
      width: '100%',
      maxWidth: '100%',
      height: '100%',
      maxHeight: '100%',
      display: 'flex',
      alignItems: 'center',
      zIndex: 1,
    },
  });

  /*  function handleClick(state: string | undefined) {
     setBtnClicked(state);
         switch (state) {
       case 'Login':
         setComponent(<LoginForm />);
         break;
       case 'SignUp':
         setComponent(<SignUpForm />);
         break;
       case 'GoogleSignIn':
         setComponent(undefined);
         break;
       default:
         setComponent(undefined);
         break;
     }
   } */

  return (
    <>
      {/* {currentUser && ( */}
      <>
        <ImageBackground source={roomImage} style={styles.Background} />
        <SafeAreaView style={styles.SafeArea}>
          <RoomUI />
        </SafeAreaView>
      </>
      {/* )} */}
    </>
  );
};
