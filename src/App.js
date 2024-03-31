import {Component} from 'react'
import {Route, Switch, Redirect} from 'react-router-dom'

import AppTheme from './context/Theme'
import LoginRoute from './components/LoginRoute'
import HomeRoute from './components/HomeRoute'
import VideoItemDetails from './components/VideoItemDetails'
import TrendingRoute from './components/TrendingRoute'
import GamingRoute from './components/GamingRoute'
import SavedVideosRoute from './components/SavedVideosRoute'
import NotFoundRoute from './components/NotFoundRoute'
import ProtectedRoute from './components/ProtectedRoute'
import './App.css'

class App extends Component {
  state = {activeTheme: 'light', savedVideos: [], activeTab: 'Home'}

  changeTheme = activeTheme => {
    this.setState({activeTheme})
  }

  changeTab = tab => {
    this.setState({activeTab: tab})
  }

  addSavedVideos = async data => {
    const {savedVideos} = this.state
    if (savedVideos.length > 0) {
      const checkSavedVideos = savedVideos.filter(item => item.id === data.id)
      if (checkSavedVideos.length === 0) {
        await this.setState({
          savedVideos: [...savedVideos, data],
        })
      }
    } else {
      await this.setState({
        savedVideos: [...savedVideos, data],
      })
    }
  }

  render() {
    const {activeTheme, savedVideos, activeTab} = this.state

    return (
      <AppTheme.Provider
        value={{
          activeTheme,
          savedVideos,
          activeTab,
          changeTab: this.changeTab,
          addSavedVideos: this.addSavedVideos,
          ChangeTheme: this.changeTheme,
        }}
      >
        <Switch>
          <Route exact path="/login" component={LoginRoute} />
          <ProtectedRoute exact path="/" component={HomeRoute} />
          <ProtectedRoute
            exact
            path="/videos/:id"
            component={VideoItemDetails}
          />
          <ProtectedRoute exact path="/trending" component={TrendingRoute} />
          <ProtectedRoute exact path="/gaming" component={GamingRoute} />
          <ProtectedRoute
            exact
            path="/saved-videos"
            component={SavedVideosRoute}
          />
          <ProtectedRoute exact path="/not-found" component={NotFoundRoute} />
          <Redirect to="/not-found" />
        </Switch>
      </AppTheme.Provider>
    )
  }
}

export default App
