import {Component} from 'react'
import {SiYoutubegaming} from 'react-icons/si'
import Cookies from 'js-cookie'
import Loader from 'react-loader-spinner'
import GamingVideoCard from './GamingVideoCard'
import Header from '../Header'
import Sidebar from '../Sidebar'
import AppTheme from '../../context/Theme'
import {
  HomePage,
  PageLoadContainer,
  TrendingPageHeader,
} from '../HomeRoute/styledComponents'
import './index.css'

const apiStatusConstants = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  inProgress: 'IN_PROGRESS',
}

class GamingRoute extends Component {
  state = {
    apiStatus: apiStatusConstants.initial,
    gamingVideosData: [],
  }

  componentDidMount = () => {
    this.getGamingVideoData()
  }

  getGamingVideoData = async () => {
    this.setState({apiStatus: apiStatusConstants.inProgress})
    const url = 'https://apis.ccbp.in/videos/gaming'
    const jwtToken = Cookies.get('jwt_token')
    const options = {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
    }
    const response = await fetch(url, options)
    const data = await response.json()
    if (response.ok) {
      const updatedData = data.videos.map(video => ({
        id: video.id,
        thumbnailUrl: video.thumbnail_url,
        title: video.title,
        viewCount: video.view_count,
      }))
      this.setState({
        apiStatus: apiStatusConstants.success,
        gamingVideosData: updatedData,
      })
    } else {
      this.setState({apiStatus: apiStatusConstants.failure})
    }
  }

  renderLoadingView = () => (
    <div className="trending-page-loader-container" data-testid="loader">
      <Loader type="ThreeDots" color="#3b82f6" height="50" width="50" />
    </div>
  )

  renderFailureView = () => (
    <AppTheme.Consumer>
      {value => {
        const {activeTheme} = value
        const bgColor = activeTheme === 'light' ? '#f9f8f5' : '#000000'
        const color = activeTheme === 'light' ? 'black' : 'white'
        return (
          <PageLoadContainer bgColor={bgColor} color={color}>
            <img
              src={
                activeTheme === 'light'
                  ? 'https://assets.ccbp.in/frontend/react-js/nxt-watch-failure-view-light-theme-img.png'
                  : 'https://assets.ccbp.in/frontend/react-js/nxt-watch-failure-view-dark-theme-img.png'
              }
              alt="failure view"
              className="home-failure-view-img"
            />
            <p className="failure-view-heading">Oops! Something Went Wrong</p>
            <p className="failure-view-description">
              We are having some trouble to complete your request. <br /> Please
              try again.
            </p>
            <button
              type="button"
              className="retry-button"
              onClick={this.getAllTrendingVideos}
            >
              Retry
            </button>
          </PageLoadContainer>
        )
      }}
    </AppTheme.Consumer>
  )

  renderSuccessView = () => {
    const {gamingVideosData} = this.state
    return (
      <div className="gaming-videos-container">
        {gamingVideosData.map(video => (
          <div key={video.id}>
            <GamingVideoCard videoData={video} />
          </div>
        ))}
      </div>
    )
  }

  renderGamingPage = () => {
    const {apiStatus} = this.state
    switch (apiStatus) {
      case apiStatusConstants.success:
        return this.renderSuccessView()
      case apiStatusConstants.inProgress:
        return this.renderLoadingView()
      case apiStatusConstants.failure:
        return this.renderFailureView()
      default:
        return null
    }
  }

  render() {
    return (
      <AppTheme.Consumer>
        {value => {
          const {activeTheme} = value
          const bgColor = activeTheme === 'light' ? '#f9f9f9' : '#0f0f0f'
          const headerBg = activeTheme === 'light' ? '#ECECEC' : '#26292A'
          const color = activeTheme === 'light' ? 'black' : 'white'
          return (
            <div className="videos-section">
              <Header />
              <div className="page-container">
                <Sidebar />
                <HomePage bgColor={bgColor} data-testid="gaming">
                  <TrendingPageHeader headerBg={headerBg} color={color}>
                    <div className="trending-logo-container">
                      <SiYoutubegaming className="trending-page-trending-logo" />
                    </div>
                    <h1>Gaming</h1>
                  </TrendingPageHeader>
                  <div className="trending-page-content">
                    {this.renderGamingPage()}
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

export default GamingRoute
