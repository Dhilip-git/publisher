/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */
import React, {useState, useEffect} from 'react';
import {StyleSheet, View} from 'react-native';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import FlashMessage from 'react-native-flash-message';
import StateView from './View/state-view.js';
const App = () => {
  return (
    <View style={styles.mainContainer}>
      <SafeAreaProvider>
        <StateView />
        <FlashMessage
          style={{height: 50, alignItems: 'center', zIndex: 999999999999}}
          position="top"
        />
      </SafeAreaProvider>
    </View>
  );
};

const styles = StyleSheet.create({
  mainContainer: {
    width: '100%',
    height: '100%',
  },
});

export default App;
