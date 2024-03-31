import styled from 'styled-components'

export const SidebarContainer = styled.div`
  min-width: 15%;
  max-width: 15%;
  min-height: calc(100vh - 60px);
  max-height: calc(100vh - 60px);
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  background-color: ${props => props.bgColor};
  color: ${props => props.color};
`

export const SlidebarItem = styled.button`
  all: initial;
  font-family: roboto;
  font-weight: 400;
  display: flex;
  align-items: center;
  color: ${props => props.color};
`
