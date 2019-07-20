import React, { useState, useEffect } from 'react';
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

export default function ConfigurationDialog(props) {
  const dialog = useDialog(false);
  const handleSave = () => {
    props.save(username.value);
    dialog.setOpen(false);
  };
  const username = useUsername(props.username, handleSave);

  return (
    <React.Fragment>
      <IconButton
        aria-label="Delete"
        color="secondary"
        size="small"
        onClick={dialog.handleOpen}
      >
        <SettingsIcon fontSize="inherit" />
      </IconButton>
      <Dialog
        fullScreen
        open={dialog.open}
        onClose={dialog.handleClose}
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
            fullWidth
            value={username.value}
            onChange={username.onChange}
            onKeyUp={username.onKeyUp}
          />
        </DialogContent>
        <DialogActions>
          {username.saveEnabled && (
            <IconButton
              aria-label="Save"
              color="primary"
              size="small"
              onClick={handleSave}
            >
              <CheckIcon fontSize="inherit" />
            </IconButton>
          )}
          <IconButton
            aria-label="Close"
            color="primary"
            size="small"
            onClick={dialog.handleClose}
          >
            <CrossIcon fontSize="inherit" />
          </IconButton>
        </DialogActions>
      </Dialog>
    </React.Fragment>
  );
}

function useUsername(savedUsername, onEnterPress) {
  const [value, setValue] = useState(savedUsername);
  const [saveEnabled, setSaveEnabled] = useState(
    value !== savedUsername && value.length !== 0
  );
  useEffect(() => {
    setSaveEnabled(value !== savedUsername && value.length !== 0);
  }, [value, setValue]);

  const handleChange = e => setValue(e.target.value);
  const handleKeyPress = e => {
    if (e.keyCode == 13 && saveEnabled) {
      setSaveEnabled(false);
      onEnterPress();
    }
  };
  return {
    value,
    onChange: handleChange,
    onKeyUp: handleKeyPress,
    saveEnabled
  };
}

function useDialog(initialVal) {
  const [open, setOpen] = useState(initialVal);
  const handleClose = () => setOpen(false);
  const handleOpen = () => setOpen(true);
  return {
    open,
    handleClose,
    handleOpen,
    setOpen
  };
}
