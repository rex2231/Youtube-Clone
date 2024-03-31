import styled from 'styled-components'

export const HeaderContainer = styled.div`
  padding: 12px;
  width: 100%;
  display: flex;
  justify-content: space-between;
  background-color: ${props => props.bgColor};
  color: ${props => props.color};
  align-items: center;
  height: 60px;
`

export const LogoutButton = styled.button`
  all: initial;
  padding: 5px;
  background-color: ${props => props.bgColor};
  font-family: roboto;
  padding-left: 15px;
  padding-right: 15px;
  border-radius: 4px;
  color: ${props => props.color};
  border: 1px solid ${props => props.color};
  font-weight: bold;
  cursor: pointer;
`

export const PopupContainer = styled.div`
  background-color: ${props => props.bgColor};
  color: ${props => props.color};
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  height: 150px;
  border-radius: 10px;
  padding: 20px;
`
