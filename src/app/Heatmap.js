import React from 'react';
import Box from '@material-ui/core/Box';
import CalendarHeatmap from 'react-calendar-heatmap';
import ReactTooltip from 'react-tooltip';
import Retrieve from './Retrieve';

class Heatmap extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  componentWillMount() {}
  render() {
    return (
      <>
        <Box style={{ width: '80px' }} pr={0.8}>
          <CalendarHeatmap
            startDate={new Date(Date.now() - Retrieve.PREV_LIMIT)}
            endDate={new Date(Date.now() + Retrieve.NEXT_LIMIT)}
            values={this.props.heatmap}
            classForValue={value => {
              if (!value) {
                return 'color-empty';
              }
              if (value.count >= 30) {
                return 'color-github-30';
              }
              if (value.count >= 20) {
                return 'color-github-20';
              }
              if (value.count >= 10) {
                return 'color-github-10';
              }
              if (value.count >= 1) {
                return 'color-github-1';
              }
            }}
            showWeekdayLabels={true}
            weekdayLabels={['S', 'M ', 'T', 'W', 'T', 'F ', 'S']}
            tooltipDataAttrs={value => {
              if (value.date === null) {
                return {
                  'data-tip': ''
                };
              }
              return {
                'data-tip': `${
                  value.count
                } submissions on</br> ${Retrieve.dateToString(value.date)}`
              };
            }}
          />
        </Box>
        <ReactTooltip
          className="minimal-tooltip"
          getContent={value => {
            return value;
          }}
          multiline={true}
          html={true}
        />
      </>
    );
  }
}

export default Heatmap;
