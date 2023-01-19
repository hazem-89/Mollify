/* Import all images */
import { ImageSourcePropType } from 'react-native';

/* Avatars */
import TigerAvatar from '../../assets/images/Avatars/Avatar-Tiger.png';

/* Rooms */
import loftBedsRoom from '../../assets/images/rooms/loftBedsRoom.jpg';
import teenFemininePurpleRoom from '../../assets/images/rooms/teenFemininePurpleRoom.jpg';
import plainNeutralRoom from '../../assets/images/rooms/plainNeutralRoom.jpg';
import pirateRoom from '../../assets/images/rooms/pirateRoom.jpg';

/* Room objects */
// Draggables
import dirtyLaundry from '../../assets/images/roomObjects/draggable/dirtyLaundry.png';
import garbage from '../../assets/images/roomObjects/draggable/garbage.png';
import dishes from '../../assets/images/roomObjects/draggable/dishes.png';
import wateringCan from '../../assets/images/roomObjects/draggable/wateringCan.png';
import broom from '../../assets/images/roomObjects/draggable/broom.png';
// Disposals
import washingMachine from '../../assets/images/roomObjects/disposal/washingMachine.png';
import garbageBin from '../../assets/images/roomObjects/disposal/garbageBin.png';
import dustpan from '../../assets/images/roomObjects/disposal/dustpan.png';
import plant from '../../assets/images/roomObjects/disposal/plant.png';
import washSponge from '../../assets/images/roomObjects/disposal/washSponge.png';

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

export interface roomInterface extends assetInterface {
  // necessary to calculate aspect ratio, number represents pixels.
  width: number;
  height: number;
}

export const rooms: roomInterface[] = [
  {
    id: 'pirateRoom',
    image: pirateRoom,
    width: 2398,
    height: 1024,
  },
  {
    id: 'plainNeutralRoom',
    image: plainNeutralRoom,
    width: 2276,
    height: 1024,
  },
  {
    id: 'loftBedsRoom',
    image: loftBedsRoom,
    width: 3124,
    height: 1034,
  },
  {
    id: 'teenFemininePurpleRoom',
    image: teenFemininePurpleRoom,
    width: 2304,
    height: 1024,
  },
];

export interface roomObjectsInterface {
  id: string;
  draggableImg: ImageSourcePropType | undefined;
  disposalImg: ImageSourcePropType | undefined;
}

export const roomObjects: roomObjectsInterface[] = [
  {
    id: 'garbage',
    draggableImg: garbage,
    disposalImg: garbageBin,
  },
  {
    id: 'laundry',
    draggableImg: dirtyLaundry,
    disposalImg: washingMachine,
  },
  {
    id: 'dishes',
    draggableImg: dishes,
    disposalImg: washSponge,
  },
  {
    id: 'watering',
    draggableImg: wateringCan,
    disposalImg: plant,
  },
  {
    id: 'vacuum',
    draggableImg: broom,
    disposalImg: dustpan,
  },
];
