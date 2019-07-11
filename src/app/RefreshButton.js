import React from 'react';
import CircularProgress from '@material-ui/core/CircularProgress';
import RefreshIcon from '@material-ui/icons/Refresh';
import IconButton from '@material-ui/core/IconButton';

class RefreshButton extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <IconButton
        aria-label="Delete"
        color="secondary"
        size="small"
        onClick={this.props.handleRefresh}
      >
        {this.props.retrieving && (
          <CircularProgress size={15} color="secondary" />
        )}
        {!this.props.retrieving && <RefreshIcon fontSize="inherit" />}
      </IconButton>
    );
  }
}

export default RefreshButton;
