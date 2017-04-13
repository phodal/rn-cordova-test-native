import React from 'react';
import { Scene } from 'react-native-router-flux';

import { AppConfig } from '@constants/';
import { AppStyles, AppSizes } from '@theme/';
import { TabIcon } from '@ui/';
import { NavbarMenuButton } from '@containers/ui/NavbarMenuButton/NavbarMenuButtonContainer';
import SkillTree from '@containers/SkillTree';

const navbarPropsTabs = {
  ...AppConfig.navbarProps,
  renderLeftButton: () => <NavbarMenuButton />,
  sceneStyle: {
    ...AppConfig.navbarProps.sceneStyle,
    paddingBottom: AppSizes.tabbarHeight,
  },
};

/* Routes ==================================================================== */
const scenes = (
  <Scene key={'tabBar'} tabs={false} tabBarIconContainerStyle={AppStyles.tabbar} pressOpacity={0.95}>
    <Scene
      key={'skillTree'}
      {...navbarPropsTabs}
      title={'技能树'}
      component={SkillTree}
      icon={props => TabIcon({ ...props, icon: 'timeline' })}
      analyticsDesc={'SkillTree: find your self'}
    />
  </Scene>
);

export default scenes;
