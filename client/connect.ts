import * as ChatActions from '@little-chat/core/actions';
import ChatApp from '@little-chat/ui/app';
import { connect } from 'react-redux';

const mapStateToProps = (state) => {
  return state;
};

export default connect(mapStateToProps, ChatActions)(ChatApp);
