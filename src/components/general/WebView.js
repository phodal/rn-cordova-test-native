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
  WebView,
  StyleSheet,
  InteractionManager,
} from 'react-native';

// Consts and Libs
import { AppColors, AppStyles } from '@theme/';

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
  webview = null;
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

  handleMessage = (evt: any) => {
    const message = evt.nativeEvent.data;
    this.webview.postMessage(message);
  }

  render = () => {
    const { webViewURL, loading } = this.state;

    if (loading) return <Loading />;
    if (!webViewURL) return <Error type={'URL not defined.'} />;

    return (
      <WebView
        ref={(webview) => { this.webview = webview; }}
        scalesPageToFit
        startInLoadingState
        onMessage={this.handleMessage}
        source={{ uri: webViewURL }}
        automaticallyAdjustContentInsets={false}
        style={[AppStyles.container, styles.container]}
        onNavigationStateChange={this.onNavigationStateChange}
        cacheEnabled={true}
      />
    );
  }
}

/* Export Component ==================================================================== */
export default AppWebView;
