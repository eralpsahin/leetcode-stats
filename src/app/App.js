import React, { useState, useEffect } from 'react';
import Retrieve from './Retrieve';
import Box from '@material-ui/core/Box';
import ProfileBar from './ProfileBar';
import RefreshButton from './RefreshButton';
import ConfigurationDialog from './ConfigurationDialog';
import Heatmap from './Heatmap';
import ProblemButton from './ProblemButton';
import ProblemTable from './ProblemTable';
import Store from './Store';

export default function App() {
  const store = new Store();
  const [username, setUsername] = useState(store.get('username'));
  const [heatmap, setHeatmap] = useState(null);
  const [profile, setProfile] = useState({
    correct: 0,
    wrong: 1,
    solved: 0,
    total: 0,
    recent: []
  });
  const [retrieving, setRetrieving] = useState(true);

  useEffect(() => {
    // Refresh Data on username change
    if (username === '') {
      setRetrieving(false);
    } else {
      setRetrieving(true);
      getProfile(username);
      getHeatmap(username);
    }
  }, [username]);

  useEffect(() => {
    if (profile.total) {
      // Stay as retrieving at first render
      setRetrieving(false);
    }
  }, [profile]);

  const getProfile = async username => {
    let res = await Retrieve.getProfileInfo(username);
    setProfile(res);
  };
  const getHeatmap = async username => {
    let res = await Retrieve.getHeatmap(username);
    setHeatmap(res);
  };

  const handleRefresh = () => {
    setRetrieving(true);
    getProfile(username);
    getHeatmap(username);
  };

  const handleConfiguration = username => {
    setUsername(username);
    store.set('username', username);
  };
  return (
    <Box width="100%" height="100%">
      <ProfileBar profile={profile} username={username}></ProfileBar>
      <Box display="flex" flexDirection="row-reverse" height={90}>
        <Box flexShrink={1} pr={0.8} mt={-2}>
          <Heatmap heatmap={heatmap || []} />
        </Box>
        <Box width="100%" pl={0.5} pt={1}>
          <ProblemButton solved={profile.solved} total={profile.total} />
        </Box>
      </Box>
      <Box
        mx="auto"
        css={{ maxWidth: 192.2, height: 132.53 }}
        mt={-2.5}
        className="submissions"
      >
        {profile.recent.length ? (
          <span style={{ fontSize: '13px' }}>Submissions:</span>
        ) : (
          ''
        )}
        <ProblemTable recent={profile.recent} />
      </Box>
      <Box
        display="flex"
        flexWrap="wrap"
        alignContent="flex-end"
        justifyContent="flex-end"
        css={
          !retrieving
            ? { maxWidth: 205, height: 52 }
            : { maxWidth: 202, height: 52 }
        }
      >
        <Box width="100%">
          <Box display="flex">
            <Box flexGrow={1}>
              <ConfigurationDialog
                save={handleConfiguration}
                username={username}
              ></ConfigurationDialog>
            </Box>
            <Box>
              <RefreshButton
                retrieving={retrieving}
                handleRefresh={handleRefresh}
              ></RefreshButton>
            </Box>
          </Box>
        </Box>
      </Box>
    </Box>
  );
}
