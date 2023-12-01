import React, { useEffect, useRef, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Filter } from '../../../components'
import * as Yup from 'yup'
import _ from 'lodash'

import EstablishmentActions from '../../../store/ducks/establishment'

export default function Filters(props) {
  const dispatch = useDispatch()
  const formRef = useRef({})

  const { 
    modalFiltersEstablishment, 
    ufEstablishment, 
    cityEstablishment, 
    ufCityLocation,
    loadingUfCityLocation
  } = useSelector((state) => state.establishment)

  const [TimeOut, setTimeOut] = useState(0)

  useEffect(() => {
    dispatch(EstablishmentActions.setClearEstablishmentFilters())
  }, [dispatch])

  useEffect(() => {
    dispatch(EstablishmentActions.ufCityLocationRequest({ uf: ufEstablishment || undefined }))
  }, [dispatch, ufEstablishment])

  async function handleSubmit(data) {
    try {
      const schema = Yup.object().shape({
        uf: Yup.string(),
        city: Yup.string(),
      })

      await schema.validate(data, { abortEarly: false })

      formRef.current.setErrors({})

      dispatch(EstablishmentActions.setLocationPage(0))
      dispatch(EstablishmentActions.setFiltersEstablishment(data))
      dispatch(EstablishmentActions.setModalFiltersEstablishment(false))
    } catch (err) {
      if (err instanceof Yup.ValidationError) {
        const errorMessages = {}
        err.inner.forEach((error) => {
          errorMessages[error.path] = error.message
        })

        formRef.current.setErrors(errorMessages)
      }
    }
  }

  const inputs = [
    {
      type: 'select',
      name: 'uf',
      label: 'UF',
      value: ufEstablishment,
      onChangeText: (value) => {
        dispatch(EstablishmentActions.setCityEstablishment(""))
        dispatch(EstablishmentActions.setUfEstablishment(value))
      },
      options: _.map(ufCityLocation.uf, (data) => ({ [data.label]: data.value })),
      disabled: loadingUfCityLocation
    },
    {
      type: 'select',
      name: 'city',
      label: 'Cidade',
      value: cityEstablishment,
      options: _.map(ufCityLocation.city, (data) => ({ [data.label]: data.value })),
      disabled: loadingUfCityLocation
    }
  ]

  return <Filter
    formRef={formRef}
    onSubmit={handleSubmit}
    inputs={inputs}
    search={{
      disabled: props.disabled,
      onChangeText: (value) => {
        if (TimeOut) clearTimeout(TimeOut)
       
        setTimeOut(setTimeout(() => {
          dispatch(EstablishmentActions.setNameEstablishment(value))
        }, 500))
      }
    }}
    modal={{
      enabled: props.denied,
      location: "establishments",
      visible: modalFiltersEstablishment,
      onToggle: () => dispatch(EstablishmentActions.setModalFiltersEstablishment(!modalFiltersEstablishment)),
      onClear: () => dispatch(EstablishmentActions.setClearEstablishmentFilters()),
    }}
  />
}
