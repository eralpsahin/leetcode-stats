import React from 'react';
import { Button } from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';
import { orange } from '@material-ui/core/colors';
import Box from '@material-ui/core/Box';
import ArrowDropUpIcon from '@material-ui/icons/ArrowDropUp';
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

class ProblemSet extends React.Component {
  constructor(props) {
    super(props);
  }
  handleProblemSetClick = () => {
    shell.openExternal('https://leetcode.com/problemset/all/');
  };

  render() {
    return (
      <Box pl={0.5} pt={1}>
        <SmallButton variant="contained" onClick={this.handleProblemSetClick}>
          {this.props.solved} / {this.props.total}
          <ArrowDropUpIcon fontSize="small" />
        </SmallButton>
      </Box>
    );
  }
}

export default ProblemSet;
