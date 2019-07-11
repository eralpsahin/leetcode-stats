import '../assets/css/App.css';
import React from 'react';
import Retrieve from './Retrieve';
import Avatar from '@material-ui/core/Avatar';
import Box from '@material-ui/core/Box';
import CircularProgress from '@material-ui/core/CircularProgress';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import { green } from '@material-ui/core/colors';
import RefreshIcon from '@material-ui/icons/Refresh';
import IconButton from '@material-ui/core/IconButton';

class Home extends React.Component {
  state = {
    profile: {},
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
    console.log(this.state);
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
        <Box display="flex" flexDirection="row">
          <Box bgcolor="transparent" p={0.5} flexDirection="row">
            <Avatar alt="Profile Avatar" src={this.state.profile.avatar} />
          </Box>
          <Box mt={1.5}>
            <Typography> {this.state.profile.realname}</Typography>
          </Box>
        </Box>
        <Box
          display="flex"
          flexWrap="wrap"
          alignContent="flex-end"
          justifyContent="flex-end"
          css={{ maxWidth: 203, height: 255 }}
        >
          <IconButton
            aria-label="Delete"
            color="secondary"
            size="small"
            onClick={this.handleRefresh}
          >
            {this.state.retrieving && (
              <CircularProgress size={15} color="secondary" />
            )}
            {!this.state.retrieving && <RefreshIcon fontSize="inherit" />}
          </IconButton>
        </Box>
      </div>
    );
  }
}

export default Home;
