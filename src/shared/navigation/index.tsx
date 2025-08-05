import PlayerScreen from '@/features/player/screens/PlayerScreen';
import SettingsScreen from '@/features/settings/screens/SettingsScreen';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { useTheme } from '../theme/ThemeProvider';

const Stack = createNativeStackNavigator();

export const RootNavigation = () => {
  const { theme } = useTheme();

  return (
    <Stack.Navigator
      initialRouteName="Settings"
      screenOptions={{
        headerShown: true,
        headerStyle: { backgroundColor: theme.colors.surface },
        headerTintColor: theme.colors.text,
        
      }}>
      <Stack.Screen name="Settings" component={SettingsScreen} />
      <Stack.Screen name="Player" component={PlayerScreen} />
    </Stack.Navigator>
  );
};
