import {MdClose} from 'react-icons/md'
import {FaSearch} from 'react-icons/fa'
import {Component} from 'react'
import Cookies from 'js-cookie'
import Loader from 'react-loader-spinner'
import VideoCard from '../VideoCard'
import Header from '../Header'
import Sidebar from '../Sidebar'
import {LoadContainer, HomePage, VideosSearchInput} from './styledComponents'
import AppTheme from '../../context/Theme'
import './index.css'

const apiStatusConstants = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  inProgress: 'IN_PROGRESS',
}

class HomeRoute extends Component {
  state = {
    bannerStatus: true,
    videosData: [],
    videosApiStatus: apiStatusConstants.initial,
    searchkey: '',
  }

  toggleBanner = () => {
    this.setState(prevState => ({
      bannerStatus: !prevState.bannerStatus,
    }))
  }

  onRetryVideos = () => {
    this.getAllVideos()
  }

  componentDidMount = () => {
    this.getAllVideos()
  }

  getAllVideos = async () => {
    const {searchkey} = this.state
    this.setState({videosApiStatus: apiStatusConstants.inProgress})
    const url = `https://apis.ccbp.in/videos/all?search=${searchkey}`
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
        channel: {
          name: video.channel.name,
          profileImageUrl: video.channel.profile_image_url,
        },
        id: video.id,
        publishedAt: video.published_at,
        thumbnailUrl: video.thumbnail_url,
        title: video.title,
        viewCount: video.view_count,
      }))
      this.setState({
        videosData: updatedData,
        videosApiStatus: apiStatusConstants.success,
      })
    } else {
      this.setState({videosApiStatus: apiStatusConstants.failure})
    }
  }

  renderHomeBanner = () => (
    <div className="nxt-watch-banner" data-testid="banner">
      <div className="logo-close-container">
        <img
          src="https://assets.ccbp.in/frontend/react-js/nxt-watch-logo-light-theme-img.png"
          alt="nxt watch logo"
          className="nxt-watch-banner-logo"
        />
        <button
          data-testid="close"
          type="button"
          aria-label="close-button"
          className="banner-close-button"
          onClick={this.toggleBanner}
        >
          <MdClose />
        </button>
      </div>
      <p>
        Buy Nxt Watch Premium prepaid plans with <br /> UPI
      </p>
      <button className="nxt-watch-banner-get-button" type="button">
        GET IT NOW
      </button>
    </div>
  )

  renderVideos = () => {
    const {videosData, bannerStatus} = this.state
    return (
      <AppTheme.Consumer>
        {value => {
          const {activeTheme} = value
          const bgColor = activeTheme === 'light' ? '#f9f8f5' : '#000000'
          const color = activeTheme === 'light' ? 'balck' : 'white'
          return videosData.length === 0 ? (
            <LoadContainer
              isBanner={bannerStatus}
              bgColor={bgColor}
              color={color}
            >
              <img
                src="https://assets.ccbp.in/frontend/react-js/nxt-watch-no-search-results-img.png"
                alt="no videos"
                className="no-videos-img"
              />
              <p className="failure-view-heading">No Search results found</p>
              <p className="failure-view-description">
                Try different key words or remove search filter
              </p>
              <button
                className="no-videos-retry-button"
                type="button"
                onClick={this.getAllVideos}
              >
                Retry
              </button>
            </LoadContainer>
          ) : (
            <div className="home-page-videos-container">
              <div className="videos-container">
                {videosData.map(eachItem => (
                  <div key={eachItem.id}>
                    <VideoCard videoData={eachItem} />
                  </div>
                ))}
              </div>
            </div>
          )
        }}
      </AppTheme.Consumer>
    )
  }

  renderLoading = () => {
    const {bannerStatus} = this.state
    return (
      <AppTheme.Consumer>
        {value => {
          const {activeTheme} = value
          const bgColor = activeTheme === 'light' ? '#f9f9f9' : '#000000'
          return (
            <LoadContainer
              bgColor={bgColor}
              isBanner={bannerStatus}
              data-testid="loader"
            >
              <Loader type="ThreeDots" color="#3b82f6" height="50" width="50" />
            </LoadContainer>
          )
        }}
      </AppTheme.Consumer>
    )
  }

  renderHomeFailureView = () => {
    const {bannerStatus} = this.state

    return (
      <AppTheme.Consumer>
        {value => {
          const {activeTheme} = value
          const bgColor = activeTheme === 'light' ? '#f9f8f5' : '#000000'
          const color = activeTheme === 'light' ? 'black' : 'white'
          return (
            <LoadContainer
              isBanner={bannerStatus}
              bgColor={bgColor}
              color={color}
            >
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
                We are having some trouble to complete your request. <br />{' '}
                Please try again.
              </p>
              <button
                type="button"
                className="retry-button"
                onClick={this.onRetryVideos}
              >
                Retry
              </button>
            </LoadContainer>
          )
        }}
      </AppTheme.Consumer>
    )
  }

  renderHomePage = () => {
    const {videosApiStatus} = this.state
    switch (videosApiStatus) {
      case apiStatusConstants.success:
        return this.renderVideos()
      case apiStatusConstants.failure:
        return this.renderHomeFailureView()
      case apiStatusConstants.inProgress:
        return this.renderLoading()
      default:
        return null
    }
  }

  onEnterSearchWords = event => {
    this.setState({searchkey: event.target.value})
  }

  onHandleEnterInSearch = event => {
    if (event.keyCode === 13) {
      this.getAllVideos()
    }
  }

  onSearchVideos = () => {
    this.getAllVideos()
  }

  renderHomeVideosSearch = () => (
    <AppTheme.Consumer>
      {value => {
        const {activeTheme} = value
        const color = activeTheme === 'light' ? '#000000' : '#ffffff'

        return (
          <div className="home-videos-search-container">
            <div className="home-search-container">
              <VideosSearchInput
                type="text"
                className="videos-search-input"
                placeholder="Search"
                onChange={this.onEnterSearchWords}
                onKeyDown={this.onHandleEnterInSearch}
                color={color}
              />
              <button
                type="button"
                aria-label="search-button"
                className="home-search-button"
                onClick={this.onSearchVideos}
                data-testid="searchButton"
              >
                <FaSearch className="home-search-icon" />
              </button>
            </div>
          </div>
        )
      }}
    </AppTheme.Consumer>
  )

  render() {
    const {bannerStatus} = this.state

    return (
      <AppTheme.Consumer>
        {value => {
          const {activeTheme} = value
          const bgColor = activeTheme === 'light' ? '#f9f9f9' : '#181818'
          return (
            <div className="videos-section" data-testid="home">
              <Header />
              <div className="page-container">
                <Sidebar />
                <HomePage
                  data-testid="home"
                  className="home-page"
                  bgColor={bgColor}
                >
                  {bannerStatus && this.renderHomeBanner()}
                  {this.renderHomeVideosSearch()}
                  {this.renderHomePage()}
                </HomePage>
              </div>
            </div>
          )
        }}
      </AppTheme.Consumer>
    )
  }
}

export default HomeRoute
