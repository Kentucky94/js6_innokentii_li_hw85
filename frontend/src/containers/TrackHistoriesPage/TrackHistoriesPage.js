import React, {Component} from 'react';
import {fetchTrackHistories} from "../../store/actions";
import {connect} from "react-redux";
import TrackHistoryBlock from "../../components/TrackHistoryBlock/TrackHistoryBlock";

class TrackHistoriesPage extends Component {
  async componentDidMount() {
    await this.props.fetchHistories();
  }

  render() {
    const histories = this.props.histories.map(history =>
      <TrackHistoryBlock
        trackName={history.track.name}
        datetime={history.datetime}
      />
    );

    return (
      <div>
        {histories}
      </div>
    );
  }
}

const mapStateToProps = state => ({
  histories: state.mainReducer.trackHistories,
});

const mapDispatchToProps = dispatch => ({
  fetchHistories: () => dispatch(fetchTrackHistories()),
});

export default connect(mapStateToProps, mapDispatchToProps)(TrackHistoriesPage);