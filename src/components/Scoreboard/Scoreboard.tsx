import { StyleSheet, View, Image } from 'react-native';
import React, { useCallback, useState } from 'react';
import { useDimensions } from '@react-native-community/hooks';
import Button from '../../components/buttons/Buttons';
import { Text } from '../../components/Text';
import goldenBackground from '../../../assets/Images/goldenBadge.png';
import greenBadge from '../../../assets/Images/greenBadge.png';

const testList = [
  {
    title: 'Liseberg',
    points: '100',
    total: 'Total',
  },
];

const Scoreboard = () => {
  const [open, setOpen] = useState(false);
  const dimensions = useDimensions();
  const [btnClicked, setBtnClicked] = useState<string | undefined>();
  const handleEmit = useCallback((value: undefined) => {
    setBtnClicked(value); // This function will be called by the child component to emit a prop
  }, []);
  const [smallScreen] = useState(dimensions.screen.height < 600 ? true : false);

  const styles = StyleSheet.create({
    Background: {
      width: smallScreen ? 400 : 700,
      height: smallScreen ? 300 : 700,
      display: 'flex',
      justifyContent: 'center',
      marginLeft: 'auto',
      marginRight: 'auto',
      marginTop: 50,
    },
    goldenAlign: {
      display: 'flex',
      justifyContent: 'center',
      marginLeft: 'auto',
      marginRight: 'auto',
    },
    buttonAlign: {
      position: 'absolute',
      top: 200,
      left: 200,
    },
    reverseArrowStyle: {
      display: open ? 'flex' : 'none',
      position: 'absolute',
      bottom: smallScreen ? 160 : 160,
      left: 0,
      right: 0,
      justifyContent: 'center',
      alignItems: 'center',
    },
    arrowStyle: {
      display: open ? 'none' : 'flex',
      position: 'absolute',
      top: 40,
      left: 0,
      right: 0,
      bottom: 0,
      justifyContent: 'center',
      alignItems: 'center',
    },
    textStyle: {
      marginTop: open ? -100 : -300,
    },
    goldenStyle: {
      position: 'relative',
      height: open ? 220 : 100,
      ...(smallScreen &&
        open && {
          height: 200,
        }),
      maxHeight: smallScreen ? 200 : 320,
      width: smallScreen ? 350 : 500,
      padding: 16,
      display: 'flex',
      justifyContent: 'center',
      marginLeft: 'auto',
      marginRight: 'auto',
      resizeMode: 'stretch',
    },
    container: {
      position: 'relative',
    },
    badgeContainer: {
      display: open ? 'flex' : 'none',
      marginTop: 20,
      margin: 10,
    },
    labelStyle: {
      position: 'relative',
      top: open ? -190 : -80,
      left: 0,
      right: 0,
      bottom: 0,
      justifyContent: 'center',
      alignItems: 'center',
    },
    totalStyle: {
      position: 'absolute',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      justifyContent: 'center',
      alignItems: 'center',
    },
  });
  return (
    <View style={styles.Background}>
      <View style={styles.textStyle}>
        <Text type="header">Scoreboard</Text>
      </View>
      <View>
        <View style={styles.container}>
          <Image source={goldenBackground} style={styles.goldenStyle} />
          <View style={styles.arrowStyle}>
            <Button background="ArrowButton" onPress={() => setOpen(true)} />
          </View>
        </View>
        <View style={styles.reverseArrowStyle}>
          <Button
            background="ReverseArrowButton"
            onPress={() => setOpen(false)}
          />
        </View>
        {testList?.map(test => (
          <View style={styles.labelStyle}>
            <Text type="todoList">{test.title}</Text>
            <View style={{ display: 'flex', flexDirection: 'row' }}>
              <View style={styles.badgeContainer}>
                <Image source={greenBadge} />
                <View style={styles.totalStyle}>
                  <Text>{test.total}</Text>
                  <Text>{test.points}</Text>
                </View>
              </View>
              <View style={styles.badgeContainer}>
                <Image source={greenBadge} />
                <View style={styles.totalStyle}>
                  <Text>{test.total}</Text>
                  <Text>{test.points}</Text>
                </View>
              </View>
              <View style={styles.badgeContainer}>
                <Image source={greenBadge} />
                <View style={styles.totalStyle}>
                  <Text>{test.total}</Text>
                  <Text>{test.points}</Text>
                </View>
              </View>
            </View>
          </View>
        ))}
      </View>
    </View>
  );
};

export default Scoreboard;

const styles = StyleSheet.create({});

