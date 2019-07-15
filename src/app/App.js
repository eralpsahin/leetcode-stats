import React from 'react';
import Retrieve from './Retrieve';
import Box from '@material-ui/core/Box';
import ProfileBar from './ProfileBar';
import RefreshButton from './RefreshButton';
import ConfigurationDialog from './ConfigurationDialog';
import Heatmap from './Heatmap';
import ProblemButton from './ProblemButton';
import ProblemTable from './ProblemTable';
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
    username: '',
    heatmap: null
  };

  componentDidMount() {
    if (this.state.username === '') {
      this.setState(() => {
        return { retrieving: false };
      });
    } else {
      this.getProfile();
      this.getHeatmap();
    }
  }

  getProfile = async () => {
    let res = await Retrieve.getProfileInfo(this.state.username);
    this.setState(() => {
      return { profile: res, retrieving: false };
    });
  };

  getHeatmap = async () => {
    let res = await Retrieve.getHeatmap(this.state.username);
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

  handleConfiguration = username => {
    this.setState(
      () => {
        return { username: username, retrieving: true };
      },
      () => {
        this.getProfile();
        this.getHeatmap();
      }
    );
  };

  render() {
    return (
      <Box width="100%" height="100%">
        <ProfileBar profile={this.state.profile}></ProfileBar>
        <Box display="flex" flexDirection="row-reverse" height={90}>
          <Box flexShrink={1} pr={0.8} mt={-2}>
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
          mt={-2.5}
          className="submissions"
        >
          {this.state.profile.recent.length ? (
            <span style={{ fontSize: '13px' }}>Submissions:</span>
          ) : (
            ''
          )}
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
          <Box width="100%">
            <Box display="flex">
              <Box flexGrow={1}>
                <ConfigurationDialog
                  save={this.handleConfiguration}
                  username={this.state.username}
                ></ConfigurationDialog>
              </Box>
              <Box>
                <RefreshButton
                  retrieving={this.state.retrieving}
                  handleRefresh={this.handleRefresh}
                ></RefreshButton>
              </Box>
            </Box>
          </Box>
        </Box>
      </Box>
    );
  }
}

export default Home;
