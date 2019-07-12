import React from 'react';
import Box from '@material-ui/core/Box';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CheckIcon from '@material-ui/icons/Check';
import CrossIcon from '@material-ui/icons/Close';
import Typography from '@material-ui/core/Typography';
import ReactTooltip from 'react-tooltip';
import { shell } from 'electron';

class ProblemCell extends React.Component {
  render() {
    const dataTip = `<div class="flex-container">
                <div class="tooltip-title">${this.props.title}</div>
                <div class="tooltip-lang">${this.props.language}
                </br></br>${this.props.time}</div>
              </div>`;
    return (
      <>
        <Box
          my={0.3}
          onClick={() => {
            shell.openExternal(`https://leetcode.com${this.props.url}`);
          }}
        >
          <Card
            className="problem-card"
            data-tip={dataTip}
            data-for="problem-tooltip"
          >
            <CardContent style={{ padding: '2px' }}>
              <Box display="flex" flexDirection="row">
                <Box width="50%" flexGrow={1}>
                  <Typography style={{ fontSize: '12px' }} noWrap={true}>
                    {this.props.title}
                  </Typography>
                </Box>
                <Box mt={0.2}>
                  {this.props.status ? (
                    <CheckIcon style={{ fontSize: '16px' }} color="secondary" />
                  ) : (
                    <CrossIcon style={{ fontSize: '16px' }} color="error" />
                  )}
                </Box>
              </Box>
            </CardContent>
          </Card>
        </Box>
        <ReactTooltip
          id="problem-tooltip"
          getContent={value => {
            return value;
          }}
          multiline={true}
          html={true}
          place="top"
        />
      </>
    );
  }
}

export default ProblemCell;
