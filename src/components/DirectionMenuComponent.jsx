import React, { useState } from 'react';
import { Menu } from 'react-native-paper';
import { StyleSheet, Button, View } from 'react-native';

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
        style={styles.menu}
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

const styles = StyleSheet.create({
  menu: {
    padding: 10, 
    width: '60%', 
    alignSelf: 'center', 
    marginTop: 10,
  },
  button: {
    borderRadius: 5, 
    paddingVertical: 10, 
    paddingHorizontal: 20, 
    backgroundColor: '#007AFF', 
    borderColor: '#0056b3', 
    borderWidth: 2, 
    shadowColor: '#000', 
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25, 
    shadowRadius: 3.84, 
    elevation: 5, 
  },
});

export default DirectionMenu;