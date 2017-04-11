/**
 * Web View
 *
 * <WebView url={"http://google.com"} />
 *
 * React Native Starter App
 * https://github.com/mcnamee/react-native-starter-app
 */
import React, { Component, PropTypes } from 'react';
import {
  View,
  WebView,
  Text,
  StyleSheet,
  InteractionManager,
} from 'react-native';

// Consts and Libs
import { AppColors, AppStyles } from '@theme/';
import PopupDialog, { SlideAnimation } from 'react-native-popup-dialog';

// Components
import Loading from '@components/general/Loading';
import Error from '@components/general/Error';

/* Styles ==================================================================== */
const styles = StyleSheet.create({
  container: {
    backgroundColor: AppColors.background,
  },
});

/* Component ==================================================================== */
class AppWebView extends Component {
  static componentName = 'AppWebView';

  static propTypes = {
    url: PropTypes.string.isRequired,
    onNavigationStateChange: PropTypes.func,
  }

  static defaultProps = {
    onNavigationStateChange: null,
  }

  constructor(props) {
    super(props);

    this.state = {
      loading: true,
      webViewURL: props.url || null,
    };
  }

  componentDidMount = () => {
    // Wait until interaction has finished before loading the webview in
    InteractionManager.runAfterInteractions(() => {
      this.setState({ loading: false });
    });
  }

  /**
    * Each time page loads, update the URL
    */
  onNavigationStateChange = (navState) => {
    this.state.webViewURL = navState.url;
    if (this.props.onNavigationStateChange) this.props.onNavigationStateChange(navState.url);
  };
  webview = null;
  popupDialog = null;
  message = 1;

  handleMessage = (evt: any) => {
    const message = evt.nativeEvent.data;
    this.webview.postMessage(message);
    this.message = message;
    this.popupDialog.show();
  }

  render = () => {
    const { webViewURL, loading } = this.state;

    if (loading) return <Loading />;
    if (!webViewURL) return <Error type={'URL not defined.'} />;

    return (
      <View>
        <WebView
          ref={(webview) => { this.webview = webview; }}
          scalesPageToFit
          startInLoadingState
          onMessage={this.handleMessage}
          source={{ uri: webViewURL }}
          automaticallyAdjustContentInsets={false}
          style={[AppStyles.container, styles.container]}
          onNavigationStateChange={this.onNavigationStateChange}
          cacheEnabled
        />
        <PopupDialog
          ref={(popupDialog) => { this.popupDialog = popupDialog; }}
          dialogAnimation={new SlideAnimation({ slideFrom: 'bottom' })}
        >
          <View>
            <Text>{this.data}</Text>
          </View>
        </PopupDialog>
      </View>
    );
  }
}

/* Export Component ==================================================================== */
export default AppWebView;
