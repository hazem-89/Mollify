import { useDimensions } from '@react-native-community/hooks';
import React, { useEffect, useState } from 'react';
import {
  ImageBackground,
  ImageSourcePropType,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import Close from '../../../assets/Images/Close.png';
import GoldenButton from '../../../assets/Images/GoldenButton.png';
import GoogleButtonBroken from '../../../assets/Images/GoogleButtonBroken.png';
import GoogleButton from '../../../assets/Images/GoogleButtonWithIcon.png';
import GreenButtonImage from '../../../assets/Images/GreenButton.png';
import TaskNotificationIcon from '../../../assets/Images/Icons/TaskNotificationIcon.png';
import AddButtonImage from '../../../assets/Images/AddButton.png';
import InfoButtonImage from '../../../assets/Images/info.png';
import TodoButtonImage from '../../../assets/Images/todo.png';
import BellButtonImage from '../../../assets/Images/bell.png';
import CancelButton from '../../../assets/Images/CancelButton.png';
import TrophyButtonImage from '../../../assets/Images/trophy.png';
import SchoolTasksIcon from '../../../assets/Images/Icons/SchoolTasksIcon.png';
import SpecialTaskIcon from '../../../assets/Images/Icons/SpecialTaskIcon.png';
import ActivityIcon from '../../../assets/Images/Icons/ActivityIcon.png';
import DeleteIcon from '../../../assets/Images/Icons/DeleteIcon.png';
import DoneIcon from '../../../assets/Images/Icons/DoneIcon.png';
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

  const styles = StyleSheet.create({
    Green: {
      justifyContent: 'center',
      width: smallScreen ? 200 : 270,
      height: smallScreen ? 50 : 70,
      alignSelf: 'center',
    },
    GreenForms: {
      justifyContent: 'center',
      width: smallScreen ? 90 : 150,
      height: smallScreen ? 25 : 40,
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
      width: smallScreen ? 150 : 200,
      height: smallScreen ? 45 : 55,
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
      width: smallScreen ? 50 : 70,
      height: smallScreen ? 50 : 70,
    },
    todoStyle: {
      width: smallScreen ? 60 : 70,
      height: smallScreen ? 50 : 60,
    },
    bellStyle: {
      width: smallScreen ? 42 : 60,
      height: smallScreen ? 45 : 65,
    },
    trophyStyle: {
      width: smallScreen ? 35 : 45,
      height: smallScreen ? 40 : 50,
    },
    CategoriesStyle: {
      width: smallScreen ? 50 : 70,
      height: smallScreen ? 50 : 70,
    },
    DeleteTask: {
      width: smallScreen ? 30 : 50,
      height: smallScreen ? 30 : 50,
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
    } else if (background === 'SchoolTasks') {
      setSource(SchoolTasksIcon);
      setStyle(styles.CategoriesStyle);
    } else if (background === 'SpecialTasks') {
      setSource(SpecialTaskIcon);
      setStyle(styles.CategoriesStyle);
    } else if (background === 'Activities') {
      setSource(ActivityIcon);
      setStyle(styles.CategoriesStyle);
    } else if (background === 'CleaningTasks') {
      setSource(TodoButtonImage);
      setStyle(styles.todoStyle);
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
      setStyle(styles.DeleteTask);
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
        <Text type={background}>{text}</Text>
      </ImageBackground>
    </TouchableOpacity>
  );
}

export default Button;
