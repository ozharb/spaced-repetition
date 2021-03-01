import React, { Component } from 'react'
import config from '../../config'
import TokenService from '../../services/token-service'
import { Link } from 'react-router-dom'
import './DashboardRoute.css'
class DashboardRoute extends Component {
  state = {
    language: {},
    words: []
  }
  componentDidMount() {

    fetch(`${config.REACT_APP_API_BASE}/language`, {
      headers: { 'authorization': `bearer ${TokenService.getAuthToken()}`, }
    })
      .then((langRes) => {
        if (!langRes.ok)
          return langRes.json().then(e => Promise.reject(e))
        return langRes.json()

      })
      .then((lang) => {
        this.setState({ language: lang.language, words: lang.words })
      })
      .catch(error => {
        console.error({ error })
      })
  }


  render() {

    const { language = {}, words = [] } = this.state
    return (
      <section className = "dashboard">
        <h2>{language.name}
          <br />
        Total correct answers: {language.total_score}
          <br />
          <Link to='/learn'>
            Start practicing
        </Link>
        </h2>
        <h3>Words to practice</h3>
        <ol>
          {words.map((word, i) =>

            <li key={word.id}>
              <h4>
                {word.original}
              </h4>
              <span className="word-count-li">
        correct answer count: {word.correct_count}
              <br />
        incorrect answer count: {word.incorrect_count}
        </span>
            </li>

          )}
        </ol>
      </section>
    );
  }
}

export default DashboardRoute
