import React from 'react';
import CircularProgress from '@material-ui/core/CircularProgress';
import RefreshIcon from '@material-ui/icons/Refresh';
import IconButton from '@material-ui/core/IconButton';

export default function RefreshButton(props) {
  return (
    <IconButton
      aria-label="Delete"
      color="secondary"
      size="small"
      onClick={props.handleRefresh}
    >
      {props.retrieving && <CircularProgress size={15} color="secondary" />}
      {!props.retrieving && <RefreshIcon fontSize="inherit" />}
    </IconButton>
  );
}
