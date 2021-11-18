import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import '../Styles/Header.css';

class Header extends React.Component {
  render() {
    const { nome, picture, score } = this.props;
    return (
      <header>
        <section className="container-avatar">
          <section className="avatar-imagem">
            <img
              className="avatar-img "
              src={ picture }
              alt="Imagem do usuario"
              data-testid="header-profile-picture"
            />
          </section>
          <section className="avatar-text">
            <span>Nome:</span>
            <span data-testid="header-player-name">{nome}</span>
          </section>

          <section className="avatar-text avatar-text-name">
            <span>Placar:</span>
            <span data-testid="header-score">{score}</span>
          </section>
        </section>
      </header>
    );
  }
}

const mapStateToProps = (state) => ({
  nome: state.user.name,
  picture: state.user.picture,
  score: state.user.score,
});

Header.propTypes = {
  nome: PropTypes.string.isRequired,
  picture: PropTypes.string.isRequired,
  score: PropTypes.number.isRequired,
};

export default connect(mapStateToProps)(Header);
