import { useDimensions } from '@react-native-community/hooks';
import React, { Dispatch, SetStateAction, useState } from 'react';
import { Alert, Image, StyleSheet, TouchableOpacity, View } from 'react-native';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import hourglass from '../../../assets/images/Icons/hourglass.png';
import PointsIcon from '../../../assets/images/Icons/PointsIcon.png';
import { useDataContext } from '../../util/context/DataContext';
import Button from '../buttons/Buttons';
import { TextInput } from '../CustomInput';
import { Text } from '../Text';

type ErrorType = {
  rewardTitle?: string;
  points?: string;
  time?: string;
};

export const ScoreboardForm = () => {
  const dimensions = useDimensions();
  // const { rewards } = useDataContext();
  // useEffect(() => {
  //   getRewards();
  // }, []);
  const [smallScreen] = useState(dimensions.screen.height < 600);
  const [errors, setErrors]: [ErrorType, Dispatch<SetStateAction<{}>>] =
    React.useState({});
  const [endTime, setEndTime] = useState<Date>();
  const [pointsValue, setPointsValue] = useState('');
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
  const { addDocToFS } = useDataContext();
  // const rewardsFromDb = profileRewards?.filter(reward => reward);
  const [state, setState] = useState({
    rewardTitle: '',
    selected: '',
  });
  const showDatePicker = () => {
    setDatePickerVisibility(true);
  };

  const hideDatePicker = () => {
    setDatePickerVisibility(false);
  };

  const handleConfirm = (date: Date) => {
    console.warn('A date has been picked: ', date);
    setEndTime(date);
    hideDatePicker();
  };

  const submit = () => {
    const nextErrors: ErrorType = {};
    if (!state.rewardTitle) {
      nextErrors.rewardTitle = 'This field is required.';
    }
    !pointsValue ? (nextErrors.points = 'you need to set points') : '';
    !endTime ? (nextErrors.time = 'you need to set Time') : '';
    setErrors(nextErrors);
    console.error(nextErrors);
    if (Object.keys(nextErrors).length === 0) {
      console.log('no err');
      const newReward = {
        title: state.rewardTitle,
        points: pointsValue,
        endTime: endTime?.toString(),
        asignedProfileId: 'pjVcsYpBE46nGlDmHmO0',
        isDone: false,
      };
      addDocToFS('Rewards', newReward);
      Alert.alert('Success!', `Title: ${state.rewardTitle}`);
    }
    if (Object.keys(nextErrors).length > 0) {
      return null;
    }
    return null;
  };

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      position: 'relative',
      minHeight: smallScreen ? 250 : 430,
      minWidth: smallScreen ? 330 : 650,
      padding: smallScreen ? 30 : 50,
      paddingBottom: 200,
    },
    headerStyle: {
      marginTop: smallScreen ? 30 : 50,
    },
    input: {
      color: 'black',
    },
    inputContainer: {
      alignItems: 'center',
    },
    icons: {
      width: smallScreen ? 25 : 40,
      height: smallScreen ? 40 : 70,
      marginRight: 10,
    },
    points: {
      width: smallScreen ? 100 : 200,
      display: 'flex',
      flexDirection: 'row',
      justifyContent: 'center',
      alignItems: 'center',
      marginTop: 20,
    },
    time: {
      width: smallScreen ? 100 : 200,
      display: 'flex',
      flexDirection: 'row',
      justifyContent: 'center',
      alignItems: 'center',
      marginTop: 20,
    },
  });

  return (
    <View style={styles.container}>
      <View style={styles.headerStyle}>
        <Text type="header">Add Reward</Text>
      </View>
      <View style={styles.inputContainer}>
        <View>
          <TextInput
            placeholder="Reward title:"
            placeholderTextColor="#000"
            autoCapitalize="none"
            value={state.rewardTitle}
            onChangeText={(text: string) =>
              setState({ ...state, rewardTitle: text })
            }
            errorText={errors.rewardTitle}
            style={styles.input}
          />
        </View>
        <View style={styles.points}>
          <Image source={PointsIcon} style={styles.icons} />
          <TextInput
            placeholder="Points"
            keyboardType="number-pad"
            autoCapitalize="none"
            onChangeText={changedPin => setPointsValue(changedPin)}
            value={pointsValue}
            style={styles.input}
            errorText={errors.rewardTitle}
          />
        </View>
        <View style={styles.time}>
          <TouchableOpacity
            disabled={!state.rewardTitle}
            onPress={showDatePicker}
            style={{ flexDirection: 'row', alignItems: 'center' }}
          >
            <Image source={hourglass} style={styles.icons} />
            <Text type="text">Set Time</Text>
          </TouchableOpacity>
          <DateTimePickerModal
            style={{
              shadowColor: '#fff',
              shadowRadius: 0,
              shadowOpacity: 1,
              shadowOffset: { height: 0, width: 0 },
            }}
            isVisible={isDatePickerVisible}
            mode="datetime"
            onConfirm={handleConfirm}
            onCancel={hideDatePicker}
            minimumDate={new Date()}
            minuteInterval={10}
          />
          <Text type="errorText">{errors.time}</Text>
        </View>
        <View style={{ marginTop: smallScreen ? 10 : 20 }}>
          <Button background="GreenForms" text="Add" onPress={() => submit()} />
        </View>
      </View>
    </View>
  );
};
