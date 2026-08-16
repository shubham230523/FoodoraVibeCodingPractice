import React, { useState } from 'react';
import { View, Image, ActivityIndicator, StyleSheet, ImageProps, ViewStyle } from 'react-native';
import { theme } from '../../theme/theme';
import { Image as LucideImage } from 'lucide-react-native';

interface ImageWithPlaceholderProps extends Omit<ImageProps, 'style'> {
  style?: ViewStyle | any;
  containerStyle?: ViewStyle;
}

export const ImageWithPlaceholder: React.FC<ImageWithPlaceholderProps> = ({
  source,
  style,
  containerStyle,
  ...props
}) => {
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);

  return (
    <View style={[styles.container, containerStyle, style]}>
      {source ? (
        <Image
          source={source}
          style={[StyleSheet.absoluteFill, style]}
          onLoadStart={() => setIsLoading(true)}
          onLoadEnd={() => setIsLoading(false)}
          onError={() => {
            setIsLoading(false);
            setHasError(true);
          }}
          {...props}
        />
      ) : (
        <View style={[styles.placeholder, style]}>
          <LucideImage size={24} color={theme.colors.textLight} />
        </View>
      )}

      {isLoading && (
        <View style={[styles.loader, style]}>
          <ActivityIndicator color={theme.colors.primary} />
        </View>
      )}

      {hasError && (
        <View style={[styles.placeholder, style]}>
          <LucideImage size={24} color={theme.colors.textLight} />
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: theme.colors.surface,
    overflow: 'hidden',
    position: 'relative',
  },
  placeholder: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: theme.colors.surface,
  },
  loader: {
    ...StyleSheet.absoluteFill,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: theme.colors.surface,
  },
});
