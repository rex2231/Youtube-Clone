import {Link} from 'react-router-dom'
import {BsDot} from 'react-icons/bs'
import {differenceInYears} from 'date-fns'
import {
  VideoDescriptionContainer,
  VideoDescriptionTitle,
} from './styledComponents'
import AppTheme from '../../context/Theme'
import './index.css'

const convertDate = dateString => {
  const givenDate = new Date(dateString)
  const currentDate = new Date()
  const yearsDifference = differenceInYears(currentDate, givenDate)
  const formattedResult = `${yearsDifference} years ago`
  return formattedResult
}

const VideoCard = props => {
  const {videoData, trending} = props
  const {id, channel, publishedAt, thumbnailUrl, title, viewCount} = videoData
  const {profileImageUrl, name} = channel
  return (
    <AppTheme.Consumer>
      {value => {
        const {activeTheme} = value
        const color = activeTheme === 'light' ? '#000000' : 'white'
        const descriptionColor =
          activeTheme === 'light' ? '#424242' : ' #909090'
        return (
          <Link to={`/videos/${id}`}>
            <div className={trending ? 'trending-video-card' : 'video-card'}>
              <img
                src={thumbnailUrl}
                alt="video thumbnail"
                className={
                  trending ? 'trending-video-thumbnail' : 'video-thumbnail'
                }
              />
              <div className="video-details-container">
                <div className="channel-logo-title-container">
                  {!trending && (
                    <img
                      src={profileImageUrl}
                      alt="channel logo"
                      className="thumbnail-img"
                    />
                  )}
                  <VideoDescriptionContainer color={descriptionColor}>
                    <VideoDescriptionTitle color={color}>
                      {title}
                    </VideoDescriptionTitle>
                    <p className="video-description-channel-name margin-zero">
                      {name}
                    </p>
                    <div className="video-description-channel-date">
                      <p className="margin-zero">{viewCount}</p>
                      <BsDot className="margin-zero" />
                      <p className="margin-zero">{convertDate(publishedAt)}</p>
                    </div>
                  </VideoDescriptionContainer>
                </div>
              </div>
            </div>
          </Link>
        )
      }}
    </AppTheme.Consumer>
  )
}

export default VideoCard
