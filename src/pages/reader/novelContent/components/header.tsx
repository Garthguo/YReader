import React from 'react';
// import {Text} from 'react-native-ui-lib';
import {Modal} from 'react-native-ui-lib';
const Header = () => {
  return (
    <Modal.TopBar
      title={'Title'}
      onCancel={() => console.log('cancel')}
      onDone={() => console.log('done')}
    />
  );
};
export default Header;
