import React from "react"
import { ContainerMap, Image, ContainerMarker } from "./styles"
import { Marker } from "react-native-maps"
import Avatar from "../Avatar"
import LoadingBar from "../LoadingBar"
import _ from "lodash"

export default function Map(props) {
  return (
    props.loading
    ? <LoadingBar />
    : <ContainerMap
        initialRegion={{
          latitude: props.init?.latitude || -28.6783,
          longitude: props.init?.longitude || -49.3704,
          latitudeDelta: 0.0200,
          longitudeDelta: 0.0200
        }}
        showsCompass={false}
        showsMyLocationButton={true}
        showsUserLocation={true}
      >
        {_.map(props.markers, (marker, index) => !!marker.coords &&
          <Marker key={index} coordinate={marker.coords} onPress={marker.function}>
            <ContainerMarker>
              {marker.photo
              ? <Image source={{ uri: marker.photo }} />
              : <Avatar icon="car" size={30} />}
            </ContainerMarker>
          </Marker>
        )}
      </ContainerMap>
  )
}
