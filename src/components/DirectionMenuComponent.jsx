import React, { useState } from 'react';
import { Menu } from 'react-native-paper';
import { StyleSheet, Button, View } from 'react-native';
import MenuFilterStyles from '../styles/components/MenuFilterComponent';

const DirectionMenu = ({ setDirection }) => {
  const [visible, setVisible] = useState(false);

  const toggleVisibility = () => setVisible(!visible);

  const handleDirectionChange = (direction) => {
    setDirection(direction);
    setVisible(false);
  };

  return (
    <View style={{ margin: 10 }}>
      <Menu
        visible={visible}
        onDismiss={() => setVisible(false)}
        style={MenuFilterStyles.menu}
        anchor={<Button
          onPress={toggleVisibility}
          title="Show order direction"
          color="#007AFF" 
          accessibilityLabel="Toggle direction filter"
          disabled={visible} 
        />}
      >
        <Menu.Item onPress={() => handleDirectionChange('ASC')} title="Ascending" />
        <Menu.Item onPress={() => handleDirectionChange('DESC')} title="Descending" />
      </Menu>
    </View>
  );
};

export default DirectionMenu;