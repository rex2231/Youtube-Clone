import {Link, withRouter} from 'react-router-dom'
import Cookies from 'js-cookie'
import {BsMoon, BsBrightnessHigh} from 'react-icons/bs'
import Popup from 'reactjs-popup'
import AppTheme from '../../context/Theme'
import {HeaderContainer, LogoutButton, PopupContainer} from './styledComponents'
import './index.css'

const Header = props => {
  const onLogout = () => {
    const {history} = props
    Cookies.remove('jwt_token')
    history.replace('/login')
  }

  const logoutPopuoStyle = {
    width: '100%',
    height: '100%',
    backgroundColor: 'rgb(0, 0, 0, 0.5)',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  }

  return (
    <AppTheme.Consumer>
      {value => {
        const {activeTheme, ChangeTheme} = value
        const color = activeTheme === 'light' ? '#3b82f6' : '#ffffff'
        const bgColor = activeTheme === 'light' ? '#ffffff' : '#231f20'
        const onChangeTheme = () => {
          const theme = activeTheme === 'light' ? 'dark' : 'light'
          ChangeTheme(theme)
        }
        return (
          <HeaderContainer bgColor={bgColor}>
            <Link to="/">
              <div>
                <img
                  src={
                    activeTheme === 'light'
                      ? 'https://assets.ccbp.in/frontend/react-js/nxt-watch-logo-light-theme-img.png'
                      : 'https://assets.ccbp.in/frontend/react-js/nxt-watch-logo-dark-theme-img.png'
                  }
                  alt="website logo"
                  className="header-logo"
                />
              </div>
            </Link>
            <div className="header-controls-container">
              <button
                type="button"
                aria-label="light-mode"
                className="header-controls-button"
                onClick={onChangeTheme}
                data-testid="theme"
              >
                {activeTheme === 'light' ? (
                  <BsMoon className="header-controls-icon" />
                ) : (
                  <BsBrightnessHigh className="header-controls-icon sun-icon" />
                )}
              </button>
              <button type="button" className="header-controls-button">
                <img
                  src="https://assets.ccbp.in/frontend/react-js/nxt-watch-profile-img.png"
                  alt="profile"
                  className="header-controls-icon"
                />
              </button>
              <Popup
                modal
                overlayStyle={logoutPopuoStyle}
                trigger={
                  <LogoutButton
                    type="button"
                    className="logout-button"
                    color={color}
                  >
                    Logout
                  </LogoutButton>
                }
              >
                {close => (
                  <PopupContainer bgColor={bgColor} color={color}>
                    <h1 className="popup-heading">
                      Are you sure wanna logout?
                    </h1>
                    <div className="popup-buttons-container">
                      <button
                        type="button"
                        onClick={() => close()}
                        className="popup-button-cancel"
                      >
                        Cancel
                      </button>
                      <button
                        className="popup-button-conform "
                        type="button"
                        onClick={onLogout}
                      >
                        Confirm
                      </button>
                    </div>
                  </PopupContainer>
                )}
              </Popup>
            </div>
          </HeaderContainer>
        )
      }}
    </AppTheme.Consumer>
  )
}

export default withRouter(Header)
