import React from 'react';
import Avatar from '@material-ui/core/Avatar';
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
import PieChart from 'react-minimal-pie-chart';
import Tooltip from '@material-ui/core/Tooltip';
import Zoom from '@material-ui/core/Zoom';

class ProfileBar extends React.Component {
  constructor(props) {
    super(props);
  }
  componentDidMount() {
    console.log(this.props);
  }
  render() {
    return (
      <Box display="flex" flexDirection="row">
        <Box flexGrow={1} display="flex">
          <Box bgcolor="transparent" p={0.5}>
            <Avatar alt="Profile Avatar" src={this.props.profile.avatar} />
          </Box>
          <Box mt={1.5}>
            <Typography> {this.props.profile.realname}</Typography>
          </Box>
        </Box>
        <Tooltip
          title={`${this.props.profile.correct} / ${this.props.profile.wrong +
            this.props.profile.correct}`}
          placement="left"
          TransitionComponent={Zoom}
        >
          <Box width={20} p={0.5} justifyContent="center">
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
            <Typography variant="caption">
              {(
                (this.props.profile.correct /
                  (this.props.profile.wrong + this.props.profile.correct)) *
                100
              ).toFixed(1)}
            </Typography>
          </Box>
        </Tooltip>
      </Box>
    );
  }
}

export default ProfileBar;
