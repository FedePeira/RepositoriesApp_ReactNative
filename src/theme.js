import { Platform } from "react-native";

const theme = {
  colors: {
    textPrimary: '#24292e',
    textSecondary: '#586069',
    primary: '#0366d6',
    white: '#fff',
    grey: '#808080',
    light: '#ffffe0',
    darkBlue: '#00008b',
    red: '#FF0000',
    blue: '#0000FF',
  },
  fontSizes: {
    body: 14,
    subheading: 18,
    iconSize: 22,
    title: 40,
  },
  fonts: Platform.select({
    android: 'Roboto', 
    ios: 'Arial', 
    default: 'System', 
  }),
  fontWeights: {
    normal: '400',
    bold: '700',
  },
  lineHeights: {
    small: 20 ,
    normal: 40 ,
    medium: 60,
    high: 80,
  }
};

export default theme;