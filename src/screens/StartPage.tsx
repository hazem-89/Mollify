import { useDimensions } from '@react-native-community/hooks';
import { StackNavigationProp } from '@react-navigation/stack';
import React, { useCallback, useState } from 'react';
import {
  Image,
  ImageBackground,
  SafeAreaView,
  StyleSheet,
  View,
} from 'react-native';
import MainBackGround from '../../assets/Images/MainBackGround.png';
import Tiger from '../../assets/Images/tiger-min.png';
import WelcomeSign from '../../assets/Images/WelcomeSign.png';
import Button from '../components/buttons/Buttons';
import SelectProfile from '../components/menu/SelectProfile';
import FormModal from '../components/modals/FormModal';
import { Text } from '../components/Text';
import { MainStackParams } from '../navigation/Main';
import { useLogin } from '../util/auth';

type Props = {
  navigation: StackNavigationProp<MainStackParams, 'StartPage'>;
};

export const StartPage: React.FC<Props> = ({ navigation }: Props) => {
  const dimensions = useDimensions();
  const [smallScreen] = useState(dimensions.screen.height < 600 ? true : false);
  const [btnClicked, setBtnClicked] = useState<string | undefined>();
  const { currentUser, logout } = useLogin();

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

  const handleEmit = useCallback((value: undefined) => {
    setBtnClicked(value); // This function will be called by the child component to emit a prop
  }, []);

  return (
    <>
      <ImageBackground source={MainBackGround} style={styles.Background} />
      <SafeAreaView style={styles.SafeArea}>
        <Image source={WelcomeSign} style={styles.WelcomeSign} />
        {currentUser ? (
          <View style={{ position: 'absolute', top: 50, left: 50 }}>
            <Button background="Close" onPress={logout} />
          </View>
        ) : null}
        {!currentUser ? (
          <>
            <View>
              <Button
                disable={btnClicked ? true : false}
                background="Gold"
                text="Sign in"
                onPress={() => setBtnClicked('Login')}
              />
              {btnClicked !== 'GoogleSignIn' ? (
                <Button
                  disable={btnClicked ? true : false}
                  background="Google"
                  text={'sign in with Google'}
                  onPress={() => setBtnClicked('GoogleSignIn')}
                />
              ) : (
                <Button
                  disable={btnClicked ? true : false}
                  background="GoogleButtonBroken"
                  onPress={() => setBtnClicked(undefined)}
                />
              )}

              <Text type="bold">OR</Text>
              <Button
                disable={btnClicked ? true : false}
                background="Green"
                text="Create account"
                onPress={() => setBtnClicked('SignUp')}
              />
            </View>
            <FormModal onEmit={handleEmit} formName={btnClicked} />
            <Image source={Tiger} style={styles.tiger} />
          </>
        ) : (
          <SelectProfile />
        )}
      </SafeAreaView>
    </>
  );
};
