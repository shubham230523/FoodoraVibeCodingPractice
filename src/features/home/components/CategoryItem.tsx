import React from 'react';
import { TouchableOpacity, Text, StyleSheet, View } from 'react-native';
import { theme } from '../../../theme/theme';
import { ImageWithPlaceholder } from '../../../components/common/ImageWithPlaceholder';

interface CategoryItemProps {
  name: string;
  image: string;
  onPress: () => void;
}

export const CategoryItem: React.FC<CategoryItemProps> = ({ name, image, onPress }) => {
  return (
    <TouchableOpacity style={styles.container} onPress={onPress} activeOpacity={0.7}>
      <View style={styles.imageContainer}>
        <ImageWithPlaceholder source={{ uri: image }} style={styles.image} />
      </View>
      <Text style={styles.text} numberOfLines={1}>{name}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    marginRight: theme.spacing.md,
    width: 70,
  },
  imageContainer: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: theme.colors.surface,
    overflow: 'hidden',
    marginBottom: theme.spacing.xs,
  },
  image: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
  text: {
    fontSize: theme.typography.fontSize.xs,
    fontWeight: theme.typography.fontWeight.medium,
    color: theme.colors.text,
    textAlign: 'center',
  },
});
