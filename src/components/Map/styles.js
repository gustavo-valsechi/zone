import styled from 'styled-components/native'
import MapView from 'react-native-maps'

export const ContainerMap = styled(MapView)`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
`

export const ContainerMarker = styled.View`
  background: #FFF;
  padding: 1px;
  border-radius: 100px;
`

export const Image = styled.Image`
  width: 30px;
  height: 30px;
  border-radius: 100px;
`
