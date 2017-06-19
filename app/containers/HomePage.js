// @flow
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as IActions from '../actions/inventoryActionCreator';

import Home from '../components/Home';

const mapStateToProps = state => ({
  items: state.inventory.items
});

const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators(IActions, dispatch)
});

// // class HomePage extends Component {
// //   render() {
// //     console.warn(this.props);
// //     return (
// //       <Home {...this.props} />
// //     );
// //   }
// }

export default connect(mapStateToProps, mapDispatchToProps)(Home);
