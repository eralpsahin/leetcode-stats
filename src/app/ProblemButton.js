import React from 'react';
import { Button } from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';
import { orange } from '@material-ui/core/colors';
import Box from '@material-ui/core/Box';
import ListIcon from '@material-ui/icons/PlaylistAddCheck';
import { shell } from 'electron';

const SmallButton = withStyles(theme => ({
  root: {
    color: theme.palette.getContrastText(orange[500]),
    backgroundColor: orange[500],
    '&:hover': {
      backgroundColor: orange[700]
    },
    padding: 2,
    fontSize: 12
  }
}))(Button);

class ProblemButton extends React.Component {
  constructor(props) {
    super(props);
  }
  handleClick = () => {
    shell.openExternal('https://leetcode.com/problemset/all/');
  };

  render() {
    return (
      <Box>
        <SmallButton variant="contained" onClick={this.handleClick}>
          {this.props.solved} / {this.props.total}
          <ListIcon style={{ fontSize: '20px', marginLeft: '2px' }} />
        </SmallButton>
      </Box>
    );
  }
}

export default ProblemButton;
