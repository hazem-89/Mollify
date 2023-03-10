import { useDimensions } from '@react-native-community/hooks';
import * as React from 'react';
import { useState } from 'react';
import { Text, View, StyleSheet, Image } from 'react-native';

import DropDownPicker from 'react-native-dropdown-picker';
type DropDownProps = {
  open: boolean;
  setOpen: () => void;
  value: null;
  setValue: React.Dispatch<React.SetStateAction<null>>;
  items: {}[];
  setItems?: React.Dispatch<
    React.SetStateAction<
      {
        label: string;
        value: string;
      }[]
    >
  >;
  placeholder?: string;
  style: {};
  source?: {};
  disabled?: boolean;
};
export default function DropDown({
  open,
  setOpen,
  value,
  setValue,
  items,
  setItems,
  placeholder,
  style,
  source,
  disabled,
}: DropDownProps) {
  const dimensions = useDimensions();
  const [smallScreen] = useState(dimensions.screen.height < 600 ? true : false);

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      flexDirection: 'row',
      alignItems: 'center',
    },
    paragraph: {
      margin: 5,
      fontWeight: 'bold',
      textAlign: 'center',
    },
    img: {
      width: smallScreen ? 25 : 40,
      height: smallScreen ? 40 : 70,
      marginRight: 10,
    },
  });
  return (
    <View style={styles.container}>
      <Image source={source} style={styles.img}></Image>
      <DropDownPicker
        open={open}
        value={value}
        items={items}
        setOpen={setOpen}
        setValue={setValue}
        setItems={setItems}
        onChangeValue={value => {
          // console.log(value);
        }}
        style={style}
        placeholder={placeholder}
        disabled={disabled}
        maxHeight={500}
        // autoScroll={true}
        disabledStyle={{
          opacity: 0.5,
        }}
        placeholderStyle={{
          // color: '#696969',
          fontSize: 8,
        }}
        textStyle={{
          fontSize: 8,
        }}
        // listMode="SCROLLVIEW"
        scrollViewProps={{
          decelerationRate: 'fast',
          nestedScrollEnabled: true,
        }}
        dropDownDirection="AUTO"
        bottomOffset={1}
        dropDownContainerStyle={{
          borderColor: '#0F6209',
          width: smallScreen ? 80 : 100,
          borderRadius: 10,
          padding: 0,
          margin: 0,
          maxHeight: 150,
          overflow: 'scroll',
        }}
        // modalProps={{
        //   animationType: 'fade',
        // }}
        listMode="SCROLLVIEW"
      />
    </View>
  );
}
