import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { Filter } from '../../../../components'

import WalletActions from '../../../../store/ducks/wallet'

export default function Filters(props) {
  const dispatch = useDispatch()

  const [TimeOut, setTimeOut] = useState(0)

  return <Filter
    search={{
      disabled: props.disabled,
      onChangeText: (value) => {
        if (TimeOut) clearTimeout(TimeOut)

        setTimeOut(setTimeout(() => {
          dispatch(WalletActions.setNameWallet(value))
        }, 500))
      }
    }}
  />
}
