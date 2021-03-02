import React, { Component } from 'react'
import RegistrationForm from '../../components/RegistrationForm/RegistrationForm'

class RegistrationRoute extends Component {
  static defaultProps = {
    history: {
      push: () => {},
    },
  }

  handleRegistrationSuccess = () => {
    const { history } = this.props
    history.push('/login')
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
