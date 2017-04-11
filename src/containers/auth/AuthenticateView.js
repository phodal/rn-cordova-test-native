import React, { Component } from 'react';
import { StyleSheet, WebView } from 'react-native';
import { AppSizes, AppStyles } from '@theme/';

const styles = StyleSheet.create({
  background: {
    backgroundColor: 'transparent',
    height: AppSizes.screen.height,
    width: AppSizes.screen.width,
  },
  logo: {
    width: AppSizes.screen.width * 0.85,
    resizeMode: 'contain',
  },
  whiteText: {
    color: '#FFF',
  },
});

class Authenticate extends Component {
  static componentName = 'Authenticate';

  handleMessage = (evt: any) => {
    const message = evt.nativeEvent.data;
    this.webview.postMessage(message);
    console.log(message);
    this.message = message;
    this.popupDialog.show();
  };

  render = () => (
    <WebView
      ref={(webview) => {
        this.webview = webview;
      }}
      scalesPageToFit
      startInLoadingState
      onMessage={this.handleMessage}
      source={{ source: require('tree.html') }}
      automaticallyAdjustContentInsets={false}
      style={[AppStyles.container, styles.container]}
      onNavigationStateChange={this.onNavigationStateChange}
      cacheEnabled
    />
  )
}

/* Export Component ==================================================================== */
export default Authenticate;
