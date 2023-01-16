import { useDimensions } from '@react-native-community/hooks';
import React, { ReactElement, useEffect, useState } from 'react';
import { StyleSheet, View, Image } from 'react-native';
import { useDataContext } from '../../util/context/DataContext';
import { Text } from '../../components/Text';

// images
import TrophyBig from '../../../assets/images/TrophyBig.png';
const Scoreboard = () => {
  const dimensions = useDimensions();
  const [smallScreen] = useState(dimensions.screen.height < 600);

  const { retrieveFSData, rewards, setRewards } = useDataContext();
  useEffect(() => {
    // Retrieve tasks, replace Lgq9YJnPLLezb1iE4xHQ with current profile id
    retrieveFSData('Rewards', 'asignedProfileId', 'pjVcsYpBE46nGlDmHmO0').then(
      (data: any) => {
        if (data) setRewards(data);
      },
    );
  }, []);

  // function handleClick(state: string | undefined) {
  //   setAddScoreBtnClicked(state);
  //   switch (state) {
  //     case 'displayScoreboardForm':
  //       setComponent(<ScoreboardForm />);
  //       break;
  //     default:
  //       setComponent(undefined);
  //   }
  // }

  const styles = StyleSheet.create({
    Background: {
      position: 'absolute',
      // width: smallScreen ? 400 : 700,
      // height: smallScreen ? 300 : 700,
      // display: 'flex',
      // justifyContent: 'center',
      // marginLeft: 'auto',
      // marginRight: 'auto',
      // marginTop: 50,
    },
    TitleView: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      minWidth: smallScreen ? 250 : 300,
      marginTop: smallScreen ? 10 : 20,
    },
    TrophyBigStyleLeft: {
      transform: [{ rotate: '30deg' }],
      height: smallScreen ? 100 : 150,
      width: smallScreen ? 80 : 160,
    },
    TrophyBigStyleRight: {
      transform: [{ rotate: '-30deg' }],
      height: smallScreen ? 100 : 150,
      width: smallScreen ? 80 : 160,
    },
  });
  return (
    <View style={styles.Background}>
      {/* Position absolute Views  */}
      <View>
        <View></View>
      </View>
      {/*  rewards sid buttons section */}
      <>
        <View></View>
      </>
      {/* Display rewards section */}
      <>
        {/* Screen Title View */}
        <View style={styles.TitleView}>
          <Image source={TrophyBig} style={styles.TrophyBigStyleLeft} />
          <Text type="header">Rewards</Text>
          <Image source={TrophyBig} style={styles.TrophyBigStyleRight} />
        </View>
      </>
    </View>
  );
};

export default Scoreboard;
