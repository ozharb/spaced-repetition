import React, { Component } from 'react'
import TokenService from '../../services/token-service'
import config from '../../config'
import Button from '../../components/Button/Button'

import './FeedbackRoute.css'
class FeedbackRoute extends Component {
  state = {
    newWord: {},

  }



  componentDidMount() {

    fetch(`${config.REACT_APP_API_BASE}/language/head`, {
      headers: { 'authorization': `bearer ${TokenService.getAuthToken()}`, }
    })
      .then((langRes) => {
        if (!langRes.ok)
          return langRes.json().then(e => Promise.reject(e))
        return langRes.json()

      })
      .then((head) => {
        this.setState({ newWord: head })
      })

      .catch(error => {
        console.error({ error })
      })
  }
  handleNext = () => {
    this.props.history.go(0)
  }
  render() {
    const { word, feedback, guess } = this.props
    return (
      <main className='Feedback'>
        <div className='DisplayScore'>
          <p >Your total score is: {this.state.newWord.totalScore}</p>
        </div>
        <h2>{feedback.isCorrect ? `You were correct! :D` : `Good try, but not quite right :(`}</h2>

        <div className="DisplayFeedback">
          <p>The correct translation for {word.nextWord} was <span className='feedback-answer'>{feedback.answer}</span> and you chose {guess}!</p>
          <br />
        </div>
        <Button className='next-btn' onClick={this.handleNext}>
          Try another word!
          </Button>
        <br />
        <p>Next word: <span className="following-word">{feedback.nextWord}</span></p>
        <p>You have answered this word correctly {feedback.wordCorrectCount} times.</p>
        <p>You have answered this word incorrectly {feedback.wordIncorrectCount} times.</p>
      </main>
    );
  }
}

export default FeedbackRoute
