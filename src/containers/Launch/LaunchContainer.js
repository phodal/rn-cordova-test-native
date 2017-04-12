import { connect } from 'react-redux';
import AppLaunchRender from './LaunchView';

// What data from the store shall we send to the component?
const mapStateToProps = () => ({
});

// Any actions to map to the component?
const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(AppLaunchRender);
