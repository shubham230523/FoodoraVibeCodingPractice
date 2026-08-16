import React from 'react';
import { View, Text, StyleSheet, ViewStyle, TextStyle } from 'react-native';
import { theme } from '../../theme/theme';
import { UtensilsCrossed } from 'lucide-react-native';

interface LogoProps {
  size?: 'sm' | 'md' | 'lg' | 'xl';
  color?: string;
  textColor?: string;
  style?: ViewStyle;
}

export const Logo: React.FC<LogoProps> = ({
  size = 'md',
  color = theme.colors.primary,
  textColor,
  style
}) => {
  const getIconSize = () => {
    switch (size) {
      case 'sm': return 16;
      case 'lg': return 32;
      case 'xl': return 48;
      default: return 24;
    }
  };

  const getFontSize = () => {
    switch (size) {
      case 'sm': return 14;
      case 'lg': return 28;
      case 'xl': return 42;
      default: return 20;
    }
  };

  const finalTextColor = textColor || theme.colors.text;
  const logoSuffixColor = textColor ? theme.colors.white : color;

  return (
    <View style={[styles.container, style]}>
      <View style={[styles.iconContainer, { backgroundColor: textColor ? theme.colors.white : color }]}>
        <UtensilsCrossed size={getIconSize()} color={textColor ? color : theme.colors.white} />
      </View>
      <Text style={[styles.text, { fontSize: getFontSize(), color: finalTextColor }]}>
        Food<Text style={{ color: logoSuffixColor }}>ora</Text>
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  iconContainer: {
    padding: 8,
    borderRadius: 12,
    marginRight: 8,
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    fontWeight: theme.typography.fontWeight.bold,
    letterSpacing: -0.5,
  },
});
