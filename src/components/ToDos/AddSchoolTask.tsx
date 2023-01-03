import { Alert, StyleSheet, Text, View } from 'react-native';
import React, { Dispatch, SetStateAction, useState } from 'react';
import { useDimensions } from '@react-native-community/hooks';
import { TodoMenuHeader } from '../modals/TodoMenuSign';
import { TextInput } from '../CustomInput';
import colors from '../../constants/colors';
import Button from '../buttons/Buttons';
import DropDown from '../modals/DropDown';
type ErrorType = {
  taskTitle?: string;
  taskDescription?: string;
  points?: string;
  time?: string;
};
import hourglass from '../../../assets/Images/Icons/hourglass.png';
import PointsIcon from '../../../assets/Images/Icons/PointsIcon.png';

export const AddSchoolTask = () => {
  const [taskTitle, setTaskTitle] = useState<string>();
  const [taskDescription, setTaskDescription] = useState<string>();
  const [errors, setErrors]: [ErrorType, Dispatch<SetStateAction<{}>>] =
    React.useState({});
  const [timeDropDownOpen, setTimeDropDownOpen] = useState(false);
  const [pointsDropDownOpen, setPointsDropDownOpen] = useState(false);
  const [timeValue, setTimeValue] = useState(null);
  const [selected, setSelected] = useState('');
  const dimensions = useDimensions();
  const [smallScreen] = useState(dimensions.screen.height < 600 ? true : false);
  const styles = StyleSheet.create({
    container: {
      flex: 1,
      minHeight: smallScreen ? 380 : 530,
      minWidth: smallScreen ? 550 : 750,
      padding: smallScreen ? 20 : 50,
    },
    input: {
      justifyContent: 'center',
      maxHeight: 40,
      marginTop: smallScreen ? 20 : 30,
      borderBottomColor: colors.primary,
      borderBottomWidth: 1,
      width: smallScreen ? 250 : 350,
      alignItems: 'flex-start',
    },
    DorpDonContainer: {
      flex: 1,
      flexDirection: 'row',
      width: smallScreen ? 300 : 350,
      alignItems: 'center',
      marginLeft: 30,
      marginVertical: 30,
    },
    DropDown: {
      backgroundColor: 'transparent',
      minHeight: 30,
      width: smallScreen ? 80 : 100,
    },
  });
  const [time, setTime] = useState([
    { label: '2 Hours', value: '2' },
    { label: '4 Hours', value: '4' },
    { label: '6 Hours', value: '6' },
    { label: '8 Hours', value: '8' },
    { label: '12 Hours', value: '12' },
    { label: '1 day', value: '1' },
    { label: '2 days', value: '2D' },
    { label: '3 days', value: '3D' },
  ]);
  const [pointsValue, setPointsValue] = useState(null);
  const [points, setPoints] = useState([
    { label: '5 Points', value: '5' },
    { label: '10 Points', value: '10' },
    { label: '20 Points', value: '20' },
    { label: '30 Points', value: '30' },
    { label: '40 Points', value: '40' },
    { label: '50 Points', value: '50' },
  ]);

  const submit = () => {
    const nextErrors: ErrorType = {};
    if (!taskTitle) {
      nextErrors.taskTitle = 'This field is required.';
    }
    if (!taskDescription) {
      nextErrors.taskDescription = 'This field is required.';
    }

    setErrors(nextErrors);
    if (Object.keys(nextErrors).length > 0) {
      return null;
    }

    Alert.alert(
      'Success!',
      `Title: ${taskTitle} \n Description: ${taskDescription}`,
    );
    return null;
  };
  return (
    <View style={styles.container}>
      <View
        style={{
          position: 'absolute',
          top: smallScreen ? -15 : -25,
          alignSelf: 'center',
        }}
      >
        <TodoMenuHeader text="Add School Assignment" />
      </View>
      <View
        style={{
          alignItems: 'center',
          justifyContent: 'center',
          marginTop: 60,
        }}
      >
        <View>
          <TextInput
            placeholder="Task title:"
            value={taskTitle}
            onChangeText={(text: string) => setTaskTitle(text)}
            errorText={errors.taskTitle}
            keyboardType="default"
            autoCapitalize="none"
            impStyle={styles.input}
          />
          <TextInput
            placeholder="Task description:"
            value={taskDescription}
            onChangeText={(text: string) => setTaskDescription(text)}
            errorText={errors.taskDescription}
            keyboardType="default"
            autoCapitalize="none"
            multiline={true}
            impStyle={styles.input}
          />
        </View>
        <View style={styles.DorpDonContainer}>
          <DropDown
            open={timeDropDownOpen}
            setOpen={() =>
              timeDropDownOpen
                ? setTimeDropDownOpen(false)
                : setTimeDropDownOpen(true)
            }
            value={timeValue}
            setValue={setTimeValue}
            items={time}
            setItems={setTime}
            placeholder="Time"
            style={styles.DropDown}
            source={hourglass}
            disabled={!taskTitle && !taskDescription ? true : false}
          />
          <DropDown
            open={pointsDropDownOpen}
            setOpen={() =>
              pointsDropDownOpen
                ? setPointsDropDownOpen(false)
                : setPointsDropDownOpen(true)
            }
            value={pointsValue}
            setValue={setPointsValue}
            items={points}
            setItems={setPoints}
            placeholder="Points"
            style={styles.DropDown}
            source={PointsIcon}
            disabled={!taskTitle && !taskDescription ? true : false}
          />
        </View>
        <View style={{ marginBottom: smallScreen ? 10 : 0 }}>
          <Button background="GreenForms" text="Add" onPress={() => submit()} />
        </View>
      </View>
    </View>
  );
};
