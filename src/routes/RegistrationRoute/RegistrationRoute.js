import React, { Component } from 'react'
import RegistrationForm from '../../components/RegistrationForm/RegistrationForm'
import AuthApiService from '../../services/auth-api-service'
import UserContext from '../../contexts/UserContext'

class RegistrationRoute extends Component {
  static defaultProps = {
    location: {},
    history: {
      push: () => {},
    },
  }
  static contextType = UserContext
 handleLoginSuccess = () => {
    const { location, history } = this.props
    const destination = (location.state || {}).from || '/'
    history.push(destination)
  }
  handleRegistrationSuccess = (userInfo) => {
 
    AuthApiService.postLogin(
      userInfo
    )
      .then(res => {
        this.context.processLogin(res.authToken)
        this.handleLoginSuccess()
      })
      .catch(res => {
        this.setState({ error: res.error })
      })
    
  }


 

  render() {
    return (
      <section  className= 'registration-route'>
        <p>
          Practice learning French with the spaced repetition learning technique.
        </p>
        <fieldset>
        <legend><h2>Sign up</h2></legend>
        <RegistrationForm
          onRegistrationSuccess={this.handleRegistrationSuccess}

        />
        </fieldset>
      </section>
    );
  }
}

export default RegistrationRoute
