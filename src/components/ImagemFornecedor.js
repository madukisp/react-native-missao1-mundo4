import React from 'react';
import { View, Image, StyleSheet } from 'react-native';

const ImagemFornecedor = ({ uri }) => {
  return (
    <View style={styles.container}>
      <Image source={{ uri }} style={styles.image} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    padding: 10,
  },
  image: {
    width: 100,
    height: 100,
  },
});

export default ImagemFornecedor;