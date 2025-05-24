import React, {useEffect} from 'react';
import {Image, StyleSheet, Text, View} from 'react-native';

export default function AlbumArtwork({
  imageUri,
}: {
  imageUri: string;
}): React.JSX.Element {
  const [loading, setLoading] = React.useState(true);

  useEffect(() => {
    const delayImageLoad = async () => {
      setLoading(true);
      await new Promise(resolve => setTimeout(resolve, 1000));
      setLoading(false);
      console.log('Image loaded');
    };
    delayImageLoad();
  }, [imageUri]);

  return loading ? (
    <View style={styles.placeholder}>
      <Text style={styles.text}>Loading</Text>
    </View>
  ) : (
    <Image
      onError={({nativeEvent}) => {
        console.log(nativeEvent);
      }}
      source={{
        uri: imageUri,
        body: 'password: 9262',
        headers: {
          Authorization: 'Basic OjkyNjI=',
          Pragma: 'no-cache',
        },
        cache: 'reload',
      }}
      style={styles.artwork}
    />
  );
}

const styles = StyleSheet.create({
  artwork: {width: 250, height: 250, borderRadius: 10, marginBottom: 20},
  placeholder: {
    width: 250,
    height: 250,
    borderRadius: 10,
    backgroundColor: '#ddd',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
  },
  text: {
    color: '#aaa',
    fontSize: 16,
  },
});
