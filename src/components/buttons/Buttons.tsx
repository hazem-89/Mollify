import { useDimensions } from '@react-native-community/hooks';
import React, { useEffect, useState } from 'react';
import {
  Dimensions,
  ImageBackground,
  ImageSourcePropType,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import Close from '../../../assets/images/Close.png';
import GoldenButton from '../../../assets/images/GoldenBut.png';
import GoogleButtonBroken from '../../../assets/images/GoogleButtonBroken.png';
import GoogleButton from '../../../assets/images/GoogleButtonWithIcon.png';
import GreenButtonImage from '../../../assets/images/GreenBut.png';
import TaskNotificationIcon from '../../../assets/images/Icons/TaskNotificationIcon.png';
import AddButtonImage from '../../../assets/images/AddButton.png';
import InfoButtonImage from '../../../assets/images/info.png';
import BellButtonImage from '../../../assets/images/bell.png';
import CancelButton from '../../../assets/images/Cancel.png';
import TrophyButtonImage from '../../../assets/images/trophy.png';
import ArrowButton from '../../../assets/images/Polygon.png';
import TodoButtonImage from '../../../assets/images/todo.png';
import EditButton from '../../../assets/images/EditButton.png';
import ReverseArrowButton from '../../../assets/images/PolygonReverse.png';
import DeleteIcon from '../../../assets/images/Icons/DeleteIcon.png';
import DoneIcon from '../../../assets/images/Icons/DoneIcon.png';
import GoBackArrowLeft from '../../../assets/images/GoBackArrowLeft.png';
import SettingsWheel from '../../../assets/images/settingsWheel.png';
import ProfileIcon from '../../../assets/images/profileIcon.png';
import MenuIcon from '../../../assets/images/menuIcon.png';
import LogoutIcon from '../../../assets/images/logoutIcon.png';
import { Text } from '../Text';

type ButtonProps = {
  onPress: () => void;
  text?: string;
  background: string;
  disable?: boolean;
};

function Button({
  onPress = Function,
  text = '',
  background = '',
  disable = false,
}: ButtonProps) {
  const dimensions = useDimensions();
  const [smallScreen] = useState(dimensions.screen.height < 600 ? true : false);
  const [source, setSource] = useState<ImageSourcePropType | undefined>(
    undefined,
  );
  const [style, setStyle] = useState<Object>({});
  const ScreenWidth = Dimensions.get('window').width;
  const ScreenHeight = Dimensions.get('window').height;
  const styles = StyleSheet.create({
    Green: {
      justifyContent: 'center',
      width: smallScreen ? 0.5 * ScreenHeight : 0.49 * ScreenHeight,
      height: smallScreen ? 0.2 * ScreenHeight : 0.16 * ScreenHeight,
      alignSelf: 'center',
    },
    GreenForms: {
      justifyContent: 'center',
      width: smallScreen ? 0.4 * ScreenHeight : 0.3 * ScreenHeight,
      height: smallScreen ? 0.13 * ScreenHeight : 0.09 * ScreenHeight,
      alignSelf: 'center',
      // marginTop: smallScreen ? 20 : 30,
    },
    Google: {
      justifyContent: 'center',
      width: smallScreen ? 250 : 300,
      height: smallScreen ? 60 : 70,
      alignSelf: 'center',
      marginTop: 20,
    },
    Gold: {
      justifyContent: 'center',
      width: 0.25 * ScreenWidth,
      height: smallScreen ? 0.17 * ScreenHeight : 0.14 * ScreenHeight,
      alignSelf: 'center',
      resizeMode: 'contain',
    },
    Close: {
      width: smallScreen ? 40 : 60,
      height: smallScreen ? 40 : 60,
    },
    Add: {
      width: smallScreen ? 40 : 60,
      height: smallScreen ? 40 : 60,
    },
    infoStyle: {
      width: smallScreen ? 50 : 60,
      height: smallScreen ? 50 : 60,
    },
    todoStyle: {
      width: smallScreen ? 60 : 70,
      height: smallScreen ? 50 : 60,
    },
    bellStyle: {
      width: smallScreen ? 42 : 55,
      height: smallScreen ? 45 : 60,
    },
    trophyStyle: {
      width: smallScreen ? 35 : 45,
      height: smallScreen ? 40 : 50,
    },
    arrowStyle: {
      width: smallScreen ? 30 : 30,
      height: smallScreen ? 30 : 30,
    },
    DeleteTask: {
      width: smallScreen ? 50 : 60,
      height: smallScreen ? 50 : 60,
    },
    TaskNotification: {
      width: smallScreen ? 40 : 50,
      height: smallScreen ? 40 : 50,
    },
    GoBackArrowLeft: {
      width: smallScreen ? 60 : 90,
      height: smallScreen ? 40 : 50,
    },
    settingsStyle: {
      width: smallScreen ? 60 : 80,
      height: smallScreen ? 60 : 80,
    },
    EditButton: {
      width: smallScreen ? 50 : 60,
      height: smallScreen ? 50 : 60,
    },
  });

  useEffect(() => {
    if (background === 'Gold') {
      setSource(GoldenButton);
      setStyle(styles.Gold);
    } else if (background === 'Green') {
      setSource(GreenButtonImage);
      setStyle(styles.Green);
    } else if (background === 'Google') {
      setSource(GoogleButton);
      setStyle(styles.Google);
    } else if (background === 'Close') {
      setSource(Close);
      setStyle(styles.Close);
    } else if (background === 'GreenForms') {
      setSource(GreenButtonImage);
      setStyle(styles.GreenForms);
    } else if (background === 'GoogleButtonBroken') {
      setSource(GoogleButtonBroken);
      setStyle(styles.Google);
    } else if (background === 'AddButtonImage') {
      setSource(AddButtonImage);
      setStyle(styles.Add);
    } else if (background === 'InfoButtonImage') {
      setSource(InfoButtonImage);
      setStyle(styles.infoStyle);
    } else if (background === 'TodoButtonImage') {
      setSource(TodoButtonImage);
      setStyle(styles.todoStyle);
    } else if (background === 'BellButtonImage') {
      setSource(BellButtonImage);
      setStyle(styles.bellStyle);
    } else if (background === 'TrophyButtonImage') {
      setSource(TrophyButtonImage);
      setStyle(styles.trophyStyle);
    } else if (background === 'ArrowButton') {
      setSource(ArrowButton);
      setStyle(styles.arrowStyle);
    } else if (background === 'ReverseArrowButton') {
      setSource(ReverseArrowButton);
      setStyle(styles.arrowStyle);
    } else if (background === 'DeleteTask') {
      setSource(DeleteIcon);
      setStyle(styles.DeleteTask);
    } else if (background === 'DoneIcon') {
      setSource(DoneIcon);
      setStyle(styles.DeleteTask);
    } else if (background === 'Cancel') {
      setSource(CancelButton);
      setStyle(styles.GreenForms);
    } else if (background === 'TaskNotification') {
      setSource(TaskNotificationIcon);
      setStyle(styles.TaskNotification);
    } else if (background === 'GoBackArrowLeft') {
      setSource(GoBackArrowLeft);
      setStyle(styles.GoBackArrowLeft);
    } else if (background === 'SettingsWheel') {
      setSource(SettingsWheel);
      setStyle(styles.settingsStyle);
    } else if (background === 'ProfileIcon') {
      setSource(ProfileIcon);
      setStyle(styles.settingsStyle);
    } else if (background === 'LogoutIcon') {
      setSource(LogoutIcon);
      setStyle(styles.settingsStyle);
    } else if (background === 'EditButton') {
      setSource(EditButton);
      setStyle(styles.EditButton);
    } else if (background === 'MenuIcon') {
      setSource(MenuIcon);
      setStyle(styles.infoStyle);
    }
  }, [background]);

  return (
    <TouchableOpacity
      activeOpacity={disable ? 1 : 0.2}
      onPress={() => {
        disable ? null : onPress();
      }}
    >
      <ImageBackground source={source} style={style}>
        {disable ? (
          <>
            <Text type="disable">{text}</Text>
          </>
        ) : (
          <>
            <Text type={background}>{text}</Text>
          </>
        )}
      </ImageBackground>
    </TouchableOpacity>
  );
}

export default Button;

