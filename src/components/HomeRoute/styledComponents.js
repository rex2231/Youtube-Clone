import styled from 'styled-components'

export const LoadContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background-color: #f9f8f5;
  height: ${props =>
    props.isBanner === false ? 'calc(100% - 10%)' : 'calc(100% - 40%)'};
  background-color: ${props => props.bgColor};
  color: ${props => props.color};
`

export const PageLoadContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background-color: #f9f8f5;
  height: 100%;
  background-color: ${props => props.bgColor};
  color: ${props => props.color};
`

export const HomePage = styled.div`
  width: 100%;
  overflow-y: auto;
  flex-grow: 1;
  background-color: ${props => props.bgColor};
  color: ${props => props.color};
`
export const VideosSearchInput = styled.input`
  all: initial;
  font-family: roboto;
  font-size: 16px;
  width: 90%;
  border: none;
  color: ${props => props.color};
`
export const TrendingPageHeader = styled.div`
  padding: 20px;
  padding-top: 5px;
  padding-bottom: 5px;
  background-color: ${props => props.headerBg};
  width: 100%;
  display: flex;
  align-items: center;
  color: ${props => props.color};
`
export const VideoFeedbackButton = styled.button`
  all: initial;
  font-family: roboto;
  font-size: 15px;
  display: flex;
  align-items: center;
  cursor: pointer;
  color: ${props => props.color};
`
