import React from 'react';
import { Button } from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';
import { orange } from '@material-ui/core/colors';
import Box from '@material-ui/core/Box';
import ListIcon from '@material-ui/icons/PlaylistAddCheck';
import { shell } from 'electron';

export default function ProblemButton(props) {
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
  const handleClick = () => {
    shell.openExternal('https://leetcode.com/problemset/all/');
  };
  return (
    <Box>
      <SmallButton variant="contained" onClick={handleClick}>
        {props.solved} / {props.total}
        <ListIcon style={{ fontSize: '20px', marginLeft: '2px' }} />
      </SmallButton>
    </Box>
  );
}
