import React, { useCallback, useEffect, useState } from 'react'
import { Avatar, Button, Container, InfiniteScroll, LoadingBar, Text } from '../../../../components'
import { ContainerWalletHeader, ContainerWalletLegend, ContainerWalletTransactions, Legend, Circle, ContainerCompanyContent, ContainerCompanyPhoto } from './styles'
import { useDispatch, useSelector } from 'react-redux'
import { useAuth } from "../../../../contexts/auth"
import { Refactoring } from '../../../../utils'
import { RefreshControl } from 'react-native'
import _ from 'lodash'

import WalletActions from '../../../../store/ducks/wallet'

import Card from './Card'

const LEGEND = [
  {
    label: "disponível",
    color: "black-2"
  },
  {
    label: "resgatado",
    color: "green"
  },
  {
    label: "vencido",
    color: "yellow"
  },
  {
    label: "cancelado",
    color: "danger"
  },

]

export default function WalletDetails({ route, navigation }) {
  const dispatch = useDispatch()

  const { token } = useAuth()

  const {
    walletDetails,
    walletDetailsPage,
    loadingWalletDetails,
    fetchingMoreWalletDetails,
    reloadWalletDetails,
  } = useSelector((state) => state.wallet)

  const [params] = useState(route.params || {})

  const { 
    permite_transferencia_cashback: transfer, 
    fantasia: name, 
    saldo: amount, 
    foto_url: photo 
  } = walletDetails.company

  const loading = loadingWalletDetails && !fetchingMoreWalletDetails && !reloadWalletDetails

  useEffect(() => {
    dispatch(WalletActions.setWalletDetailsPage(0))
    dispatch(WalletActions.walletTransferCustomerSuccess({}))
  }, [dispatch])

  const getWalletDetails = useCallback(() => {
    if (!token) return

    const credentials = {
      limit: 20,
      offset: walletDetailsPage,
      company_id: params.uuid
    }

    dispatch(WalletActions.walletDetailsRequest(credentials))
  }, [dispatch, walletDetailsPage, token, params])

  useEffect(() => {
    getWalletDetails()
  }, [getWalletDetails])

  const fetchingMore = () => {
    if (!walletDetails.totalPage || walletDetails.totalPage === (walletDetailsPage + 1)) return

    dispatch(WalletActions.setFetchingMoreWalletDetails(true))
    dispatch(WalletActions.setWalletDetailsPage(walletDetailsPage + 1))
  }

  const reload = () => {
    dispatch(WalletActions.setReloadWalletDetails(true))
    dispatch(WalletActions.setWalletDetailsPage(0))
    getWalletDetails()
  }

  const establishment = () => {
    dispatch(WalletActions.setWalletGroupPage(0))
    navigation.navigate('EstablishmentDetails', { uuid: walletDetails.company.id })
  }

  return (
    <Container
      header={{
        title: { loading, text: name, lines: 2, size: 17 },
        left: {
          function: navigation.goBack,
          icon: 'chevron-left'
        },
        right: {
          disabled: loading,
          function: establishment,
          icon: { name: 'store', pack: 'fontAwesome5', size: 20 }
        }
      }}
    >
      <RefreshControl
        tintColor="#fff"
        refreshing={reloadWalletDetails}
        onRefresh={reload}
      >
        <ContainerWalletHeader>
          <ContainerCompanyContent>
            <Text bold size={14.5} color="white-6">Saldo disponível</Text>
            {!!loading
            ? <>
                <LoadingBar white height={20} mb={15} mt={5} />
                <LoadingBar white height={32.5} />
              </>
            : <>
                <Text bold size={20} color="white">{Refactoring.format.money(true, amount || "0.00", 'BRL')}</Text>
                <Text size={12} color="white-6" lines={5} mt={15}>
                  Este local {transfer ? "permite" : "não permite"} a transferência de cashback entre usuários
                </Text>
              </>}
            {!loading && !!transfer &&
              <Button
                width="190px"
                margin="15px 0 0"
                padding="8px"
                color="white-15" 
                label={{ text: "transferir", size: 13 }}
                onPress={() => navigation.navigate("WalletTransfer")}
                analytics={{ enabled: false }}
              />}
          </ContainerCompanyContent>
          <ContainerCompanyPhoto onPress={establishment}>
            <Avatar white icon="store" size={80} source={photo} loading={loading} />
          </ContainerCompanyPhoto>
        </ContainerWalletHeader>
      </RefreshControl>
      <ContainerWalletLegend>
        {_.map(LEGEND, (data, index) =>
          <Legend key={index}>
            <Circle size={12} color={data.color} />
            <Text size={12} color="secondary" weight={500}>{data.label}</Text>
          </Legend>
        )}
      </ContainerWalletLegend>
      <ContainerWalletTransactions>
        <InfiniteScroll 
          content={{ data: walletDetails.transactions, loading: loadingWalletDetails }}
          fetch={{ function: fetchingMore, loading: fetchingMoreWalletDetails }}
          refresh={{ loading: reloadWalletDetails }}
          empty={{ icon: "file-invoice-dollar", message: "Nenhuma transação encontrada" }}
          item={{ component: (item, index) => <Card last={index === walletDetails.transactions?.length - 1} {...item} /> }}
        />
      </ContainerWalletTransactions>
    </Container>
  )
}
