import '../assets/css/App.css';
import React from 'react';
import Retrieve from './Retrieve';
import Avatar from '@material-ui/core/Avatar';
import Box from '@material-ui/core/Box';

export default class Home extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      profile: {}
    };
  }

  componentDidMount() {
    this.getProfile();
  }

  async getProfile() {
    let res = await Retrieve.get('eralp');
    this.setState({ profile: res });
  }

  render() {
    return (
      <Box mx="auto" ml={1} mt={1} display="flex" flexDirection="row">
        <Avatar alt="Profile Avatar" src={this.state.profile.avatar} />
        <Box pt={1.3} pl={0.5}>
          {this.state.profile.realname}
        </Box>
      </Box>
    );
  }
}
