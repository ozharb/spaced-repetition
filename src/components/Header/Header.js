import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import TokenService from '../../services/token-service'
import UserContext from '../../contexts/UserContext'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import './Header.css'

class Header extends Component {
  static contextType = UserContext

  handleLogoutClick = () => {
    this.context.processLogout()
  }

  renderLogoutLink() {
    return (
      <div >
        <nav>
          <div className='logout'>
            <Link
              onClick={this.handleLogoutClick}
              to='/login'>
              Logout
          </Link>
          </div>

        </nav>
      </div>
    )
  }

  renderLoginLink() {
    return (
      <nav className='nav-login'>
        <div className='login'>
        <Link to='/login'>Login</Link>
        </div>
        <div className='sign-up'>
        <Link to='/register'>Sign up</Link>
        </div>
      </nav>
    )
  }

  render() {
    return (
      <>
      <header >
        <Link to='/'>
          <h1 className='logo'>
            <i className="fas fa-meteor">
              <FontAwesomeIcon className='logo' icon='meteor' />
            </i>
            Spaced repetition
        </h1>

        </Link>

        {TokenService.hasAuthToken()
          ? this.renderLogoutLink()
          : this.renderLoginLink()}


      </header>
    
           
        <div className='user-img-name'>
          <Link to='/'>
            <span>
            {TokenService.hasAuthToken()
          ? 
              <img src={`https://picsum.photos/seed/${this.context.user.name}/400`} className="responsive" alt="user-profile" />
          :
              <i className="fas fa-user-astronaut">
        <FontAwesomeIcon className='responsive' icon='user-astronaut' />
      </i>}
              <br />
              {this.context.user.name}
            </span>
          </Link>
        </div>
  
        </>
    );
  }
}

export default Header
