import React, { Component } from 'react';
import {
  View,
  Image,
  StatusBar,
  StyleSheet,
  ActivityIndicator,
} from 'react-native';
import { Actions } from 'react-native-router-flux';

import { AppStyles, AppSizes } from '@theme/';

const styles = StyleSheet.create({
  launchImage: {
    width: AppSizes.screen.width,
    height: AppSizes.screen.height,
  },
});

class AppLaunch extends Component {
  static componentName = 'AppLaunch';

  componentDidMount = () => {
    StatusBar.setHidden(false, true);

    Actions.app({ type: 'reset' });
  };

  render = () => (
    <View style={[AppStyles.container]}>
      <Image
        source={require('../../images/launch.jpg')}
        style={[styles.launchImage, AppStyles.containerCentered]}
      >
        <ActivityIndicator
          animating
          size={'large'}
          color={'#C1C5C8'}
        />
      </Image>
    </View>
  );
}

/* Export Component ==================================================================== */
export default AppLaunch;
