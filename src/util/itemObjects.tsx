/* Import all images */
import { ImageSourcePropType } from 'react-native';

/* Avatars */
import TigerAvatar from '../../assets/Images/Avatars/Avatar-Tiger.png';

/* Rooms */
import loftBedsRoom from '../../assets/Images/rooms/loftBedsRoom.jpg';
import teenFemininePurpleRoom from '../../assets/Images/rooms/teenFemininePurpleRoom.jpg';
import plainNeutralRoom from '../../assets/Images/rooms/plainNeutralRoom.jpg';
import pirateRoom from '../../assets/Images/rooms/pirateRoom.jpg';

export interface assetInterface {
  id: string;
  image: ImageSourcePropType | undefined;
  description?: string;
}

/* In the db on the profile the room and the avatar id is saved. 
We get Id from the db then we need to sort through itemObjects to get the correct image */

/* Id does not need to be some random numbers since we wont have multiple avatars of the same kind */
export const avatars: assetInterface[] = [
  {
    id: 'Tiger',
    image: TigerAvatar,
  },
  {
    id: 'Lion',
    image: TigerAvatar,
  },
  {
    id: 'Gorilla',
    image: TigerAvatar,
  },
  {
    id: 'Panda',
    image: TigerAvatar,
  },
  {
    id: 'Elephant',
    image: TigerAvatar,
  },
  {
    id: 'Giraffe',
    image: TigerAvatar,
  },
  {
    id: 'Zebra',
    image: TigerAvatar,
  },
  {
    id: 'Hippopotamus',
    image: TigerAvatar,
  },
  {
    id: 'Leopard',
    image: TigerAvatar,
  },
  {
    id: 'Cheetah',
    image: TigerAvatar,
  },
];

export const rooms: assetInterface[] = [
  {
    id: 'pirateRoom',
    image: pirateRoom,
  },
  {
    id: 'plainNeutralRoom',
    image: plainNeutralRoom,
  },
  {
    id: 'loftBedsRoom',
    image: loftBedsRoom,
  },
  {
    id: 'teenFemininePurpleRoom',
    image: teenFemininePurpleRoom,
  },
];
