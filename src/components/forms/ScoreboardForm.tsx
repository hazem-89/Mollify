import { Alert, StyleSheet, View, Image } from 'react-native';
import React, { Dispatch, SetStateAction, useCallback, useState } from 'react';
import Button from '../buttons/Buttons';
import { useDimensions } from '@react-native-community/hooks';
import { Text } from '../Text';
import uuid from 'react-native-uuid';
import { doc, updateDoc, arrayUnion } from 'firebase/firestore';
import { db } from '../../../firebaseConfig';
import { TextInput } from '../CustomInput';
import PointsIcon from '../../../assets/Images/Icons/PointsIcon.png';
import hourglass from '../../../assets/Images/Icons/hourglass.png';

type ErrorType = {
  rewardTitle?: string;
  points?: string;
  time?: string;
};

export const ScoreboardForm = () => {
  const dimensions = useDimensions();
  const [smallScreen] = useState(dimensions.screen.height < 600 ? true : false);
  const [errors, setErrors]: [ErrorType, Dispatch<SetStateAction<{}>>] =
    React.useState({});
  const [btnClicked, setBtnClicked] = useState<string | undefined>();
  const [timeValue, setTimeValue] = useState(null);
  const handleEmit = useCallback((value: undefined) => {
    setBtnClicked(value); // This function will be called by the child component to emit a prop
  }, []);
  const [state, setState] = useState({
    rewardTitle: '',
    selected: '',
  });
  uuid.v4();

  const [time, setTime] = useState([
    { label: '5 days', value: '1' },
    { label: '7 days', value: '2D' },
    { label: '10 days', value: '3D' },
  ]);
  const [pointsValue, setPointsValue] = useState(null);
  const [points, setPoints] = useState([
    { label: '25 Points', value: '20' },
    { label: '50 Points', value: '30' },
    { label: '75 Points', value: '40' },
    { label: '100 Points', value: '50' },
  ]);

  const addReward = async () => {
    const currDocRef = doc(db, 'profiles');
    const newTodo = {
      id: uuid.v4(),
      taskTitle: state.rewardTitle,
      pointsValue,
      timeValue,
    };
    await updateDoc(currDocRef, { todo: arrayUnion(newTodo) });
  };

  const submit = () => {
    const nextErrors: ErrorType = {};
    if (!state.rewardTitle) {
      nextErrors.rewardTitle = 'This field is required.';
    }
    !pointsValue ? (nextErrors.points = 'you need to set points') : '';
    !timeValue ? (nextErrors.time = 'you need to set Time') : '';
    setErrors(nextErrors);
    console.log(nextErrors);
    if (Object.keys(nextErrors).length === 0) {
      console.log('no err');
      addReward();
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
    time: {
      width: smallScreen ? 100 : 200,
      display: 'flex',
      flexDirection: 'row',
    },
  });

  return (
    <View style={styles.container}>
      <View style={{ marginTop: 90 }}>
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
        <View style={{ display: 'flex', flexDirection: 'row' }}>
          <Image source={PointsIcon} style={styles.icons} />
          <TextInput
            placeholder="Points"
            keyboardType="number-pad"
            autoCapitalize="none"
            style={styles.input}
          />
        </View>
        <View style={styles.time}>
          <Image source={hourglass} style={styles.icons} />
          <TextInput
            placeholder="Time"
            keyboardType="number-pad"
            autoCapitalize="none"
            style={styles.input}
          />
        </View>
        <View style={{ marginBottom: smallScreen ? 10 : 0 }}>
          <Button background="GreenForms" text="Add" onPress={() => submit()} />
        </View>
      </View>
    </View>
  );
};

