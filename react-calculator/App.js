import React from 'react';
import { View } from 'react-native';
import CalculatorScreen from "./screens/CalculatorScreen";

export default class App extends React.Component {
  render() {
    return (
      <View style={{flex:1}}>
        <CalculatorScreen />
      </View>
    );
  }
}
