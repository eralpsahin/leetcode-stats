import React from 'react';
import Retrieve from './Retrieve';
import Box from '@material-ui/core/Box';
import ProfileBar from './ProfileBar';
import RefreshButton from './RefreshButton';
import Heatmap from './Heatmap';
import ProblemButton from './ProblemButton';
import ProblemTable from './ProblemTable';
import Typography from 'material-ui/styles/typography';
class Home extends React.Component {
  state = {
    retrieving: true,
    profile: {
      correct: 0,
      wrong: 1,
      solved: 0,
      total: 0,
      recent: []
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
        <Box
          display="flex"
          flexDirection="row-reverse"
          style={{ height: '90px' }}
        >
          <Box flexShrink={1} pr={0.8}>
            <Heatmap heatmap={this.state.heatmap || []} />
          </Box>
          <Box width="100%" pl={0.5} pt={1}>
            <ProblemButton
              solved={this.state.profile.solved}
              total={this.state.profile.total}
            />
          </Box>
        </Box>
        <Box
          mx="auto"
          css={{ maxWidth: 192.2, height: 132.53 }}
          style={{ marginTop: '-19px' }}
        >
          <span style={{ fontSize: '13px' }}>Submissions:</span>
          <ProblemTable recent={this.state.profile.recent} />
        </Box>
        <Box
          display="flex"
          flexWrap="wrap"
          alignContent="flex-end"
          justifyContent="flex-end"
          css={
            !this.state.retrieving
              ? { maxWidth: 205, height: 48 }
              : { maxWidth: 202, height: 46 }
          }
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
