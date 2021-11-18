/* eslint-disable react/jsx-key */
import React from 'react';
import { connect } from 'react-redux';

class RankingList extends React.Component {
  constructor() {
    super();
    this.createList = this.createList.bind(this);
  }

  createList() {
    const ls = JSON.parse(localStorage.getItem('ranking'));
    // ls.forEach((obj) => )
    // ls.sort((obj1, obj2) => obj2.score - obj1.score);
    return ls.map((obj, index) => (
      <div className="container-ranking">
        <div className="ranking-imagem" key={ obj.score } score={ obj.score }>
          <img
            className="ranking-img"
            key={ obj.picture }
            src={ obj.picture }
            alt="imagem do player"
          />

          <div
            className="ranking-text"
            data-testid={ `player-name-${index}` }
            key={ obj.name }
          >
            { obj.name }
          </div>
          <div
            className="ranking-text ranking-text-name"
            data-testid={ `player-score-${index}` }
            key={ obj.score }
          >
            { obj.score }
          </div>
        </div>
      </div>
    )).sort((obj1, obj2) => obj2.key - obj1.key);
  }

  render() {
    return (
      <section>
        <h1 data-testid="ranking-title">Ranking</h1>
        { this.createList() }
      </section>
    );
  }
}

export default connect()(RankingList);
