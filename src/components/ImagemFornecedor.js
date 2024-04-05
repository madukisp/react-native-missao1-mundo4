import React from 'react';
import { View, Image } from 'react-native';
import { styles, colors } from './styles';

const ImagemFornecedor = ({ uri }) => {
  return (
    <View style={styles.containerImagemFornecedor}> {}
      <Image source={{ uri }} style={styles.imagemFornecedor} /> {}
    </View>
  );
};

export default ImagemFornecedor;
