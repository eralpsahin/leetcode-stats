import React from 'react';
import ProblemCell from './ProblemCell';
class ProblemTable extends React.Component {
  createTable = recents => {
    let table = [];

    // Outer loop to create parent
    // for (let i = 0; i < recent; i++) {
    //   table.push(<ProblemCell key={i} />);
    // }

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

  render() {
    return <>{this.createTable(this.props.recent)}</>;
  }
}
export default ProblemTable;
