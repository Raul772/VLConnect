import PlayerScreen from '@/features/player/screens/PlayerScreen';
import SettingsScreen from '@/features/settings/screens/SettingsScreen';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
// import {useTheme} from '../theme/ThemeProvider';

const Stack = createNativeStackNavigator();

export const RootNavigation = () => {
  // const {theme} = useTheme();

  return (
    <Stack.Navigator initialRouteName="Settings">
      <Stack.Screen name="Settings" component={SettingsScreen} />
      <Stack.Screen name="Player" component={PlayerScreen} />
    </Stack.Navigator>
  );
};
