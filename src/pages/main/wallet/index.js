import React from 'react'
import { InfiniteScroll } from '../../../components'

import Filters from './filters'
import Card from './card'

export default function Wallet(props) {

  const loadingWallet = false
  const fetchingMoreWallet = false
  const reloadWallet = false

  const wallet = { 
    total: 0,
    totalPage: 0,
    content: [] 
  }

  return (
    <>
      {props.expanded && <Filters disabled={loadingWallet && !fetchingMoreWallet && !reloadWallet} />}
      <InfiniteScroll 
        content={{ data: wallet.content, loading: loadingWallet }}
        fetch={{ function: () => {}, loading: fetchingMoreWallet }}
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
