import React, { useState } from 'react';
import { Menu, Button } from 'react-native-paper';
import { StyleSheet } from 'react-native';

const DirectionMenu = ({ setDirection }) => {
  const [visible, setVisible] = useState(false);

  const toggleVisibility = () => setVisible(!visible);

  const handleDirectionChange = (direction) => {
    setDirection(direction);
    setVisible(false);
  };

  return (
    <Menu
      visible={visible}
      onDismiss={() => setVisible(false)}
      style={styles.menu}
      anchor={<Button onPress={toggleVisibility}>Show order direction</Button>}
    >
      <Menu.Item onPress={() => handleDirectionChange('ASC')} title="Ascending" />
      <Menu.Item onPress={() => handleDirectionChange('DESC')} title="Descending" />
    </Menu>
  );
};

const styles = StyleSheet.create({
  menu: {
    backgroundColor: 'rgba(128, 128, 128, 0.8)', 
    borderRadius: 10,
    padding: 10, 
    width: '60%', 
    alignSelf: 'center', 
    marginTop: 10,
  },
});

export default DirectionMenu;