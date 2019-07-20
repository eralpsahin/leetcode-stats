import React from 'react';
import ProblemCell from './ProblemCell';

export default function ProblemTable(props) {
  const createTable = recents => {
    let table = [];

    recents.forEach((recent, index) => {
      table.push(
        <ProblemCell
          key={index}
          title={recent.title}
          status={recent.status}
          time={recent.time}
          language={recent.language}
          url={recent.url}
        />
      );
    });

    return table;
  };
  return <React.Fragment>{createTable(props.recent)}</React.Fragment>;
}
