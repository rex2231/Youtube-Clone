import {Link} from 'react-router-dom'
import AppTheme from '../../../context/Theme'
import {GamingVideoThumbnailCard} from './styledComponents'
import './index.css'

const GamingVideoCard = props => {
  const {videoData} = props
  const {id, thumbnailUrl, title, viewCount} = videoData

  return (
    <AppTheme.Consumer>
      {value => {
        const {activeTheme} = value
        const color = activeTheme === 'light' ? 'black' : 'white'

        return (
          <Link to={`/videos/${id}`}>
            <GamingVideoThumbnailCard color={color}>
              <img
                src={thumbnailUrl}
                className="gaming-video-thumbnail-img"
                alt="thumbnail"
              />
              <p className="gaming-video-view-title">{title}</p>
              <p className="gaming-video-view-count">
                {viewCount} Watching Worldwide
              </p>
            </GamingVideoThumbnailCard>
          </Link>
        )
      }}
    </AppTheme.Consumer>
  )
}

export default GamingVideoCard
