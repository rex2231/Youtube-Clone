import React from 'react'

const AppTheme = React.createContext({
  activeTheme: 'light',
  savedVideos: [],
  activeTab: 'Home',
  addSavedVideos: () => {},
  onChangeTheme: () => {},
  changeTab: () => {},
})

export default AppTheme
