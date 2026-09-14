/* eslint-env jest */
require('react-native-gesture-handler/jestSetup');

jest.mock('react-native-gesture-handler', () => {
  const React = require('react');
  const {View} = require('react-native');
  return {
    ...jest.requireActual('react-native-gesture-handler'),
    GestureHandlerRootView: ({children, ...props}) =>
      React.createElement(View, props, children),
  };
});

jest.mock('@react-native-async-storage/async-storage', () =>
  require('@react-native-async-storage/async-storage/jest/async-storage-mock'),
);

jest.mock('react-native-safe-area-context', () => {
  const React = require('react');
  const insets = {top: 0, left: 0, right: 0, bottom: 0};
  const frame = {x: 0, y: 0, width: 375, height: 812};
  const SafeAreaInsetsContext = React.createContext(insets);
  const SafeAreaFrameContext = React.createContext(frame);

  const SafeAreaProvider = ({children}) =>
    React.createElement(
      SafeAreaInsetsContext.Provider,
      {value: insets},
      React.createElement(
        SafeAreaFrameContext.Provider,
        {value: frame},
        children,
      ),
    );

  return {
    __esModule: true,
    SafeAreaInsetsContext,
    SafeAreaFrameContext,
    SafeAreaProvider,
    SafeAreaConsumer: ({children}) => children(insets),
    useSafeAreaInsets: () => insets,
    useSafeAreaFrame: () => frame,
    initialWindowMetrics: {insets, frame},
    default: {
      SafeAreaInsetsContext,
      SafeAreaFrameContext,
      SafeAreaProvider,
      SafeAreaConsumer: ({children}) => children(insets),
      useSafeAreaInsets: () => insets,
      useSafeAreaFrame: () => frame,
      initialWindowMetrics: {insets, frame},
    },
  };
});

jest.mock('@react-navigation/elements', () => {
  const React = require('react');
  const {View} = require('react-native');
  const actual = jest.requireActual('@react-navigation/elements');
  const SafeAreaProviderCompat = ({children, style}) =>
    React.createElement(View, {style}, children);
  SafeAreaProviderCompat.initialMetrics = {
    frame: {x: 0, y: 0, width: 375, height: 812},
    insets: {top: 0, left: 0, right: 0, bottom: 0},
  };
  return {
    ...actual,
    SafeAreaProviderCompat,
  };
});
