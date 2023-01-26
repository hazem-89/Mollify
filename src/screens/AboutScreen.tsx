import { useDimensions } from '@react-native-community/hooks';
import { useNavigation } from '@react-navigation/native';
import React, { useState } from 'react';
import {
  Dimensions,
  ImageBackground,
  SafeAreaView,
  StyleSheet,
  TouchableOpacity,
  View,
} from 'react-native';
import { Text } from '../components/Text';
import DisplayTasksBackGround from '../../assets/images/DisplayTasksBackGround.png';
import RewardMainTitleBg from '../../assets/images/RewardMainTitleBg.png';
import GoBackArrow from '../../assets/images/GoBackArrow.png';

const AboutScreen = () => {
  const navigation = useNavigation();
  const dimensions = useDimensions();

  const [smallScreen] = useState(dimensions.screen.height < 600);
  const ScreenWidth = Dimensions.get('window').width;
  const ScreenHeight = Dimensions.get('window').height;

  const styles = StyleSheet.create({
    Container: {},
    Background: {
      position: 'relative',
      overflowX: 'scroll',
      height: ScreenHeight,
      width: ScreenWidth,
      flex: 1,
      resizeMode: 'stretch',
    },
    RewardMainTitleBg: {
      width: smallScreen ? 0.25 * ScreenWidth : 0.3 * ScreenWidth,
      height: 0.2 * ScreenHeight,
      marginLeft: 'auto',
      marginRight: 'auto',
      alignItems: 'center',
      justifyContent: 'center',
    },
    alignAbout: {
      marginTop: 30,
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
      width: smallScreen ? 500 : 700,
      marginLeft: 'auto',
      marginRight: 'auto',
    },
    SafeArea: {
      overflow: 'hidden',
      position: 'absolute',
      width: ScreenWidth,
      maxWidth: ScreenWidth,
      maxHeight: ScreenHeight,
      height: ScreenHeight,
      display: 'flex',
      alignItems: 'center',
      zIndex: 1,
    },
    GoBackButton: {
      position: 'absolute',
      right: 0.05 * ScreenWidth,
      top: 0.07 * ScreenHeight,
      zIndex: 5,
    },
    GoBackToRoomImageStyle: {
      width: smallScreen ? 0.15 * ScreenWidth : 0.22 * ScreenWidth,
      height: 0.17 * ScreenHeight,
      alignItems: 'center',
      justifyContent: 'center',
    },
  });
  return (
    <ImageBackground source={DisplayTasksBackGround} style={styles.Background}>
      <SafeAreaView>
        <View style={{}}>
          <ImageBackground
            source={RewardMainTitleBg}
            style={styles.RewardMainTitleBg}
          >
            <View style={{ marginBottom: '10%' }}>
              <Text type="header">About</Text>
            </View>
          </ImageBackground>
        </View>
        <View style={styles.GoBackButton}>
          <TouchableOpacity
            // @ts-ignore
            onPress={() => navigation.navigate('RoomScreen')}
          >
            <ImageBackground
              source={GoBackArrow}
              style={styles.GoBackToRoomImageStyle}
            >
              <View style={{ marginRight: '25%', marginBottom: 10 }}>
                <Text type="header">Room</Text>
              </View>
            </ImageBackground>
          </TouchableOpacity>
        </View>
        <View style={styles.alignAbout}>
          <Text type="MenuTitle">Mollify</Text>
          <View style={{ marginTop: 30 }}>
            <Text type="aboutText">
              Mollify is to appease the anger or anxiety. That is why Mollify is
              aiming for a clean room will lead to a decrease in anxiety and
              anger.
            </Text>
          </View>
          <View style={{ marginTop: 30 }}>
            <Text type="aboutText">
              Application is developed by Hazem Kawas, Philip Risberg and Erik
              Isaksson
            </Text>
          </View>
          <View>
            <View style={{ marginTop: 30 }}>
              <Text type="aboutText">
                Images and graphic designs are made by upklyak on Freepik,
                https://www.freepik.com/author/upklyak
              </Text>
            </View>
          </View>
        </View>
      </SafeAreaView>
    </ImageBackground>
  );
};

export default AboutScreen;

