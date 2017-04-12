import React, { Component } from 'react';
import { View, StyleSheet, WebView, Platform } from 'react-native';
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

class SkillTree extends Component {
  static componentName = 'SkillTree';

  constructor() {
    super();
    this.webview = null;
    this.injectJavaScript = this.injectJavaScript.bind(this);
  }

  injectJavaScript = () => {
    const script = `
    window.cordova = {
      getAppVersion: {
        getVersionNumber: function(){
          var message = {
            action: 'getVersionNumber'
          }
          window.postMessage(JSON.stringify(message))
        }
      }
    }`;
    // const script = "document.body.style.background = 'red';";
    if (this.webview) {
      this.webview.injectJavaScript('');
    }
  }

  handleMessage = (evt: any) => {
    const message = evt.nativeEvent.data;
    // this.webview.postMessage(message);
    console.log(message);
    this.message = message;
  };

  render = () => {
    let source;
    if (__DEV__) {
      source = require('../www/index.html');
    } else {
      source = Platform.OS === 'ios' ? require('../www/index.html') : { uri: 'file:///android_asset/www/index.html' };
    }

    return (
      <WebView
        ref={(webview) => {
          this.webview = webview;
        }}
        scalesPageToFit
        startInLoadingState
        onMessage={this.handleMessage}
        source={source}
        onLoad={this.injectJavaScript}
        automaticallyAdjustContentInsets={false}
        style={[AppStyles.container, styles.container]}
        onNavigationStateChange={this.onNavigationStateChange}
      />
    );
  }
}

export default SkillTree;
