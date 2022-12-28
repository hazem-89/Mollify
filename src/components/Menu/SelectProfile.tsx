import { useDimensions } from '@react-native-community/hooks';
import { StackNavigationProp } from '@react-navigation/stack';
import React, { useState } from 'react';
import {
  View,
  StyleSheet,
  Image,
  SafeAreaView,
  Text,
  Modal
} from 'react-native';
import { MainStackParams } from '../../navigation/Main';
import paperWall from '../../assets/Images/Paper.png'
import welcomeSign from '../../assets/Images/welcomeSign.png'
import tigerAvatar from '../../assets/Images/tigerAvatar.png'

type Props = {
  navigation: StackNavigationProp<MainStackParams, 'StartPage'>;
};
export const SelectProfile: React.FC<Props> = ({ navigation }: Props) => {
  const dimensions = useDimensions();

  const [smallScreen] = useState(dimensions.screen.height < 600 ? true : false);
  const [signUpMenuOpen, setSignUpMenuOpen] = useState(false);
  const handleMenu = () => {
    signUpMenuOpen ? setSignUpMenuOpen(false) : setSignUpMenuOpen(true);
  };
  const [modalOpen, setModalOpen] = useState<boolean>(false);
  const handleOpen = () => setModalOpen(true);
    const handleClose = () => setModalOpen(false);

  const styles = StyleSheet.create({
    container: {
      marginTop: '-100px',
      width: '100%',
      height: '100%',
    },
    textStyle: {
        position: 'absolute',
        top: -200, 
        left: 0, 
        right: 0, 
        bottom: 0, 
        justifyContent: 'center', 
        alignItems: 'center',
    },
    textStyle2: {
        fontSize: 40,
        color: "rgba(0, 0, 0, 0.5)"
    },
    WelcomeSign: {
      justifyContent: 'center',
      alignSelf: 'center',
      width: '500px',
      height: '300px',
      resizeMode: 'contain',
      marginBottom: "-300px",
      position: "absolute",
      top: 20
    },
    backGroundImage: {
      width: '100%',
      height: '100%',
    },
    paperWallImage: {
      width: '900px',
      height: '900px',
      justifyContent: 'center',
      alignSelf: 'center',
      resizeMode: 'contain',
      position: 'relative',
    },
    tigerAvatarStyle: {
      width: '100px',
      height: '100px',
      resizeMode: 'contain',
      position: 'absolute',
        top: 400, 
        left: 500, 
        right: 0, 
        bottom: 0, 
    },
  });

  return (
    <SafeAreaView style={styles.container}>
        <Modal >
        <Image source={paperWall} style={styles.paperWallImage}/>
        <Image source={welcomeSign} style={styles.WelcomeSign}></Image>
        <View style={styles.textStyle}>
        <Text style={styles.textStyle2}>Select profile to view</Text>
        </View>
        
        <Image source={tigerAvatar} style={styles.tigerAvatarStyle}/>
        </Modal>
      
    </SafeAreaView>
  );
};