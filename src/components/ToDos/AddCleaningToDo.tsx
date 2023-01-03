import {
  ImageBackground,
  StyleSheet,
  TouchableOpacity,
  View,
  Image,
} from 'react-native';
import React, { useCallback, useState } from 'react';
import { TodoMenuHeader } from '../modals/TodoMenuSign';
import { useDimensions } from '@react-native-community/hooks';
import DropDown from '../modals/DropDown';
import hourglass from '../../../assets/Images/Icons/hourglass.png';
import PointsIcon from '../../../assets/Images/Icons/PointsIcon.png';
import laundryBasket from '../../../assets/Images/Icons/basket.png';
import { Text } from '../../components/Text';
import Button from '../buttons/Buttons';
import uuid from 'react-native-uuid';

import {
  doc,
  setDoc,
  updateDoc,
  getDocs,
  getDoc,
  collection,
  addDoc,
  arrayUnion,
} from 'firebase/firestore';

import { db } from '../../../firebaseConfig';

const CleaningTodo = [
  {
    title: 'Dirty clothes',
    description: 'Put the dirty clothes in the laundry basket',
    important: false,
    img: laundryBasket,
    selected: false,
  },
  {
    title: 'Dirty Dishes',
    description: 'Take the dishes to the kitchen',
    important: false,
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
export const AddCleaningToDo = () => {
  const [timeDropDownOpen, setTimeDropDownOpen] = useState(false);
  const [pointsDropDownOpen, setPointsDropDownOpen] = useState(false);
  const [todoTitle, setTodoTitle] = useState('');
  const [todoDescription, setTodoDescription] = useState('');
  const [timeValue, setTimeValue] = useState(null);
  const [pointsValue, setPointsValue] = useState(null);
  const [selected, setSelected] = useState('');

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
  const [points, setPoints] = useState([
    { label: '5 Points', value: '5' },
    { label: '10 Points', value: '10' },
    { label: '20 Points', value: '20' },
    { label: '30 Points', value: '30' },
    { label: '40 Points', value: '40' },
    { label: '50 Points', value: '50' },
  ]);
  uuid.v4(); // ⇨ '11edc52b-2918-4d71-9058-f7285e29d894'

  const profileId = 'Lgq9YJnPLLezb1iE4xHQ';
  const addCleaningTask = async () => {
    const currDocRef = doc(db, 'profiles', profileId);
    const newTodo = {
      id: uuid.v4(),
      todoTitle,
      todoDescription,
      pointsValue,
      timeValue,
      category: 'cleaning',
    };
    await updateDoc(currDocRef, { todo: arrayUnion(newTodo) });
    console.log('updated');
  };

  const dimensions = useDimensions();
  const [smallScreen] = useState(dimensions.screen.height < 600 ? true : false);

  const styles = StyleSheet.create({
    main: {
      flex: 1,
      minHeight: smallScreen ? 380 : 530,
      minWidth: smallScreen ? 550 : 750,
      padding: smallScreen ? 20 : 50,
    },
    container: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
      marginTop: smallScreen ? 60 : 70,
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
    DorpDonContainer: {
      flex: 1,
      flexDirection: 'row',
      width: smallScreen ? 300 : 350,
      alignItems: 'center',
      marginLeft: 30,
      maxHeight: 100,
    },
    DropDown: {
      backgroundColor: 'transparent',
      // minHeight: 30,
      width: smallScreen ? 80 : 100,
      maxHeight: 100,
    },
  });
  return (
    <View style={styles.main}>
      <View
        style={{
          position: 'absolute',
          top: smallScreen ? -15 : -25,
          alignSelf: 'center',
        }}
      >
        <TodoMenuHeader text="Add cleaning task" />
      </View>
      <View style={styles.container}>
        <View style={{ marginVertical: 10, alignSelf: 'center' }}>
          <Text type="header">choose a task to add</Text>
        </View>
        <View
          style={{
            flexDirection: 'row',
            width: smallScreen ? 500 : 700,
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          {CleaningTodo?.map(todo => (
            <TouchableOpacity
              key={todo.title}
              onPress={event => {
                todoTitle && todoTitle === todo.title
                  ? setTodoTitle('')
                  : setTodoTitle(todo.title);
                todoDescription && todoDescription === todo.description
                  ? setTodoDescription('')
                  : setTodoDescription(todo.description);
                selected === todo.title
                  ? setSelected('')
                  : setSelected(todo.title);
              }}
            >
              <View
                style={
                  todo.title !== selected
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
          ))}
        </View>
        {todoTitle && (
          <View
            style={{
              marginVertical: 10,
              alignItems: 'flex-start', // marginLeft: 55,
              width: smallScreen ? 250 : 350,
            }}
          >
            <Text type="text">{todoTitle}</Text>
          </View>
        )}
        {todoDescription && (
          <View
            style={{
              marginBottom: 10,
              alignItems: 'flex-start',
              width: smallScreen ? 250 : 350,
            }}
          >
            <Text type="todoList">Description:</Text>
            <Text type="todoList">{todoDescription}</Text>
          </View>
        )}
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
            disabled={!todoTitle && !todoDescription ? true : false}
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
            disabled={!todoTitle && !todoDescription ? true : false}
          />
        </View>
        <View style={{ marginBottom: smallScreen ? 10 : 0 }}>
          <Button
            background="GreenForms"
            text="Add"
            onPress={() => addCleaningTask()}
          />
        </View>
      </View>
    </View>
  );
};
