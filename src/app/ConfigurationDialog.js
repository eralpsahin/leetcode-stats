import React from 'react';
import SettingsIcon from '@material-ui/icons/Settings';
import CheckIcon from '@material-ui/icons/Check';
import CrossIcon from '@material-ui/icons/Close';
import IconButton from '@material-ui/core/IconButton';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

class ConfigurationDialog extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      open: false,
      username: ''
    };
  }
  handleClickOpen = () => {
    this.setState({ open: true });
  };

  handleClose = () => {
    this.setState({ open: false });
  };
  onChange = event => {
    this.setState({ username: event.target.value });
  };

  onSave = () => {
    this.props.save(this.state.username);
    this.setState({ open: false });
  };

  render() {
    return (
      <>
        <IconButton
          aria-label="Delete"
          color="secondary"
          size="small"
          onClick={this.handleClickOpen}
        >
          <SettingsIcon fontSize="inherit" />
        </IconButton>
        <Dialog
          fullScreen
          open={this.state.open}
          onClose={this.handleClose}
          aria-labelledby="form-dialog-title"
        >
          <DialogTitle id="form-dialog-title">Settings</DialogTitle>
          <DialogContent>
            <DialogContentText></DialogContentText>
            <TextField
              autoFocus
              id="name"
              label="Username"
              type="username"
              defaultValue={this.props.username}
              fullWidth
              onChange={this.onChange}
            />
          </DialogContent>
          <DialogActions>
            <IconButton
              aria-label="Save"
              color="primary"
              size="small"
              onClick={this.onSave}
            >
              <CheckIcon fontSize="inherit" />
            </IconButton>
            <IconButton
              aria-label="Close"
              color="primary"
              size="small"
              onClick={this.handleClose}
            >
              <CrossIcon fontSize="inherit" />
            </IconButton>
          </DialogActions>
        </Dialog>
      </>
    );
  }
}

export default ConfigurationDialog;
