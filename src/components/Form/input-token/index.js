import React, {useEffect, useRef, useState} from 'react';
import {useField} from '@unform/core';
import {Container, InputContainer, Error, Input, InputHidden } from './styles'
import Text from '../../Text'

export default function InputToken({ name, onChangeText, className, label, numeric }) {

    const inputRef = useRef(null);

    const dgOneRef = useRef(null);
    const dgTwoRef = useRef(null);
    const dgThreeRef = useRef(null);
    const dgFourRef = useRef(null);

    const {fieldName, registerField, error} = useField(name);

    const [digit_1, setDigit1] = useState('')
    const [digit_2, setDigit2] = useState('')
    const [digit_3, setDigit3] = useState('')
    const [digit_4, setDigit4] = useState('')

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
    }, [fieldName, registerField])

    useEffect(() => {
        const value = digit_1 + digit_2 + digit_3 + digit_4

        if (inputRef.current) inputRef.current.value = value
        if (onChangeText) onChangeText(value)
    }, [inputRef, onChangeText, digit_1, digit_2, digit_3, digit_4])

    const _setDigitOne = (value) => {
        setDigit1(value.nativeEvent.text)

        if (value.nativeEvent.text) dgTwoRef.current.focus()
    }

    const _setDigitTwo = (value) => {
        setDigit2(value.nativeEvent.text)

        if (value.nativeEvent.text) return dgThreeRef.current.focus()

        dgOneRef.current.focus()
    }

    const _setDigitThree = (value) => {
        setDigit3(value.nativeEvent.text)

        if (value.nativeEvent.text) return dgFourRef.current.focus()

        dgTwoRef.current.focus()
    }

    const _setDigitFour = (value) => {
        setDigit4(value.nativeEvent.text)

        if (!value.nativeEvent.text) dgThreeRef.current.focus()
    }

    return (
        <Container label={label} error={error}>
            {label && <Text color='secondary' bold mb={5}>{label}</Text>}
            <InputContainer className={className} error={error} label={label}>
                <Input
                    value={digit_1}
                    onChange={_setDigitOne}
                    autoComplete="off"
                    keyboardType={numeric ? 'numeric' : undefined}
                    autoCapitalize='none'
                    maxLength={1}
                    ref={dgOneRef}
                    error={error}
                />
                <Input
                    value={digit_2}
                    onChange={_setDigitTwo}
                    autoComplete="off"
                    keyboardType={numeric ? 'numeric' : undefined}
                    autoCapitalize='none'
                    maxLength={1}
                    ref={dgTwoRef}
                    error={error}
                />
                <Input
                    value={digit_3}
                    onChange={_setDigitThree}
                    autoComplete="off"
                    keyboardType={numeric ? 'numeric' : undefined}
                    autoCapitalize='none'
                    maxLength={1}
                    ref={dgThreeRef}
                    error={error}
                />
                <Input
                    value={digit_4}
                    onChange={_setDigitFour}
                    autoComplete="off"
                    keyboardType={numeric ? 'numeric' : undefined}
                    autoCapitalize='none'
                    maxLength={1}
                    ref={dgFourRef}
                    error={error}
                />
                <InputHidden ref={inputRef} />
            </InputContainer>
            {error && <Error>{error}</Error>}
        </Container>
    )
}
