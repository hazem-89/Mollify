import React, { useEffect, useState } from 'react';
import {
  Dimensions,
  Image,
  SafeAreaView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import {
  TouchableOpacity,
  TouchableWithoutFeedback,
} from 'react-native-gesture-handler';
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
  const {
    onboardingComplete,
    setOnboardingComplete,
    setAsyncData,
    selectedChild,
  } = useDataContext();

  function handlePress() {
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
  }

  function handleOpen() {
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
    infoView: {
      width: ScreenWidth,
      height: ScreenHeight,
      display: 'flex',
      justifyContent: 'flex-end',
      alignItems: 'center',
    },
    tiger: {
      width: '20%',
      height: '50%',
      alignSelf: 'flex-end',
    },
    background: {
      position: 'absolute',
      width: ScreenWidth,
      height: ScreenHeight,
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
    oneChatBubble: {
      display: 'flex',
      flexDirection: 'row',
      justifyContent: 'center',
      position: 'absolute',
      alignItems: 'center',
      width: ScreenWidth,
      height: ScreenHeight,
    },
    twoChatBubbles: {
      display: 'flex',
      flexDirection: 'row',
      justifyContent: 'center',
      position: 'absolute',
      alignItems: 'center',
      width: ScreenWidth,
      height: ScreenHeight,
    },
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
        <View style={styles.background}>
          <TouchableWithoutFeedback
            onPress={() => handlePress()}
            style={styles.infoView}
          >
            {guide === 'roomScreenChild' && (
              <View style={styles.twoChatBubbles}>
                <ChatBubble orientation="left">
                  <Text>Welcome to your room!</Text>
                  <Text>Here you can navigate to your tasks and rewards.</Text>
                </ChatBubble>
                <Image
                  style={styles.tiger}
                  resizeMode="contain"
                  source={Tiger}
                />
                <ChatBubble orientation="right">
                  <Text>
                    You can also drag the tasks to the right in order to set the
                    task as done.
                  </Text>
                </ChatBubble>
              </View>
            )}
            {guide === 'roomScreenParent' && (
              <View style={styles.oneChatBubble}>
                <Image
                  style={styles.tiger}
                  resizeMode="contain"
                  source={Tiger}
                />
                <ChatBubble orientation="right">
                  <Text>Welcome to {selectedChild.name}'s room!</Text>
                  <Text>{`Here you can manage ${selectedChild.name}'s tasks and rewards.`}</Text>
                </ChatBubble>
              </View>
            )}
            {guide === 'taskScreenParent' && (
              <View style={styles.oneChatBubble}>
                <Image
                  style={styles.tiger}
                  resizeMode="contain"
                  source={Tiger}
                />
                <ChatBubble orientation="right">
                  <Text>This is the tasks screen.</Text>
                  <Text>{`Here you can manage ${selectedChild.name}'s tasks.`}</Text>
                </ChatBubble>
              </View>
            )}
            {guide === 'rewardScreenParent' && (
              <View style={styles.oneChatBubble}>
                <Image
                  style={styles.tiger}
                  resizeMode="contain"
                  source={Tiger}
                />
                <ChatBubble orientation="right">
                  <Text>This is the rewards screen.</Text>
                  <Text>{`Here you can manage your ${selectedChild.name}'s rewards.`}</Text>
                </ChatBubble>
              </View>
            )}
            {guide === 'taskScreenChild' && (
              <View style={styles.oneChatBubble}>
                <Image
                  style={styles.tiger}
                  resizeMode="contain"
                  source={Tiger}
                />
                <ChatBubble orientation="right">
                  <Text>This is the tasks screen.</Text>
                  <Text>
                    Here you can view your active tasks and mark them as done.
                  </Text>
                </ChatBubble>
              </View>
            )}
            {guide === 'rewardScreenChild' && (
              <View style={styles.oneChatBubble}>
                <Image
                  style={styles.tiger}
                  resizeMode="contain"
                  source={Tiger}
                />
                <ChatBubble orientation="right">
                  <Text>This is the rewards screen.</Text>
                  <Text>
                    Here you can view your active rewards and see how close you
                    are to achieving them.
                  </Text>
                </ChatBubble>
              </View>
            )}
          </TouchableWithoutFeedback>
          <SafeAreaView style={styles.disableAllView}>
            <TouchableOpacity
              style={styles.button}
              onPress={() => handleDisableAll()}
            >
              <Image style={styles.button} source={Close} />
            </TouchableOpacity>
            <View>
              <Text>Disable all guides</Text>
            </View>
          </SafeAreaView>
        </View>
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
