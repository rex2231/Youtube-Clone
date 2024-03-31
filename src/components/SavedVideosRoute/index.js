import {Component} from 'react'
import {MdPlaylistAdd} from 'react-icons/md'
import {
  HomePage,
  PageLoadContainer,
  TrendingPageHeader,
} from '../HomeRoute/styledComponents'
import Header from '../Header'
import Sidebar from '../Sidebar'
import AppTheme from '../../context/Theme'
import VideoCard from '../VideoCard'
import './index.css'

const apiStatusConstants = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  inProgress: 'IN_PROGRESS',
}

class SavedVideosRoute extends Component {
  renderSuccessView = () => (
    <div className="gaming-videos-container">
      <p>success view</p>
    </div>
  )

  renderGamingPage = () => {
    const {apiStatus} = this.state
    switch (apiStatus) {
      case apiStatusConstants.success:
        return this.renderSuccessView()
      default:
        return null
    }
  }

  render() {
    return (
      <AppTheme.Consumer>
        {value => {
          const {activeTheme, savedVideos} = value
          const bgColor = activeTheme === 'light' ? '#f9f9f9' : '#0f0f0f'
          const headerBg = activeTheme === 'light' ? '#ECECEC' : '#26292A'
          const color = activeTheme === 'light' ? 'black' : 'white'

          return (
            <div className="videos-section">
              <Header />
              <div className="page-container">
                <Sidebar />
                <HomePage
                  bgColor={bgColor}
                  color={color}
                  data-testid="savedVideos"
                >
                  <TrendingPageHeader headerBg={headerBg} color={color}>
                    <div className="trending-logo-container">
                      <MdPlaylistAdd className="trending-page-trending-logo" />
                    </div>
                    <h1>Saved Videos</h1>
                  </TrendingPageHeader>
                  <div className="trending-page-content">
                    {savedVideos.length !== 0 ? (
                      savedVideos.map(eachItem => (
                        <div key={eachItem.id}>
                          <VideoCard videoData={eachItem} trending />
                        </div>
                      ))
                    ) : (
                      <PageLoadContainer bgColor={bgColor} color={color}>
                        <img
                          src="https://assets.ccbp.in/frontend/react-js/nxt-watch-no-saved-videos-img.png"
                          alt="no saved videos"
                          className="no-saved-videos-img"
                        />
                        <h1>No saved vidoes found</h1>
                        <p>You can save your videos while watching them</p>
                      </PageLoadContainer>
                    )}
                  </div>
                </HomePage>
              </div>
            </div>
          )
        }}
      </AppTheme.Consumer>
    )
  }
}

export default SavedVideosRoute
