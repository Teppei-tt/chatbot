import React from 'react'
import defaultDataset from "./dataset";
import './assets/styles/style.css'
import {AnswersList, Chats} from "./components/index"
import FromDialog from './components/Forms/FormDialog';
// import { ThreeSixty } from '@material-ui/icons';

export default class App extends React.Component {
  // コンストラクターで初期化
  constructor(props) {
    super(props);
    this.state = {
      answers: [],
      chats: [],
      currentId: "init",
      dataset: defaultDataset,
      open: false
    }
    this.selectAnswer = this.selectAnswer.bind(this)
    this.handleClickOpen = this.handleClickOpen.bind(this) 
    this.handleClose = this.handleClose.bind(this) 
  }
// Function //
displayNextQuestion = (nextQuestionId) => {
  const chats = this.state.chats
  chats.push({
    text: this.state.dataset[nextQuestionId].question,
    type: 'question'
  })

  this.setState( {
    answers: this.state.dataset[nextQuestionId].answers,
    chats: chats,
    currentId: nextQuestionId
  })
}

selectAnswer = (selectedAnswer, nextQuestionId) => {
  switch(true) {
    case (nextQuestionId === 'init'):
      setTimeout(() => this.displayNextQuestion (nextQuestionId), 600);
      break;

    case (nextQuestionId === 'contact'):
      this.handleClickOpen();
      break;

    case (/^https:*/.test(nextQuestionId)):
      const a = document.createElement( 'a' );
      a.href  = nextQuestionId;
      a.target = '_blank';
      a.click();
      break
    default:
      const chats = this.state.chats;
      chats.push({
        text: selectedAnswer,
        type: 'answer'
      })

      this.setState( {
          chats: chats
      })

      setTimeout(() => this.displayNextQuestion(nextQuestionId), 600);
      break;
  }
}

handleClickOpen = () => {
  this.setState({ open: true }) ;
};

handleClose = () => {
  this.setState({ open: false }) ;
};

 componentDidMount() {
   const initAnswer = "";
   this.selectAnswer(initAnswer, this.state.currentId)
 }

 componentDidUpdate(prevProps, prevState, snapshot) {
   const scrollArea = document.getElementById('scroll-area')
   if( scrollArea ) {
     scrollArea.scrollTop = scrollArea.scrollHeight
   }
 }

  render() {
    return (
     <section className="c-section">
       <div className="c-box">
        <Chats chats={this.state.chats} />
        <AnswersList answers={this.state.answers} select={this.selectAnswer} />
        <FromDialog open={this.state.open} handleClose={this.handleClose} />
       </div>
     </section>
    );
  }
}