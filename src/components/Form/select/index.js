import React, { useCallback, useEffect, useRef, useState } from 'react'
import { Container, ContainerSelect, Input, IconSelect, InputHidden, Error } from './styles'
import { useField } from '@unform/core'
import Text from '../../Text'
import _ from 'lodash';

import Options from './options'

export default function SelectInput(props) {
  const inputRef = useRef(null);

  const { fieldName, registerField, defaultValue, error } = useField(props.name);

  const [modal, setModal] = useState(false)
  const [optionLabel, setOptionLabel] = useState('')

  useEffect(() => {
    if (props.showModal) setModal(true)
  }, [props.showModal])

  useEffect(() => {
    if (inputRef.current) inputRef.current.value = defaultValue || props.value;
  }, [defaultValue, props.value])

  useEffect(() => {
    registerField({
      name: fieldName,
      ref: inputRef.current,
      getValue() {
        if (inputRef.current) return inputRef.current.value;

        return '';
      },
      setValue(ref, value) {
        if (inputRef.current) {
          inputRef.current.setNativeProps({ text: value });
          inputRef.current.value = value;
        }
      },
      clearValue() {
        if (inputRef.current) {
          inputRef.current.setNativeProps({ text: '' });
          inputRef.current.value = '';
        }
      }
    });
  }, [fieldName, registerField]);

  const handleChangeText = useCallback((text) => {
    if (inputRef.current) inputRef.current.value = text;
    if (props.onChangeText) props.onChangeText(text);
  }, [props.onChangeText, inputRef.current])

  useEffect(() => {
    if (!props.value && props.value !== "") return setOptionLabel('')

    const item = _.find(props.options, (data) => data[Object.keys(data)] === props.value)

    setOptionLabel(Object.keys(item || "")[0])
  }, [props.value, props.options])

  return (
    <Container labelOut={props.labelOut} error={error}>
      {!!props.labelOut && <Text width='100%' color='secondary' bold mb={5}>{props.label}</Text>}
      <InputHidden ref={inputRef} value={defaultValue || props.value} onChange={handleChangeText} />
      <ContainerSelect error={error} activeOpacity={1} onPress={() => !props.disabled && setModal(true)} {...props}>
        <Input textColor={props.textColor}>
          <Text color={props.textColor || 'secondary'}>
            {optionLabel || (props.labelOut ? 'selecione' : props.label || props.placeholder)}
          </Text>
        </Input>
        <IconSelect name='angle-down' textColor={props.textColor} />
      </ContainerSelect>
      {!!error && <Error>{error}</Error>}
      <Options
        title={props.label || props.title}
        isVisible={modal}
        onClose={() => setModal(false)}
        options={props.options}
        setOptionValue={handleChangeText}
        setOptionLabel={setOptionLabel}
      />
    </Container>
  );
}
