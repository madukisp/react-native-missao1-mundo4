import React from 'react';
import { View, Image, StyleSheet } from 'react-native';

const ImagemFornecedor = ({ uri }) => {
  return (
    <View style={styles.container}>
      <Image source={{ uri }} style={styles.image} />
    </View>
  );
};

export default ImagemFornecedor;
