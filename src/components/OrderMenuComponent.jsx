import React, { useState } from 'react';
import { Menu, Button } from 'react-native-paper';
import { StyleSheet } from 'react-native';

const OrderMenu = ({ setOrder }) => {
  const [visible, setVisible] = useState(false);

  const toggleVisibility = () => setVisible(!visible);

  const handleOrderChange = (order) => {
    setOrder(order);
    setVisible(false);
  };

  return (
    <Menu
      visible={visible}
      onDismiss={() => setVisible(false)}
      style={styles.menu}
      anchor={<Button onPress={toggleVisibility}>Show order</Button>}
    >
      <Menu.Item onPress={() => handleOrderChange('CREATED_AT')} title="Last repositories" />
      <Menu.Item onPress={() => handleOrderChange('RATING_AVERAGE')} title="Highest rated" />
      <Menu.Item onPress={() => handleOrderChange('RATING_AVERAGE')} title="Lowest rated" />
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

export default OrderMenu;