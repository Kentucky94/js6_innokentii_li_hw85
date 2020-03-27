import React, {Component} from 'react';
import {fetchTrackHistories} from "../../store/actions/trackHistoriesActions";
import {connect} from "react-redux";
import TrackHistoryBlock from "../../components/TrackHistoryBlock/TrackHistoryBlock";

class TrackHistoriesPage extends Component {
  async componentDidMount() {
    await this.props.fetchHistories();
  }

  render() {
    const histories = this.props.histories.map(history =>
      <TrackHistoryBlock
        key={history._id}
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
  histories: state.trackHistories.trackHistories,
});

const mapDispatchToProps = dispatch => ({
  fetchHistories: () => dispatch(fetchTrackHistories()),
});

export default connect(mapStateToProps, mapDispatchToProps)(TrackHistoriesPage);