import React, { useEffect, useState } from 'react';
import { Dimensions, Image, StyleSheet, Text, View } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import Close from '../../../assets/images/Close.png';
import questionBtn from '../../../assets/images/questionBtn.png';
import Tiger from '../../../assets/images/tiger-min.png';
import { useDataContext } from '../../util/context/DataContext';
import ChatBubble from './ChatBubble';

type OnboardingProps = {
  guide:
  | 'roomScreenChild'
  | 'roomScreenParent'
  | 'taskScreenParent'
  | 'rewardScreenParent'
  | 'taskScreenChild'
  | 'rewardScreenChild';
};

export default function Onboarding({ guide }: OnboardingProps) {
  const ScreenHeight = Dimensions.get('window').height;
  const ScreenWidth = Dimensions.get('window').width;
  const [open, setOpen] = useState(false);
  const { onboardingComplete, setOnboardingComplete, setAsyncData } =
    useDataContext();

  useEffect(() => {
    console.log('onboarding state', onboardingComplete);
    console.log('guide', guide);
  }, [guide, onboardingComplete]);

  function handlePress() {
    console.log('press', onboardingComplete);
    const updatedOnboarding = onboardingComplete;
    // fix ts error
    // @ts-ignore
    updatedOnboarding[guide] = true;
    setOnboardingComplete(updatedOnboarding);
    setAsyncData('onboardingComplete', updatedOnboarding);
    setOpen(false);
  }

  function handleDisableAll() {
    // disable all guides by setting state to true indicating that they have been viewed.
    const updatedOnboarding = onboardingComplete;
    Object.keys(updatedOnboarding).forEach(key => {
      // fix ts error
      // @ts-ignore
      updatedOnboarding[key] = true;
    });
    setOnboardingComplete(updatedOnboarding);
    console.log('disabled guides');
  }

  function handleOpen() {
    console.log('open');
    const updatedOnboarding = { ...onboardingComplete };
    // fix ts error
    // @ts-ignore
    updatedOnboarding[guide] = false;
    setOnboardingComplete(updatedOnboarding);
    setOpen(true);
  }

  const styles = StyleSheet.create({
    guideBtnView: {
      position: 'absolute',
      width: 40,
      height: 40,
      right: 10,
      bottom: 10,
      zIndex: 10,
    },
    button: {
      width: 40,
      height: 40,
    },
    tiger: {
      width: '20%',
      height: '50%',
    },
    chatBubble: {
      padding: 10,
    },
    infoView: {
      width: ScreenWidth,
      height: ScreenHeight,
      display: 'flex',
      justifyContent: 'flex-end',
      alignItems: 'center',
    },
    background: {
      width: ScreenWidth,
      height: ScreenHeight,
      top: -ScreenHeight,
      position: 'absolute',
      zIndex: 100,
      backgroundColor: 'linear-gradient(to bottom right, rgba(0,0,0,0.7))',
    },
    disableAllView: {
      position: 'absolute',
      alignItems: 'flex-end',
      bottom: 10,
      left: 10,
      display: 'flex',
      flexDirection: 'row',
    },
    roomScreenChild: {
      display: 'flex',
      flexDirection: 'row',
      justifyContent: 'center',
      position: 'absolute',
      alignItems: 'center',
      width: ScreenWidth,
      height: ScreenHeight,
      gap: 100,
    },
    roomScreenParent: {},
    taskScreenParent: {},
    rewardScreenParent: {},
    taskScreenChild: {},
    rewardScreenChild: {},
  });

  /* Guides needed:
    1. Roomscreen, drag and drop explanation (Child)
    2. RoomScreen menu (Parent & child)
    3. Tasks: add, remove and approve (Parent)
    4. Rewards: add, remove and approve (Parent)
    5. Tasks: mark as done (Child)
    6. Rewards: Explain points etc.
  */
  return (
    <>
      {open ? (
        <TouchableOpacity
          onPress={() => handlePress()}
          activeOpacity={1}
          style={styles.background}
        >
          <View style={styles.infoView}>
            {guide === 'roomScreenChild' && (
              <View style={styles.roomScreenChild}>
                <ChatBubble orientation="left">
                  <Text>Welcome to your room!</Text>
                  <Text>Here you can navigate to your tasks and rewards.</Text>
                </ChatBubble>
                <ChatBubble orientation="right">
                  <Text>
                    You can also drag the tasks to the right in order to set the
                    task as done
                  </Text>
                </ChatBubble>
              </View>
            )}
            {guide === 'roomScreenParent' && (
              <View style={styles.roomScreenParent}>
                <ChatBubble orientation="right">
                  <Text>Welcome to your childs room!</Text>
                  <Text>
                    Here you can manage your child's tasks and rewards.
                  </Text>
                </ChatBubble>
              </View>
            )}
            {guide === 'taskScreenParent' && (
              <View style={styles.taskScreenParent}>
                <ChatBubble orientation="right">
                  <Text>This is the tasks screen</Text>
                  <Text>Here you can manage your child's tasks.</Text>
                </ChatBubble>
              </View>
            )}
            {guide === 'rewardScreenParent' && (
              <View style={styles.rewardScreenParent}>
                <ChatBubble orientation="right">
                  <Text>This is the rewards screen</Text>
                  <Text>Here you can manage your child's rewards.</Text>
                </ChatBubble>
              </View>
            )}
            {guide === 'taskScreenChild' && (
              <View style={styles.taskScreenChild}>
                <ChatBubble orientation="right">
                  <Text>This is the tasks screen</Text>
                  <Text>
                    Here you can view your active tasks and set them as done.
                  </Text>
                </ChatBubble>
              </View>
            )}
            {guide === 'rewardScreenChild' && (
              <View style={styles.rewardScreenChild}>
                <ChatBubble orientation="right">
                  <Text>This is the rewards screen</Text>
                  <Text>
                    Here you can view your active rewards and see how many close
                    you are to achieving them.
                  </Text>
                </ChatBubble>
              </View>
            )}
            <Image style={styles.tiger} resizeMode="contain" source={Tiger} />
          </View>
          <View style={styles.disableAllView}>
            <TouchableOpacity
              style={styles.button}
              onPress={() => handleDisableAll()}
            >
              <Image style={styles.button} source={Close} />
            </TouchableOpacity>
            <View>
              <Text>Disable all guides</Text>
            </View>
          </View>
        </TouchableOpacity>
      ) : (
        <View style={styles.guideBtnView}>
          <TouchableOpacity style={styles.button} onPress={() => handleOpen()}>
            <Image style={styles.button} source={questionBtn} />
          </TouchableOpacity>
        </View>
      )}
    </>
  );
}
