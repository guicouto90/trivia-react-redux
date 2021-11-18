import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import { getGravatar } from '../services/Api';
import { resetScore } from '../redux/actions';
import '../Styles/Freedback.css';

class Feedback extends React.Component {
  constructor() {
    super();
    this.handleMenssage = this.handleMenssage.bind(this);
    this.handleClick = this.handleClick.bind(this);
  }

  handleMenssage() {
    const { hits } = this.props;
    if (hits <= 2) {
      console.log(hits);
      return <>Podia ser melhor...</>;
    }
    return <>Mandou bem!</>;
  }

  handleClick() {
    const { player, email } = this.props;
    const imagem = getGravatar(email);
    const ls = JSON.parse(localStorage.getItem('ranking'));
    console.log(ls);
    if (ls === null) {
      localStorage.setItem('ranking', JSON.stringify([{
        picture: imagem,
        name: player.name,
        score: player.score,
      }]));
    } else {
      const lsBOOL = ls.find((obj) => obj.name === player.name);
      if (!lsBOOL) {
        ls.push({
          picture: imagem,
          name: player.name,
          score: player.score,
        });
        localStorage.setItem('ranking', JSON.stringify(ls));
      } else {
        lsBOOL.score = player.score;
        localStorage.setItem('ranking', JSON.stringify(ls));
      }
    }
  }

  render() {
    const { totalScore, hits, reset } = this.props;
    return (
      <div className="container-freedback">
        <Header />
        <p>
          <span data-testid="feedback-text">
            { this.handleMenssage() }
          </span>
        </p>

        <p>
          Total de Pontos:
          <span data-testid="feedback-total-score">
            { totalScore }
          </span>
        </p>
        <p>
          Total de acertos:
          <span data-testid="feedback-total-question">
            { hits }
          </span>
        </p>

        <section>
          <Link
            className="freedback-bnt"
            to="/"
            type="button"
            data-testid="btn-play-again"
            onClick={ reset }
          >
            Jogar novamente
          </Link>
          <Link
            className="freedback-bnt"
            to="/ranking"
            type="button"
            data-testid="btn-ranking"
            onClick={ this.handleClick }
          >
            Ver Ranking
          </Link>
        </section>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  hits: state.game.player.assertions,
  totalScore: state.game.player.score,
  player: state.game.player,
  email: state.user.email,
});

const mapDispatchToProps = (dispatch) => ({
  reset: () => dispatch(resetScore()),
});

Feedback.propTypes = {
  hits: PropTypes.number.isRequired,
  totalScore: PropTypes.number.isRequired,
  player: PropTypes.shape({
    name: PropTypes.string,
    score: PropTypes.number,
  }).isRequired,
  email: PropTypes.string.isRequired,
  reset: PropTypes.func.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(Feedback);
