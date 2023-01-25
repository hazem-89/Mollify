/* Import all images */
import { ImageSourcePropType } from 'react-native';

/* Avatars */
import TigerAvatar from '../../assets/images/Avatars/Avatar-Tiger.png';
import DogAvatar from '../../assets/images/Avatars/dog.png';
import CatAvatar from '../../assets/images/Avatars/cat.png';
import FoxAvatar from '../../assets/images/Avatars/fox.png';
import SharkAvatar from '../../assets/images/Avatars/shark.png';
import BoyAvatar from '../../assets/images/Avatars/boy.png';
import GirlAvatar from '../../assets/images/Avatars/girl.png';
import RobotAvatar from '../../assets/images/Avatars/robot.png';
import FossilAvatar from '../../assets/images/Avatars/fossil.png';
import TrexAvatar from '../../assets/images/Avatars/trex.png';

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
  image: ImageSourcePropType;
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
    id: 'Dog',
    image: DogAvatar,
  },
  {
    id: 'Cat',
    image: CatAvatar,
  },
  {
    id: 'Fox',
    image: FoxAvatar,
  },
  {
    id: 'Shark',
    image: SharkAvatar,
  },
  {
    id: 'Boy',
    image: BoyAvatar,
  },
  {
    id: 'Girl',
    image: GirlAvatar,
  },
  {
    id: 'Robot',
    image: RobotAvatar,
  },
  {
    id: 'Fossil',
    image: FossilAvatar,
  },
  {
    id: 'Trex',
    image: TrexAvatar,
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
  draggableImg: ImageSourcePropType;
  disposalImg: ImageSourcePropType;
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

