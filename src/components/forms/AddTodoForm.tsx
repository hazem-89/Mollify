import { Alert, StyleSheet, TouchableOpacity, View, Image } from 'react-native';
import React, { Dispatch, SetStateAction, useState } from 'react';
import { useDimensions } from '@react-native-community/hooks';
import { TodoMenuHeader } from '../modals/TodoMenuSign';
import { TextInput } from '../CustomInput';
import colors from '../../constants/colors';
import Button from '../buttons/Buttons';
import DropDown from '../DropDown';
import laundryBasket from '../../../assets/Images/Icons/basket.png';
import uuid from 'react-native-uuid';
import { Text } from '../../components/Text';
import { doc, updateDoc, arrayUnion } from 'firebase/firestore';
import { db } from '../../../firebaseConfig';
import hourglass from '../../../assets/Images/Icons/hourglass.png';
import PointsIcon from '../../../assets/Images/Icons/PointsIcon.png';
const CleaningTodo = [
  {
    title: 'Dirty clothes',
    description: 'Put the dirty clothes in the laundry basket',
    img: laundryBasket,
    selected: false,
  },
  {
    title: 'Dirty Dishes',
    description: 'Take the dishes to the kitchen',
    img: laundryBasket,
    selected: false,
  },
  {
    title: 'Garbage',
    description: 'Put the dirty clothes in the laundry basket',
    img: laundryBasket,
    selected: false,
  },
  {
    title: 'Watering Plants',
    description: 'Not too much not too little water',
    img: laundryBasket,
    selected: false,
  },
];
type ErrorType = {
  taskTitle?: string;
  taskDescription?: string;
  points?: string;
  time?: string;
};
type todoFormProps = {
  category: string;
};
export const AddTodoForm = ({ category }: todoFormProps) => {
  const [errors, setErrors]: [ErrorType, Dispatch<SetStateAction<{}>>] =
    React.useState({});
  const [timeDropDownOpen, setTimeDropDownOpen] = useState(false);
  const [pointsDropDownOpen, setPointsDropDownOpen] = useState(false);
  const [timeValue, setTimeValue] = useState(null);
  const dimensions = useDimensions();
  const [state, setState] = useState({
    taskTitle: '',
    taskDescription: '',
    selected: '',
  });
  uuid.v4(); // ⇨ '11edc52b-2918-4d71-9058-f7285e29d894'

  const [smallScreen] = useState(dimensions.screen.height < 600 ? true : false);
  const styles = StyleSheet.create({
    container: {
      flex: 1,
      minHeight: smallScreen ? 380 : 530,
      minWidth: smallScreen ? 550 : 750,
      padding: smallScreen ? 40 : 50,
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
    inputContainer: {
      alignItems: 'center',
      marginTop: 40,
    },
    DorpDonContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center',
      marginVertical: 20,
      marginLeft: 50,
    },
    DropDown: {
      backgroundColor: 'transparent',
      minHeight: 30,
      width: smallScreen ? 80 : 100,
    },
    DropDownView: {
      width: smallScreen ? 150 : 200,
    },
    AvatarContainer: {
      width: smallScreen ? 50 : 100,
      height: smallScreen ? 50 : 100,
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: '#FF7A00',
      borderRadius: 500,
      marginLeft: smallScreen ? 5 : 5,
    },
    AvatarContainerSelected: {
      width: smallScreen ? 50 : 100,
      height: smallScreen ? 50 : 100,
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: 'green',
      borderRadius: 500,
      marginLeft: smallScreen ? 5 : 5,
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
  const profileId = 'Lgq9YJnPLLezb1iE4xHQ';
  const addCleaningTask = async () => {
    const currDocRef = doc(db, 'profiles', profileId);
    const newTodo = {
      id: uuid.v4(),
      taskTitle: state.taskTitle,
      taskDescription: state.taskDescription,
      pointsValue,
      timeValue,
      category: category,
    };
    await updateDoc(currDocRef, { todo: arrayUnion(newTodo) });
  };

  const submit = () => {
    const nextErrors: ErrorType = {};
    if (!state.taskTitle) {
      nextErrors.taskTitle = 'This field is required.';
    }
    if (!state.taskDescription) {
      nextErrors.taskDescription = 'This field is required.';
    }
    !pointsValue ? (nextErrors.points = 'you need to set points') : '';
    !timeValue ? (nextErrors.time = 'you need to set Time') : '';
    setErrors(nextErrors);
    console.log(nextErrors);

    if (Object.keys(nextErrors).length === 0) {
      console.log('no err');
      addCleaningTask();
      Alert.alert(
        'Success!',
        `Title: ${state.taskTitle} \n Description: ${state.taskDescription}`,
      );
    }
    if (Object.keys(nextErrors).length > 0) {
      return null;
    }

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
        <TodoMenuHeader text={category} />
      </View>
      {category === 'Add Cleaning Task' && (
        <>
          <View
            style={{
              flexDirection: 'row',
              width: smallScreen ? 500 : 700,
              alignItems: 'center',
              justifyContent: 'center',
              marginTop: 80,
            }}
          >
            {CleaningTodo?.map(todo => {
              return (
                <TouchableOpacity
                  key={todo.title}
                  onPress={() => {
                    state.taskDescription &&
                    state.taskDescription === todo.description &&
                    state.taskTitle &&
                    state.taskTitle === todo.title &&
                    state.selected === todo.title
                      ? setState({
                          ...state,
                          taskDescription: '',
                          selected: '',
                          taskTitle: '',
                        })
                      : setState({
                          ...state,
                          taskDescription: todo.description,
                          selected: todo.title,
                          taskTitle: todo.title,
                        });

                    console.log(state.taskTitle);
                  }}
                >
                  <View
                    style={
                      todo.title !== state.selected
                        ? styles.AvatarContainer
                        : styles.AvatarContainerSelected
                    }
                  >
                    <Image
                      source={todo.img}
                      style={{
                        width: smallScreen ? 50 : 50,
                        resizeMode: 'stretch',
                      }}
                    />
                  </View>
                </TouchableOpacity>
              );
            })}
          </View>
          <View style={{ alignItems: 'center' }}>
            {state.taskTitle && (
              <View
                style={{
                  marginVertical: 10,
                  alignItems: 'flex-start', // marginLeft: 55,
                  width: smallScreen ? 250 : 350,
                }}
              >
                <Text type="text">{state.taskTitle}</Text>
              </View>
            )}
            {state.taskDescription && (
              <View
                style={{
                  marginBottom: 10,
                  alignItems: 'flex-start',
                  width: smallScreen ? 250 : 350,
                }}
              >
                <Text type="todoList">Description:</Text>
                <Text type="todoList">{state.taskDescription}</Text>
              </View>
            )}
          </View>
        </>
      )}
      {category !== 'Add Cleaning Task' && (
        <View style={styles.inputContainer}>
          <TextInput
            placeholder="Task title:"
            value={state.taskTitle}
            onChangeText={(text: string) =>
              setState({ ...state, taskTitle: text })
            }
            errorText={errors.taskTitle}
            keyboardType="default"
            autoCapitalize="none"
            impStyle={styles.input}
          />
          <TextInput
            placeholder="Task description:"
            value={state.taskDescription}
            onChangeText={(text: string) =>
              setState({ ...state, taskDescription: text })
            }
            errorText={errors.taskDescription}
            keyboardType="default"
            autoCapitalize="none"
            multiline={true}
            impStyle={styles.input}
          />
        </View>
      )}

      <View style={styles.DorpDonContainer}>
        <View style={styles.DropDownView}>
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
            disabled={!state.taskTitle && !state.taskDescription ? true : false}
          />
          <Text type="errorText">{errors.time}</Text>
        </View>

        <View style={styles.DropDownView}>
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
            disabled={!state.taskTitle && !state.taskDescription ? true : false}
          />
          <Text type="errorText">{errors.points}</Text>
        </View>
      </View>
      <View style={{ marginBottom: smallScreen ? 10 : 0 }}>
        <Button background="GreenForms" text="Add" onPress={() => submit()} />
      </View>
    </View>
  );
};
