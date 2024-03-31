import {Component} from 'react'
import Cookies from 'js-cookie'
import {Redirect} from 'react-router-dom'
import AppTheme from '../../context/Theme'
import {BgContainer, LoginCard} from './styledComponents'
import './index.css'

class LoginRoute extends Component {
  state = {
    username: 'rahul',
    password: 'rahul@2021',
    showPassword: false,
    showLoginError: false,
    LoginErrorMsg: '',
  }

  onPasswordChange = event => {
    this.setState({password: event.target.value})
  }

  onUsernameChange = event => {
    this.setState({username: event.target.value})
  }

  onShowPassword = event => {
    this.setState({showPassword: event.target.checked})
  }

  submitForm = async event => {
    event.preventDefault()
    const {username, password} = this.state

    const userDetails = {username, password}
    const url = 'https://apis.ccbp.in/login'
    const options = {
      method: 'POST',
      body: JSON.stringify(userDetails),
    }
    const response = await fetch(url, options)
    const data = await response.json()
    if (response.ok) {
      this.onSubmitSuccess(data.jwt_token)
    } else {
      this.onSubmitFailure(data.error_msg)
    }
  }

  onSubmitFailure = errorMsg => {
    this.setState({showLoginError: true, LoginErrorMsg: errorMsg})
  }

  onSubmitSuccess = jwtToken => {
    const {history} = this.props

    Cookies.set('jwt_token', jwtToken, {
      expires: 30,
      path: '/',
    })
    history.replace('/')
  }

  render() {
    const {
      password,
      username,
      showLoginError,
      showPassword,
      LoginErrorMsg,
    } = this.state
    const jwtToken = Cookies.get('jwt_token')
    if (jwtToken !== undefined) {
      return <Redirect to="/" />
    }

    const renderUsernameField = () => (
      <div className="input-container">
        <label htmlFor="username" className="heading-label">
          Username
        </label>
        <input
          id="username"
          type="text"
          value={username}
          onChange={this.onUsernameChange}
          placeholder="Username"
          className="input-field"
        />
      </div>
    )

    const renderPasswordField = () => (
      <div className="input-container">
        <label htmlFor="lastname" className="heading-label">
          Password
        </label>
        <input
          id="lastname"
          type={showPassword ? 'text' : 'password'}
          onChange={this.onPasswordChange}
          value={password}
          placeholder="Password"
          className="input-field"
        />
        <div>
          <input
            type="checkbox"
            id="showpassword"
            checked={showPassword}
            onChange={this.onShowPassword}
            className="password-input-checkbox"
          />
          <label htmlFor="showpassword">Show Password</label>
        </div>
      </div>
    )

    return (
      <AppTheme.Consumer>
        {value => {
          const {activeTheme} = value
          const bgColor = activeTheme === 'light' ? '#f9f8f5' : '#000000'
          const cardColor = activeTheme === 'light' ? '#ECECEC' : '#26292A'
          const color = activeTheme === 'light' ? 'black' : 'white'
          return (
            <BgContainer bgColor={bgColor} color={color}>
              <LoginCard cardColor={cardColor}>
                <img
                  src={
                    activeTheme === 'light'
                      ? 'https://assets.ccbp.in/frontend/react-js/nxt-watch-logo-light-theme-img.png'
                      : 'https://assets.ccbp.in/frontend/react-js/nxt-watch-logo-dark-theme-img.png'
                  }
                  alt="logo"
                  className="login-card-logo"
                />
                <form
                  className="login-form-container"
                  onSubmit={this.submitForm}
                >
                  {renderUsernameField()}
                  {renderPasswordField()}
                  <button type="submit" className="login-button">
                    Login
                  </button>
                  {showLoginError && (
                    <p className="error-msg">*{LoginErrorMsg}</p>
                  )}
                </form>
              </LoginCard>
            </BgContainer>
          )
        }}
      </AppTheme.Consumer>
    )
  }
}

export default LoginRoute
