import React, { Component } from 'react'
import TokenService from '../../services/token-service'
import config from '../../config'
import { Input, Label } from '../../components/Form/Form'
import Button from '../../components/Button/Button'

import './LearningRoute.css'
class LearningRoute extends Component {
  state = {
    word: {}
  }
  componentDidMount() {

    fetch(`${config.API_ENDPOINT}/language/head`, {
      headers: { 'authorization': `bearer ${TokenService.getAuthToken()}`, }
    })
      .then((langRes) => {
        if (!langRes.ok)
          return langRes.json().then(e => Promise.reject(e))
        return langRes.json()

      })
      .then((head) => {
        this.setState({ word: head })
      })
      .catch(error => {
        console.error({ error })
      })
  }

  handleGuess = e =>{
    console.log('guessed')
  }
  
  render() {
    const {word} = this.state
    return (
      <section className='LearningRoute'>
       <h2>Translate the word:</h2>
   <span className="next-word">{word.nextWord}</span>
       <p>Your total score is: {word.totalScore}</p>
       <form onSubmit={this.handleGuess}>
       <div className="registration-label-input">
          <Label htmlFor='learn-guess-input'>
          What's the translation for this word?
          </Label>
          <br/>
          <Input
            ref={this.firstInput}
            type='text'
            id='learn-guess-input'
            name='naguessme'
            required
          />
        </div>
        <Button type='submit' className='guess-btn' onClick={this.handleGuess}>
        Submit your answer
          </Button>
       </form>
       <p>You have answered this word correctly {word.wordCorrectCount} times.</p>
       <p>You have answered this word incorrectly {word.wordIncorrectCount} times.</p>
      </section>
    );
  }
}

export default LearningRoute
