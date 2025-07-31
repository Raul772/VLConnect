import { useVlcSettings } from '@/features/settings/hooks/useVLCSettings';
import { AppTheme } from '@/shared/theme';
import { useTheme } from '@/shared/theme/ThemeProvider';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { useEffect, useState } from 'react';
import { Pressable, StyleSheet, Text, TextInput, View } from 'react-native';

type RootStackParamList = {
  VlcSettings: undefined; // sem params
  Player: undefined; // sem params
  // outras rotas...
};
type NavigationProp = NativeStackNavigationProp<RootStackParamList>;

const SettingsScreen = () => {
  const { theme } = useTheme();
  const styles = createStyles(theme);

  const { settings, setSettings } = useVlcSettings();

  const [ip, setIpValue] = useState(settings.ip);
  const [password, setPasswordValue] = useState(settings.password);

  const navigation = useNavigation<NavigationProp>();

  useEffect(() => {
    setIpValue(settings.ip);
    setPasswordValue(settings.password);
  }, [settings.ip, settings.password]);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>VLConnect</Text>
      <View style={styles.infoContainer}>
        <Text style={styles.title}>Settings</Text>
        <Text style={styles.title}>This screen is under development.</Text>
        <TextInput
          style={styles.textInput}
          placeholder="IP Address"
          inputMode="text"
          value={ip}
          onChangeText={text => setIpValue(text)}
        />
        <TextInput
          style={styles.textInput}
          placeholder="Password"
          inputMode="text"
          value={password}
          onChangeText={text => setPasswordValue(text)}
        />
        <Text style={styles.title}>
          {settings
            ? `Current VLC Config: ${settings.ip}`
            : 'No VLC Config Loaded'}
        </Text>
        <Pressable
          style={styles.saveButton}
          onPress={() => {
            setSettings({ ip, password });
            navigation.navigate('Player');
          }}>
          <Text>Save</Text>
        </Pressable>
      </View>
    </View>
  );
};

export default SettingsScreen;

const createStyles = (theme: AppTheme) => {
  return StyleSheet.create({
    container: {
      display: 'flex',
      justifyContent: 'flex-start',
      alignItems: 'center',
      padding: 20,
      backgroundColor: theme.colors.background,
      height: '100%',
    },
    infoContainer: {
      width: '100%',
      flex: 1,
      gap: 10,
      justifyContent: 'center',
      alignItems: 'center',
    },
    title: {
      color: theme.colors.muted,
    },
    textInput: {
      width: '60%',
      padding: 10,
      borderRadius: 5,
      color: theme.colors.text,
      backgroundColor: theme.colors.surface,
    },
    saveButton: {
      fontWeight: 'bold',
      padding: 10,
      borderRadius: 5,
      backgroundColor: theme.colors.primary,
      alignItems: 'center',
      justifyContent: 'center',
      width: '60%',
    },
  });
};
