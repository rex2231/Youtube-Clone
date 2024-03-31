import styled from 'styled-components'

export const VideoDescriptionContainer = styled.div`
  margin: 0;
  padding: 0;
  margin: 0;
  margin-left: 10px;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;
  color: ${props => props.color};
`
export const VideoDescriptionTitle = styled.div`
  font-weight: 500;
  margin: 0;
  padding: 0;
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  color: ${props => props.color};
`
