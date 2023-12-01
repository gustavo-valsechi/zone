import React, { useCallback, useEffect, useState } from 'react'
import { Button, Container, InfiniteScroll, Map, Text } from '../../components'
import { ContainerLocation, ContainerMap, ContainerContent, ContainerAlert } from './styles'
import { useDispatch, useSelector } from 'react-redux'
import { useAuth } from "../../contexts/auth"
import * as ExpoLocation from 'expo-location'
import _ from 'lodash'

import EstablishmentActions from '../../store/ducks/establishment'

import Filters from './filters'
import Card from './card'

export default function Location({ route, navigation }) {
  const dispatch = useDispatch()

  const { token } = useAuth()

  const {
    establishments,
    establishmentsPage,
    loadingLocation,
    fetchingMoreLocation,
    reloadLocation,
    nameEstablishment,
    filtersEstablishment,
  } = useSelector((state) => state.establishment)

  const [params] = useState(route.params || {})

  const [denied, setDenied] = useState(false)

  useEffect(() => {
    dispatch(EstablishmentActions.establishmentDetailsSuccess({}))
    dispatch(EstablishmentActions.setLocationPage(0))
  }, [dispatch])

  const getLocation = useCallback(async () => {
    if (!token) return

    dispatch(EstablishmentActions.setLoadingLocation(true))

    let position

    const { status } = await ExpoLocation.requestForegroundPermissionsAsync()
    
    if (status === 'granted') {
      const { coords } = await ExpoLocation.getCurrentPositionAsync({})

      position = coords
    }

    const credentials = {
      filter: nameEstablishment,
      couponId: params.couponId || undefined,
      coords: position ? { 
        latitude: position?.latitude, 
        longitude: position?.longitude 
      } : undefined,
      condition: {
        uf: filtersEstablishment.uf || undefined,
        city: filtersEstablishment.city || undefined,
      },
      limit: 20,
      offset: establishmentsPage
    }
    
    setDenied(status !== 'granted')
    dispatch(EstablishmentActions.establishmentsRequest(credentials))
  }, [dispatch, establishmentsPage, nameEstablishment, token, params, filtersEstablishment])

  useEffect(() => {
    getLocation()
  }, [getLocation])

  const fetchingMore = () => {
    if (!establishments.pageCount || establishments.pageCount === (establishmentsPage + 1)) return

    dispatch(EstablishmentActions.setFetchingMoreLocation(true))
    dispatch(EstablishmentActions.setLocationPage(establishmentsPage + 1))
  }

  const reload = () => {
    dispatch(EstablishmentActions.setReloadLocation(true))
    dispatch(EstablishmentActions.setLocationPage(0))
    getLocation()
  }

  const details = (uuid) => {
    navigation.navigate('EstablishmentDetails', { uuid })
  }

  return (
    <Container
      header={{
        title: params.title || "Locais próximos",
        left: {
          function: navigation.goBack,
          icon: 'chevron-left'
        }
      }}
    >
      <ContainerLocation>
        <ContainerMap denied={denied}>
          {denied
          ? <ContainerAlert>
              <Text color="primary" bold size={15} mb={10}>Atenção!</Text>
              <Text color="secondary" weight={500} lines={5} align="center" mr={10} ml={10}>
                Para ter uma melhor experiência com o aplicativo, permita o acesso à localização do dispositivo
              </Text>
            </ContainerAlert>
          : <Map 
              loading={loadingLocation && !fetchingMoreLocation && !reloadLocation} 
              markers={_.map(establishments.content, (data) => ({ ...data, function: () => details(data.uuid) }))}
            />}
        </ContainerMap>
        <ContainerContent>
          <Filters 
            denied={denied} 
            disabled={loadingLocation && !fetchingMoreLocation && !reloadLocation} 
          />
          <InfiniteScroll 
            content={{ data: establishments.content, loading: loadingLocation }}
            fetch={{ function: fetchingMore, loading: fetchingMoreLocation }}
            refresh={{ function: reload, loading: reloadLocation }}
            empty={{ icon: "store", message: "Nenhum estabelecimento encontrado" }}
            item={{ component: (item) => <Card denied={denied} details={details} {...item} /> }}
          />
        </ContainerContent>
      </ContainerLocation>
    </Container>
  )
}