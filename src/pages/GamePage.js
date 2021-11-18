import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Header from '../components/Header';
import { changeDisabled, fetchQuestionsThunk, setPoints } from '../redux/actions/index';
import GameTrivia from '../components/GameTrivia';
import '../Styles/Buttons.css';
import '../Styles/GamePage.css';

class GamePage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      btnShouldExist: false,
      index: 0,
      seconds: 30,
    };

    this.fetchThunk = this.fetchThunk.bind(this);
    this.handleNextQuestion = this.handleNextQuestion.bind(this);
    this.disableBtn = this.disableBtn.bind(this);
    this.handleclick = this.handleclick.bind(this);
    this.calculationOfPoints = this.calculationOfPoints.bind(this);
    this.cronometerInterval = this.cronometerInterval.bind(this);
    this.disabledButtons = this.disabledButtons.bind(this);
    // this.createBtnNext = this.createBtnNext.bind(this);
  }

  componentDidMount() {
    this.fetchThunk();
    const FIVE_SECONDS = 5000;
    setTimeout(() => {
      this.cronometerInterval();
    }, FIVE_SECONDS);
  }

  componentDidUpdate() {
    this.disabledButtons();
  }

  cronometerInterval() {
    const { seconds } = this.state;
    const ONE_SECOND = 1000;
    this.interval = setInterval(() => {
      if (seconds === 0) {
        this.setState({ seconds: 30 });
      } else {
        this.setState((prevState) => ({ seconds: prevState.seconds - 1 }));
      }
    }, ONE_SECOND);
  }

  disabledButtons() {
    const { change } = this.props;
    const { seconds } = this.state;
    const MIN_SECONDS = 0;
    if (seconds === MIN_SECONDS) {
      clearInterval(this.interval);
      const disabledButton = true;
      change(disabledButton);
      this.setState({
        seconds: 30,
        btnShouldExist: true,
      });
    }
  }

  calculationOfPoints(timer, dificuldade) {
    const { setPointsClink } = this.props;
    const assertions = 1;
    const TEN = 10;
    const objD = {
      hard: 3,
      medium: 2,
      easy: 1,
    };
    const score = TEN + (timer * objD[dificuldade]);
    console.log(score);
    console.log(objD[dificuldade]);
    setPointsClink({ score, assertions });
  }

  handleclick(event) {
    const { seconds, index } = this.state;
    const { questions } = this.props;
    if (event.target.id === 'correct') {
      // Esperando os dados do temporizado para calcular corretamente.
      const NUMBER = seconds;
      const dificult = questions[index].difficulty;
      this.calculationOfPoints(NUMBER, dificult);
    }
    const correct = document.querySelector('#correct');
    correct.classList.add('buttonCorrect');
    const incorrect = document.querySelectorAll('#incorrect');
    incorrect.forEach((e) => {
      e.classList.add('buttonIncorrect');
      e.disabled = true;
    });
    clearInterval(this.interval);
    this.setState({
      btnShouldExist: true,
    });
  }

  disableBtn() {
    this.setState({
      btnShouldExist: false,
    });
    const correct = document.querySelector('#correct');
    correct.classList.remove('buttonCorrect');
    const incorrect = document.querySelectorAll('#incorrect');
    incorrect.forEach((e) => {
      e.classList.remove('buttonIncorrect');
      e.disabled = false;
    });
  }

  async fetchThunk() {
    const { getQuestionsThunk } = this.props;
    await getQuestionsThunk();
  }

  handleNextQuestion() {
    const { change, history } = this.props;
    let { disabledButton } = this.props;
    const { index } = this.state;
    const FOUR = 4;
    if (index === FOUR) {
      this.setState({ index: 4 });
      history.push('/feedback');
    } else {
      this.setState({ index: index + 1 });
    }
    disabledButton = false;
    change(disabledButton);
    this.setState({ seconds: 30 });
    this.cronometerInterval();
  }

  render() {
    const { index, btnShouldExist, seconds } = this.state;
    const { questions, loading } = this.props;
    if (loading === true) return <h1>Carregando as perguntas</h1>;
    return (
      <div className="container-main">
        <Header />
        <GameTrivia questions={ questions[index] } handleclick={ this.handleclick } />
        <section className="container-timer">
          <p>{seconds}</p>
        </section>
        <button
          type="button"
          onClick={ () => {
            this.handleNextQuestion();
            this.disableBtn();
          } }
          id="next"
          className={ btnShouldExist ? 'bnt-next-quest' : 'nextbtn' }
          data-testid="btn-next"
        >
          Próxima Pergunta
        </button>
      </div>

    );
  }
}

GamePage.propTypes = {
  getQuestionsThunk: PropTypes.func.isRequired,
  questions: PropTypes.shape({
    difficulty: PropTypes.string,
  }).isRequired,
  loading: PropTypes.bool.isRequired,
  change: PropTypes.func.isRequired,
  disabledButton: PropTypes.bool.isRequired,
  history: PropTypes.arrayOf({}).isRequired,
  setPointsClink: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  questions: state.game.questions,
  loading: state.game.isLoading,
  token: state.game.token,
  disabledButton: state.game.disabledButton,
});

const mapDispatchToProps = (dispatch) => ({
  getQuestionsThunk: () => dispatch(fetchQuestionsThunk()),
  change: (payload) => dispatch(changeDisabled(payload)),
  setPointsClink: (payload) => dispatch(setPoints(payload)),
});

export default connect(mapStateToProps, mapDispatchToProps)(GamePage);
