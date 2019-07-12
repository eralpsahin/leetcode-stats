import React from 'react';
import Avatar from '@material-ui/core/Avatar';
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
import PieChart from 'react-minimal-pie-chart';
import Tooltip from '@material-ui/core/Tooltip';
import Zoom from '@material-ui/core/Zoom';
import { shell } from 'electron';
import ReactTooltip from 'react-tooltip';

class ProfileBar extends React.Component {
  constructor(props) {
    super(props);
  }
  handleProfileClick = () => {
    shell.openExternal('https://leetcode.com/eralp');
  };
  render() {
    return (
      <Box display="flex" flexDirection="row">
        <Box flexGrow={1} display="flex">
          <Box
            bgcolor="transparent"
            p={0.5}
            onClick={this.handleProfileClick}
            style={{ cursor: 'pointer' }}
          >
            <Avatar alt="Profile Avatar" src={this.props.profile.avatar} />
          </Box>
          <Box mt={1.5}>
            <Typography> {this.props.profile.realname}</Typography>
          </Box>
        </Box>
        <Box
          width={20}
          p={0.5}
          justifyContent="center"
          data-tip={`Ratio: ${this.props.profile.correct} / ${this.props.profile
            .wrong + this.props.profile.correct}`}
          data-for="pie-tooltip"
        >
          <PieChart
            data={[
              {
                value: this.props.profile.correct || 0,
                color: '#4caf50'
              }, // Green for correct
              {
                value: this.props.profile.wrong || 0,
                color: '#b71c1c'
              } // Red for wrong
            ]}
          />
          <Box ml={-0.5}>
            <Typography variant="caption">
              {(
                (this.props.profile.correct /
                  (this.props.profile.wrong + this.props.profile.correct)) *
                100
              ).toFixed(1) + '%'}
            </Typography>
          </Box>
        </Box>
        <ReactTooltip
          id="pie-tooltip"
          getContent={value => {
            return value;
          }}
          place="left"
        />
      </Box>
    );
  }
}

export default ProfileBar;
