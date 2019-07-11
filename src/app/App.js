import React from 'react';
import Retrieve from './Retrieve';
import Box from '@material-ui/core/Box';
import ProfileBar from './ProfileBar';
import RefreshButton from './RefreshButton';
class Home extends React.Component {
  state = {
    profile: {
      correct: 0,
      wrong: 1
    },
    retrieving: true
  };

  componentDidMount() {
    this.getProfile();
  }

  getProfile = async () => {
    let res = await Retrieve.get('eralp');
    this.setState(() => {
      return { profile: res, retrieving: false };
    });
  };

  handleRefresh = () => {
    this.setState(() => {
      return { retrieving: true };
    });
    this.getProfile();
  };

  render() {
    return (
      <div style={{ width: '100%', height: '100%' }}>
        <ProfileBar profile={this.state.profile}></ProfileBar>
        <Box
          display="flex"
          flexWrap="wrap"
          alignContent="flex-end"
          justifyContent="flex-end"
          css={{ maxWidth: 205, height: 253 }}
        >
          <RefreshButton
            retrieving={this.state.retrieving}
            handleRefresh={this.handleRefresh}
          ></RefreshButton>
        </Box>
      </div>
    );
  }
}

export default Home;
