import React from 'react';
import MaterialTable from 'material-table';
import Box from '@material-ui/core/Box';

const Component1 = () => {
  return (
    <Box width="80%" mx="auto" m={2}>
      <MaterialTable
        options={{
          paging: false
        }}
        columns={[
          { title: 'Name', field: 'name' },
          { title: 'Surname', field: 'surname' },
          { title: 'Birthday', field: 'birthYear', type: 'numeric' }
        ]}
        data={[
          { name: 'Ed', surname: 'Chambers', birthYear: 1983 },
          { name: 'Prof Damon D.', surname: 'Duck', birthYear: 1910 },
          { name: 'Michael', surname: 'Scarn', birthYear: 1964 }
        ]}
        title="Idols"
      />
    </Box>
  );
};

export default Component1;
