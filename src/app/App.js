import React from 'react';
import Retrieve from './Retrieve';
import Box from '@material-ui/core/Box';
import ProfileBar from './ProfileBar';
import RefreshButton from './RefreshButton';
import Heatmap from './Heatmap';
import ProblemSet from './ProblemSet';

class Home extends React.Component {
  state = {
    retrieving: true,
    profile: {
      correct: 0,
      wrong: 1,
      solved: 0,
      total: 0
    },
    heatmap: null
  };

  componentDidMount() {
    this.getProfile();
    this.getHeatmap();
  }

  getProfile = async () => {
    let res = await Retrieve.getProfileInfo('eralp');
    this.setState(() => {
      return { profile: res, retrieving: false };
    });
  };

  getHeatmap = async () => {
    let res = await Retrieve.getHeatmap('eralp');
    this.setState(() => {
      return { heatmap: res, retrieving: false };
    });
  };

  handleRefresh = () => {
    this.setState(() => {
      return { retrieving: true };
    });
    this.getHeatmap();
    this.getProfile();
  };

  render() {
    return (
      <div style={{ width: '100%', height: '100%' }}>
        <ProfileBar profile={this.state.profile}></ProfileBar>
        <Box display="flex" flexDirection="row-reverse">
          <Box flexShrink={1}>
            <Heatmap heatmap={this.state.heatmap || []} />
          </Box>
          <Box width="100%">
            <ProblemSet
              solved={this.state.profile.solved}
              total={this.state.profile.total}
            />
          </Box>
        </Box>
        <Box
          display="flex"
          flexWrap="wrap"
          alignContent="flex-end"
          justifyContent="flex-end"
          css={{ maxWidth: 203, height: 135 }}
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
