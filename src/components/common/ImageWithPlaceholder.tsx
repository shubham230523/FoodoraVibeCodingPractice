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
  const [isLoading, setIsLoading] = React.useState(true);
  const [hasError, setHasError] = React.useState(false);

  // Reset loading state when source changes
  const sourceKey = typeof source === 'object' && source !== null && 'uri' in source ? source.uri : JSON.stringify(source);

  React.useEffect(() => {
    setIsLoading(true);
    setHasError(false);
  }, [sourceKey]);

  const handleLoadEnd = React.useCallback(() => {
    setIsLoading(false);
  }, []);

  const handleError = React.useCallback(() => {
    setIsLoading(false);
    setHasError(true);
  }, []);

  return (
    <View style={[styles.container, containerStyle, style]}>
      {source ? (
        <Image
          source={source}
          style={[StyleSheet.absoluteFill, style]}
          onLoadEnd={handleLoadEnd}
          onError={handleError}
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

      {!isLoading && hasError && (
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
