import React from 'react';
import { Actions, Scene, ActionConst } from 'react-native-router-flux';
import { AppConfig } from '@constants/';
import Drawer from '@containers/ui/DrawerContainer';

import AppLaunch from '@containers/Launch/LaunchContainer';
import Placeholder from '@components/general/Placeholder';
import TabsScenes from './tabs';

export default Actions.create(
  <Scene key={'root'} {...AppConfig.navbarProps}>
    <Scene
      hideNavBar
      key={'splash'}
      component={AppLaunch}
      analyticsDesc={'AppLaunch: Launching App'}
    />

    {/* Main App */}
    <Scene key={'app'} {...AppConfig.navbarProps} title={AppConfig.appName} hideNavBar={false} type={ActionConst.RESET}>
      {/* Drawer Side Menu */}
      <Scene key={'home'} component={Drawer} initial={'tabBar'}>
        {/* Tabbar */}
        // TODO: clean old tabs code
        {TabsScenes}
      </Scene>

      {/* General */}
      <Scene
        clone
        key={'comingSoon'}
        title={'Coming Soon'}
        component={Placeholder}
        analyticsDesc={'Placeholder: Coming Soon'}
      />
    </Scene>
  </Scene>,
);
