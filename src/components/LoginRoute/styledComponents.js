import styled from 'styled-components'

export const BgContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  min-width: 100vw;
  color: red;
  background-color: ${props => props.bgColor};
  color: ${props => props.color};
`

export const LoginCard = styled.div`
  border-radius: 12px;
  box-shadow: 0px 0px 8px black;
  width: 400px;
  padding: 20px;
  padding-top: 50px;
  padding-bottom: 50px;
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: ${props => props.cardColor};
`
