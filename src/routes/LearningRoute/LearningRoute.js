import React, { Component } from 'react'
import TokenService from '../../services/token-service'
import config from '../../config'
import { Input, Label } from '../../components/Form/Form'
import Button from '../../components/Button/Button'
import FeedbackRoute from '../FeedbackRoute/FeedbackRoute'
import './LearningRoute.css'

class LearningRoute extends Component {
  state = {
    word: {},
    guess: { value: '', touched: false },
    feedback:{},
    displayFeedback: false
  }
  setGuess = guess => {
    this.setState({ guess: { value: guess, touched: true } }); // Switch touched to true
};
setFeedback = feedback => {
  this.setState({ feedback: feedback }); // Switch touched to true
};
validateGuess = () => {
   return (!this.state.guess.value.length > 0);

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

 
  handleGuess = e => {
    e.preventDefault()
    const newGuess = {

      guess: this.state.guess.value
    }
    console.log(newGuess)
    fetch(`${config.API_ENDPOINT}/language/guess`,
        {
            method: 'POST',
            headers: {
                'content-type': 'application/json',
                'authorization': `bearer ${TokenService.getAuthToken()}`,
            },
            body: JSON.stringify(newGuess)
        })
        .then(res => {
            if (!res.ok) {
                return res.json().then(e => Promise.reject(e))
            }
            return res.json()
        })
        .then(data => {

      this.setFeedback(data)
 
    this.setState({displayFeedback: true})
        })

        .catch(error => {
            console.error({ error })
        })

}
  
  render() {
    
    const {word} = this.state
   const displayFeedback =  <FeedbackRoute word={word} feedback={this.state.feedback} guess={this.state.guess.value} history={this.props.history}/>
    return (
      <section className='LearningRoute'>
      {this.state.displayFeedback ? displayFeedback :
<>
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
            type='text'
            value={this.state.guess.value}
            onChange={e => this.setGuess(e.target.value)}
            id='learn-guess-input'
            name='learn-guess'
            autoComplete="off"
            required
          />
        </div>
        <Button type='submit' className='guess-btn' 
        disabled={this.validateGuess()}
        onClick={this.handleGuess}>
        Submit your answer
          </Button>
       </form>
       <p>You have answered this word correctly {word.wordCorrectCount} times.</p>
       <p>You have answered this word incorrectly {word.wordIncorrectCount} times.</p>
       </>
      }
      </section>
    );
  }
}

export default LearningRoute
