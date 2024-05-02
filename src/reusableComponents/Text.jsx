import React from 'react';
import { Text as NativeText, StyleSheet } from 'react-native';

import theme from '../theme';

const styles = StyleSheet.create({
  text: {
    color: theme.colors.textPrimary,
    fontSize: 14,
    fontFamily: theme.fonts.main,
    fontWeight: theme.fontWeights.normal,
    lineHeight: theme.lineHeights.normal
  },
  colorTextSecondary: {
    color: theme.colors.textSecondary,
  },
  colorPrimary: {
    color: theme.colors.primary,
  },
  colorWhite: {
    color: theme.colors.white,
  },  
  colorGrey: {
    color: theme.colors.grey,
  }, 
  colorRed: {
    color: theme.colors.red,
  }, 
  fontSizeSubheading: {
    fontSize: theme.fontSizes.subheading,
  }, 
  fontSizeTitle: {
    fontSize: theme.fontSizes.title,
  }, 
  fontWeightBold: {
    fontWeight: theme.fontWeights.bold,
  }, 
  lineHeightSmall: {
    lineHeight: theme.lineHeights.small,
  },
  lineHeightMedium: {
    lineHeight: theme.lineHeights.medium,
  },
  lineHeightHigh: {
    lineHeight: theme.lineHeights.high,
  },
});

const Text = ({ color, fontSize, fontWeight, lineHeight, align, style, ...props }) => {
  const textStyle = [
    styles.text,
    color === 'textSecondary' && styles.colorTextSecondary,
    color === 'primary' && styles.colorPrimary,
    color === 'white' && styles.colorWhite,
    color === 'grey' && styles.colorGrey,
    color === 'red' && styles.colorRed,
    fontSize === 'subheading' && styles.fontSizeSubheading,
    fontSize === 'title' && styles.fontSizeTitle,
    fontWeight === 'bold' && styles.fontWeightBold,
    align === 'center' && { textAlign: 'center' },
    lineHeight === 'small' && styles.lineHeightSmall,
    lineHeight === 'medium' && styles.lineHeightMedium,
    lineHeight === 'high' && styles.lineHeightHigh,
    style,
  ];

  return <NativeText style={textStyle} {...props} />;
};

export default Text;