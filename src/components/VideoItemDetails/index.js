import {Component} from 'react'
import Cookies from 'js-cookie'
import ReactPlayer from 'react-player'
import {differenceInYears} from 'date-fns'
import Loader from 'react-loader-spinner'
import {BsDot} from 'react-icons/bs'
import {AiOutlineLike, AiOutlineDislike} from 'react-icons/ai'
import {MdPlaylistAdd} from 'react-icons/md'
import Header from '../Header'
import Sidebar from '../Sidebar'
import {
  HomePage,
  PageLoadContainer,
  VideoFeedbackButton,
} from '../HomeRoute/styledComponents'
import AppTheme from '../../context/Theme'
import './index.css'

const convertDate = dateString => {
  const givenDate = new Date(dateString)
  const currentDate = new Date()
  const yearsDifference = differenceInYears(currentDate, givenDate)
  const formattedResult = `${yearsDifference} years ago`
  return formattedResult
}

const apiStatusConstants = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  inProgress: 'IN_PROGRESS',
}

class VideoItemDetails extends Component {
  state = {
    videoData: {channel: {}},
    videoApiStatus: apiStatusConstants.initial,
    isLiked: false,
    isDisliked: false,
  }

  componentDidMount = () => {
    this.getVideoDetails()
  }

  getVideoDetails = async () => {
    this.setState({videoApiStatus: apiStatusConstants.inProgress})
    const {match} = this.props
    const {params} = match
    const {id} = params
    const api = `https://apis.ccbp.in/videos/${id}`
    const jwtToken = Cookies.get('jwt_token')
    const options = {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
    }
    const response = await fetch(api, options)
    const data = await response.json()
    if (response.ok) {
      this.setState({videoApiStatus: apiStatusConstants.success})
      const updatedData = {
        channel: {
          name: data.video_details.channel.name,
          profileImageUrl: data.video_details.channel.profile_image_url,
          subscriberCount: data.video_details.channel.subscriber_count,
        },
        description: data.video_details.description,
        id: data.video_details.id,
        publishedAt: convertDate(data.video_details.published_at),
        thumbnailUrl: data.video_details.thumbnail_url,
        title: data.video_details.title,
        videoUrl: data.video_details.video_url,
        viewCount: data.video_details.view_count,
      }
      this.setState({videoData: updatedData})
    } else {
      this.setState({videoApiStatus: apiStatusConstants.failure})
    }
  }

  onLikeVideo = () => {
    this.setState(prevState => ({
      isLiked: !prevState.isLiked,
      isDisliked: false,
    }))
  }

  onDislikeVideo = () => {
    this.setState(prevState => ({
      isDisliked: !prevState.isDisliked,
      isLiked: false,
    }))
  }

  renderVideoSuccess = () => (
    <AppTheme.Consumer>
      {value => {
        const {addSavedVideos, savedVideos} = value
        const {videoData, isLiked, isDisliked} = this.state
        const saveVideo = () => {
          addSavedVideos(videoData)
        }
        const doesSaved = savedVideos.some(video => video.id === videoData.id)

        return (
          <div className="video-item-details-page">
            <ReactPlayer
              url={videoData.videoUrl}
              controls
              width="100%"
              height="420px"
              style={{boxShadow: '0px 0px 10px rgba(0, 0, 0, 0.3)'}}
            />
            <h1 className="video-player-title">{videoData.title}</h1>
            <div className="video-items-description-container">
              <div className="video-views-publishDate">
                <p>{videoData.viewCount} views</p>
                <BsDot />
                <p>{videoData.publishedAt}</p>
              </div>
              <div className="video-feedback-buttons-container">
                <VideoFeedbackButton
                  color={isLiked ? '#2563eb' : '#64748b'}
                  onClick={this.onLikeVideo}
                >
                  <AiOutlineLike className="video-feedback-button-icon" /> Like
                </VideoFeedbackButton>
                <VideoFeedbackButton
                  color={isDisliked ? '#2563eb' : '#64748b'}
                  onClick={this.onDislikeVideo}
                >
                  <AiOutlineDislike className="video-feedback-button-icon" />{' '}
                  Dislike
                </VideoFeedbackButton>
                <VideoFeedbackButton
                  color={doesSaved ? '#2563eb' : '#64748b'}
                  onClick={saveVideo}
                >
                  <MdPlaylistAdd className="video-feedback-button-icon" />
                  {doesSaved ? 'Saved' : 'Save'}
                </VideoFeedbackButton>
              </div>
            </div>
            <hr />
            <div className="channel-description-container">
              <img
                src={videoData.channel.profileImageUrl}
                className="channel-description-channel-logo"
                alt="channel-logo"
              />
              <div className="channel-description-details">
                <p className="channel-description-channel-name">
                  {videoData.channel.name}
                </p>
                <p className="channel-description-channel-subCount">
                  {videoData.channel.subscriberCount} subscribers
                </p>
                <p>{videoData.description}</p>
              </div>
            </div>
          </div>
        )
      }}
    </AppTheme.Consumer>
  )

  renderVideoFailure = () => (
    <div className="failure-view-container">
      <img
        src="https://assets.ccbp.in/frontend/react-js/nxt-watch-failure-view-light-theme-img.png"
        alt="failure view"
        className="home-failure-view-img"
      />
      <p className="failure-view-heading">Oops! Something Went Wrong</p>
      <p className="failure-view-description">
        We are having some trouble to complete your request. <br /> Please try
        again.
      </p>
      <button
        type="button"
        className="retry-button"
        onClick={this.getVideoDetails}
      >
        Retry
      </button>
    </div>
  )

  rendervideoLoader = () => (
    <AppTheme.Consumer>
      {value => {
        const {activeTheme} = value
        const bgColor = activeTheme === 'light' ? '#f9f9f9' : '#000000'
        return (
          <PageLoadContainer bgColor={bgColor} data-testid="loader">
            <Loader type="ThreeDots" color="#3b82f6" height="50" width="50" />
          </PageLoadContainer>
        )
      }}
    </AppTheme.Consumer>
  )

  renderVideoPage = () => {
    const {videoApiStatus} = this.state
    switch (videoApiStatus) {
      case apiStatusConstants.success:
        return this.renderVideoSuccess()
      case apiStatusConstants.failure:
        return this.renderVideoFailure()
      case apiStatusConstants.inProgress:
        return this.rendervideoLoader()
      default:
        return <p>default</p>
    }
  }

  render() {
    return (
      <AppTheme.Consumer>
        {value => {
          const {activeTheme} = value
          const bgColor = activeTheme === 'light' ? '#f9f9f9' : '#0f0f0f'
          const color = activeTheme === 'light' ? 'black' : 'white'

          return (
            <div className="videos-section">
              <Header />
              <div className="page-container">
                <Sidebar />
                <HomePage
                  bgColor={bgColor}
                  color={color}
                  data-testid="videoItemDetails"
                >
                  {this.renderVideoPage()}
                </HomePage>
              </div>
            </div>
          )
        }}
      </AppTheme.Consumer>
    )
  }
}

export default VideoItemDetails
