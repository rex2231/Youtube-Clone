import {Component} from 'react'
import {Link} from 'react-router-dom'
import {MdHome, MdPlaylistAdd} from 'react-icons/md'
import {FaFire} from 'react-icons/fa'
import {SiYoutubegaming} from 'react-icons/si'
import {SidebarContainer, SlidebarItem} from './styledComponents'
import AppTheme from '../../context/Theme'
import './index.css'

class Sidebar extends Component {
  render() {
    return (
      <AppTheme.Consumer>
        {value => {
          const {activeTheme, changeTab, activeTab} = value
          const bgColor = activeTheme === 'light' ? '#ffffff' : '#231f20'
          const color = activeTheme === 'light' ? '#000000' : '#ffffff'
          const onClickTabHome = () => {
            changeTab('Home')
          }
          const onClickTabTrending = () => {
            changeTab('Trending')
          }
          const onClickTabGaming = () => {
            changeTab('Gaming')
          }
          const onClickTabSaved = () => {
            changeTab('Saved videos')
          }
          const sidebarPaths = [
            {
              name: 'Home',
              path: '/',
              icon: MdHome,
              id: 'home',
              function: onClickTabHome,
            },
            {
              name: 'Trending',
              path: '/trending',
              icon: FaFire,
              id: 'trending',
              function: onClickTabTrending,
            },
            {
              name: 'Gaming',
              path: '/gaming',
              icon: SiYoutubegaming,
              id: 'gaming',
              function: onClickTabGaming,
            },
            {
              name: 'Saved videos',
              path: '/saved-videos',
              icon: MdPlaylistAdd,
              id: 'savedVideos',
              function: onClickTabSaved,
            },
          ]
          return (
            <SidebarContainer bgColor={bgColor} color={color}>
              <div className="sidebar-sections">
                {sidebarPaths.map(eachItem => (
                  <Link
                    className={
                      activeTab === eachItem.path
                        ? 'selected-sidebar-item-container'
                        : 'sidebar-item-container'
                    }
                    to={eachItem.path}
                    key={eachItem.id}
                    value={eachItem.id}
                    onClick={eachItem.function}
                  >
                    <SlidebarItem type="button" color={color}>
                      <eachItem.icon
                        className={
                          activeTab === eachItem.name
                            ? 'selected-sidebar-icon'
                            : 'sidebar-icon'
                        }
                      />
                      {eachItem.name}
                    </SlidebarItem>
                  </Link>
                ))}
              </div>
              <div className="contact-us-section">
                <p className="contact-us-heading">CONTACT US</p>
                <div className="Contact-us-logo-container">
                  <img
                    src="https://assets.ccbp.in/frontend/react-js/nxt-watch-facebook-logo-img.png"
                    alt="facebook logo"
                    className="contact-us-logo"
                  />
                  <img
                    src="https://assets.ccbp.in/frontend/react-js/nxt-watch-twitter-logo-img.png"
                    alt="twitter logo"
                    className="contact-us-logo"
                  />
                  <img
                    src="https://assets.ccbp.in/frontend/react-js/nxt-watch-linked-in-logo-img.png"
                    alt="linked in logo"
                    className="contact-us-logo"
                  />
                </div>
                <p className="contact-us-description">
                  Enjoy! Now to see your <br />
                  channels and <br />
                  recommendations!
                </p>
              </div>
            </SidebarContainer>
          )
        }}
      </AppTheme.Consumer>
    )
  }
}

export default Sidebar
