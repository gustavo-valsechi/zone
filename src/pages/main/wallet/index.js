import React, { useCallback, useEffect } from 'react'
import { InfiniteScroll } from '../../../components'
import { useDispatch, useSelector } from 'react-redux'
import { useAuth } from "../../../contexts/auth"

import WalletActions from '../../../store/ducks/wallet'

import Filters from './filters'
import Card from './card'

export default function Wallet(props) {
  const dispatch = useDispatch()

  const { token } = useAuth()

  const {
    wallet,
    walletPage,
    loadingWallet,
    fetchingMoreWallet,
    reloadWallet,
    filtersWallet,
    nameWallet,
  } = useSelector((state) => state.wallet)

  useEffect(() => {
    dispatch(WalletActions.setClearWalletGroupContent())
    dispatch(WalletActions.setClearWalletDetailsContent())
    dispatch(WalletActions.setClearWalletFilters())
    dispatch(WalletActions.setWalletPage(0))
  }, [dispatch])

  useEffect(() => {
    if (props.expanded || !nameWallet) return

    dispatch(WalletActions.setClearWalletFilters())
  }, [dispatch, props.expanded, nameWallet])

  const getWallet = useCallback(() => {
    if (!token) return

    const credentials = {
      ...filtersWallet,
      filter: nameWallet || undefined,
      offset: walletPage,
      limit: 20,
    }
    
    dispatch(WalletActions.walletRequest(credentials))
  }, [dispatch, walletPage, filtersWallet, nameWallet, token])

  useEffect(() => {
    getWallet()
  }, [getWallet])

  const fetchingMore = () => {
    if (!wallet.totalPage || wallet.totalPage === (walletPage + 1)) return

    dispatch(WalletActions.setFetchingMoreWallet(true))
    dispatch(WalletActions.setWalletPage(walletPage + 1))
  }

  const reload = () => {
    dispatch(WalletActions.setReloadWallet(true))
    dispatch(WalletActions.setWalletPage(0))
    getWallet()
  }

  return (
    <>
      {props.expanded && <Filters disabled={loadingWallet && !fetchingMoreWallet && !reloadWallet} />}
      <InfiniteScroll 
        content={{ data: wallet.content, loading: loadingWallet }}
        fetch={{ function: fetchingMore, loading: fetchingMoreWallet }}
        refresh={{ function: reload, loading: reloadWallet }}
        item={{ component: (item) => <Card navigation={props.navigation} {...item} /> }}
        empty={{
          icon: "wallet",
          message: "Nenhum cashback encontrado, consulte os estabelecimentos mais próximos",
          button: {
            color: "tertiary",
            label: { text: "ver estabelecimentos", color: "primary" }, 
            onPress: () => props.navigation.navigate('Location')
          }
        }}
      />
    </>
  )
}
