import React from 'react';
import Avatar from '@material-ui/core/Avatar';
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
import PieChart from 'react-minimal-pie-chart';
import { shell } from 'electron';
import ReactTooltip from 'react-tooltip';

export default function ProfileBar(props) {
  const handleProfileClick = () => {
    shell.openExternal(`https://leetcode.com/${props.username}`);
  };

  let wrong = props.profile.wrong;
  wrong = wrong === 0 ? 1 : wrong; // Prevent division by 0
  const ratio =
    ((props.profile.correct / (wrong + props.profile.correct)) * 100).toFixed(
      1
    ) + '%';

  return (
    <Box display="flex" flexDirection="row">
      <Box flexGrow={1} display="flex">
        <Box
          bgcolor="transparent"
          p={0.5}
          onClick={handleProfileClick}
          style={{ cursor: 'pointer' }}
        >
          <Avatar alt="Profile Avatar" src={props.profile.avatar} />
        </Box>
        <Box mt={1.5} maxWidth={110}>
          <Typography noWrap={true}> {props.profile.realname}</Typography>
        </Box>
      </Box>
      <Box
        width={20}
        p={0.5}
        justifyContent="center"
        data-tip={`Ratio: ${props.profile.correct} / ${props.profile.wrong +
          props.profile.correct}`}
        data-for="pie-tooltip"
      >
        <PieChart
          className="hover-scale"
          data={[
            {
              value: props.profile.correct || 0,
              color: '#4caf50'
            }, // Green for correct
            {
              value: wrong || 0,
              color: '#b71c1c'
            } // Red for wrong
          ]}
        />
        <Box ml={-0.5}>
          <Typography variant="caption">{ratio}</Typography>
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
