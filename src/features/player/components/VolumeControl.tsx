import { usePlayerStore } from '../store/playerStore';
import { View, Text } from 'react-native';

export const VolumeControl = () => {
  const { volume } = usePlayerStore();

  // const handleChange = async (value: number) => {
  //   setVolume(value);
  //   await service.setVolume(value);
  // };

  return (
    <View>
      <Text>Volume: {volume}</Text>
      {/* <Slider
        value={volume}
        onValueChange={handleChange}
        minimumValue={0}
        maximumValue={512}
        step={1}
      /> */}
    </View>
  );
};
