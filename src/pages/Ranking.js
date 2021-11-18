import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import RankingList from '../components/RankingList';
import { resetScore } from '../redux/actions';
import '../Styles/Ranking.css';

class Ranking extends React.Component {
  render() {
    const { reset } = this.props;
    return (
      <section>
        <RankingList />
        <Link
          className="ranking-bnt-home"
          to="/"
          data-testid="btn-go-home"
          onClick={ reset }
        >
          HOME
        </Link>
      </section>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  reset: () => dispatch(resetScore()),
});

Ranking.propTypes = {
  reset: PropTypes.func.isRequired,
};

export default connect(null, mapDispatchToProps)(Ranking);
