import './index.css'
import Header from '../Header'
import Sidebar from '../Sidebar'
import AppTheme from '../../context/Theme'
import {HomePage} from '../HomeRoute/styledComponents'

const NotFoundRoute = () => (
  <AppTheme.Consumer>
    {value => {
      const {activeTheme} = value
      const bgColor = activeTheme === 'light' ? '#f9f8f5' : '#000000'
      const color = activeTheme === 'light' ? 'black' : 'white'
      return (
        <HomePage bgColor={bgColor} color={color}>
          <Header />
          <div className="page-container">
            <Sidebar />
            <div className="not-found-container">
              <img
                src="https://assets.ccbp.in/frontend/react-js/nxt-watch-not-found-light-theme-img.png"
                alt="notFound"
                className="not-found-image"
              />
              <h1>Page Not Found</h1>
              <p className="not-found-description">
                We are sorry, the page you requested could not be found.
              </p>
            </div>
          </div>
        </HomePage>
      )
    }}
  </AppTheme.Consumer>
)

export default NotFoundRoute
