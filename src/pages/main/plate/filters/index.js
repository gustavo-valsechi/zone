import React, { useState } from "react"
import { useDispatch } from "react-redux"
import { Filter } from "../../../../components"

export default function Filters(props) {

  const [timeOut, setTimeOut] = useState(0)

  return <Filter
    search={{
      disabled: props.disabled,
      onChangeText: (value) => {
        if (timeOut) clearTimeout(timeOut)

        setTimeOut(setTimeout(() => {
          
        }, 500))
      }
    }}
  />
}
