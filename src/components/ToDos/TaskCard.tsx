import React, { useState } from 'react';
import {
  ImageBackground,
  StyleSheet,
  TouchableOpacity,
  View,
} from 'react-native';
import { Tasks } from '../../Interfaces';
import PointsBackground from '../../../assets/Images/Icons/PointsBackground.png';
import TimeBackground from '../../../assets/Images/Icons/TimeBackground.png';
import { useDimensions } from '@react-native-community/hooks';
import colors from '../../constants/colors';
import { Text } from '../../components/Text';

interface Props {
  task: Tasks;
}

const TaskCard = ({ task }: Props) => {
  const dimensions = useDimensions();
  const [parent, setParent] = useState(true);

  const [smallScreen] = useState(dimensions.screen.height < 600);
  const styles = StyleSheet.create({
    CardContainer: {
      flex: 1,
      flexDirection: 'row',
      justifyContent: 'space-between',
      marginTop: 10,
      borderBottomWidth: 1,
      borderBottomColor: colors.primary,
      maxHeight: smallScreen ? 50 : 75,
      maxWidth: smallScreen ? 350 : 500,
      marginLeft: smallScreen ? 30 : 50,
    },
    TextView: {
      flex: 1,
      maxWidth: smallScreen ? 250 : 300,
      height: 50,
      justifyContent: 'center',
    },
    TimeBackground: {
      width: smallScreen ? 75 : 100,
      height: smallScreen ? 40 : 50,
    },
    PointsBackground: {
      width: smallScreen ? 40 : 60,
      height: smallScreen ? 40 : 60,
    },
  });

  return (
    <View style={styles.CardContainer}>
      {parent && (
        <View
          style={{
            position: 'absolute',
            left: smallScreen ? -25 : -40,
            height: smallScreen ? 20 : 30,
            width: smallScreen ? 20 : 30,
            backgroundColor: colors.background,
            alignItems: 'center',
            justifyContent: 'center',
            borderRadius: 50,
          }}
        >
          <TouchableOpacity>
            <Text>E</Text>
          </TouchableOpacity>
        </View>
      )}
      <View style={styles.TextView}>
        {/* <Text type="todoList">{task.taskDescription}</Text> */}
        {/* <Text type="todoList">{date}</Text> */}
      </View>
      <ImageBackground
        source={PointsBackground}
        style={styles.PointsBackground}
      >
        <View
          style={{
            width: smallScreen ? 40 : 60,
            height: smallScreen ? 40 : 60,
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <Text type="todoList">{task.pointsValue}</Text>
        </View>
      </ImageBackground>
      <ImageBackground source={TimeBackground} style={styles.TimeBackground}>
        <View
          style={{
            width: smallScreen ? 75 : 100,
            height: smallScreen ? 40 : 50,
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          {/* <Text type="todoList">{task.timeValue}</Text> */}
        </View>
      </ImageBackground>
    </View>
  );
};

export default TaskCard;
