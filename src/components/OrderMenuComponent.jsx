import React, { useState } from 'react';
import { Menu } from 'react-native-paper';
import { StyleSheet, Button, View } from 'react-native';
import MenuFilterStyles from '../styles/components/MenuFilterComponent';

const OrderMenu = ({ setOrder }) => {
  const [visible, setVisible] = useState(false);

  const toggleVisibility = () => setVisible(!visible);

  const handleOrderChange = (order) => {
    setOrder(order);
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
          title="Show order"
          color="#007AFF" 
          accessibilityLabel="Toggle direction filter"
          disabled={visible} 
        />}
      >
        <Menu.Item onPress={() => handleOrderChange('CREATED_AT')} title="Last repositories" />
        <Menu.Item onPress={() => handleOrderChange('RATING_AVERAGE')} title="Highest rated" />
        <Menu.Item onPress={() => handleOrderChange('RATING_AVERAGE')} title="Lowest rated" />
      </Menu>
    </View>
  );
};

export default OrderMenu;