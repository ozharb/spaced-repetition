import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { Input, Required, Label } from '../Form/Form'
import AuthApiService from '../../services/auth-api-service'
import Button from '../Button/Button'
import './RegistrationForm.css'

class RegistrationForm extends Component {
  static defaultProps = {
    onRegistrationSuccess: () => { }
  }

  state = { error: null }

  firstInput = React.createRef()

  handleSubmit = ev => {
    ev.preventDefault()
    const { name, username, password } = ev.target
    const userInfo = { username: username.value, password: password.value } 
    AuthApiService.postUser({
      name: name.value,
      username: username.value,
      password: password.value,
    })
   
      .then(user => {
        name.value = ''
        username.value = ''
        password.value = ''
        this.props.onRegistrationSuccess(userInfo)
      })
      .catch(res => {
        this.setState({ error: res.error })
      })
  }

  componentDidMount() {
    this.firstInput.current.focus()
  }

  render() {
    const { error } = this.state
    return (
      <section className='registration-form'>
      <form
        onSubmit={this.handleSubmit}
      >
        <div role='alert' className='registration-alert'>
          {error && <p>{error}</p>}
        </div>
        <div className="registration-label-input">
          <Label htmlFor='registration-name-input'>
            Enter your name:<Required />
          </Label>
          <br/>
          <Input
            ref={this.firstInput}
            id='registration-name-input'
            name='name'
            required
          />
        </div>
        <div className="registration-label-input">
          <Label htmlFor='registration-username-input'>
            Choose a username:<Required />
          </Label>
          <br/>
          <Input
            id='registration-username-input'
            name='username'
            required
          />
        </div>
        <div className="registration-label-input">
          <Label htmlFor='registration-password-input'>
            Choose a password:<Required />
          </Label>
          <br/>
          <Input
            id='registration-password-input'
            name='password'
            type='password'
            required
          />
        </div>
          
          <Button type='submit' className='registration-btn'>
            Sign up
          </Button>
       
          {' '}
          <Link to='/login'>Already have an account?</Link>
     
      </form>
      </section>
    )
  }
}

export default RegistrationForm
