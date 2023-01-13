import { StyleSheet, View, Image } from 'react-native';
import React, { ReactElement, useCallback, useState } from 'react';
import { useDimensions } from '@react-native-community/hooks';
import Button from '../buttons/Buttons';
import { Text } from '../Text';
import { ScoreboardForm } from '../forms/ScoreboardForm';
import FormModal from '../modals/FormModal';
import goldenBackground from '../../../assets/Images/goldenBadge.png';
import greenBadge from '../../../assets/Images/greenBadge.png';
import { useTasks } from '../../util/context/AddtoDBContext';

const Scoreboard = () => {
  const [open, setOpen] = useState(false);
  const [component, setComponent] = useState<ReactElement | undefined>();
  const dimensions = useDimensions();
  const [smallScreen] = useState(dimensions.screen.height < 600 ? true : false);
  const [btnClicked, setAddScoreBtnClicked] = useState<string | undefined>();
  const { getRewards, profileRewards } = useTasks();

  function handleClick(state: string | undefined) {
    setAddScoreBtnClicked(state);
    switch (state) {
      case 'displayScoreboardForm':
        setComponent(<ScoreboardForm />);
        break;
      default:
        setComponent(undefined);
    }
  }

  const testList = [
    {
      title: 'Liseberg',
      points: '100',
      total: 'Total',
    },
  ];

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
      marginTop: open ? -200 : -200,
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

        <View
          style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          <Button
            background="AddButtonImage"
            onPress={() => {
              handleClick('displayScoreboardForm');
            }}
          />
        </View>
        <View style={{ marginBottom: 900 }}>
          <FormModal
            component={component}
            onEmit={() => handleClick(undefined)}
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

