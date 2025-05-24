import {Pressable, StyleSheet, Text} from 'react-native';
import {useTheme} from '../../contexts/ThemeContext';
import {ThemeType} from '../../themes/themes';

type ButtonProps = {
  title: string;
  onPress?: () => void;
};

export default function Button({
  title,
  onPress,
}: ButtonProps): React.JSX.Element {
  const {theme} = useTheme();

  const styles = CreateStyles(theme);

  return (
    <Pressable onPress={onPress} style={styles.Pressable}>
      {title &&  <Text style={styles.Text}>{title}</Text>}
    </Pressable>
  );
}

const CreateStyles = ({colors}: ThemeType) =>
  StyleSheet.create({
    Pressable: {
      backgroundColor: colors.primary,
      padding: 10,
      borderRadius: 50,
      width: 50,
      height: 50,
    },
    Text: {
      color: colors.text,
      fontSize: 20,
      textAlign: 'center',
      fontFamily: 'Roboto-Regular',
    },
  });
