import React, { useRef, useState } from 'react'
import { Container, Form, Icon, Text } from "../../../components"
import { useAuth } from "../../../contexts/auth"
import { useDispatch, useSelector } from "react-redux"
import { ContainerForm, Logo, Scroll, Alert, Support } from "./styles"
import { TouchableOpacity } from 'react-native'
import { Refactoring, whatsapp } from '../../../utils'
import * as Yup from 'yup'

import AuthActions from '../../../store/ducks/auth'

export default function Recovery({ navigation }) {
    const dispatch = useDispatch()
    const formRef = useRef(null)

    const { recoverPassword, resetPassword } = useAuth()

    const { recoveryStep, loadingRecoverPassword, loadingResetPassword } = useSelector(state => state.auth)

    const [phone, setPhone] = useState("")
    const [show, setShow] = useState(false)
    const [showConfirm, setShowConfirm] = useState(false)

    async function handleSubmit(data) {

        data.step = recoveryStep

        try {
            const schema = Yup.object().shape({
                phone: data.step === 1 && Yup.string().matches(/^(?:(?:\(?[1-9][0-9]\)?)?\s?)?(?:((9\d|9)\d{4})-?(\d{4}))$/, 'Telefone está incorreto').required('Campo obrigatório!'),

                token: data.step === 2 && Yup.string().min(4, 'O token deve conter 4 dígitos').max(4, 'O token deve conter 4 dígitos').required('Campo obrigatório!'),
                password: data.step === 2 && Yup.string().min(6, 'Mínimo 6 caracteres').required('Campo obrigatório!'),
                password_confirm: data.step === 2 && Yup.string().oneOf([Yup.ref('password'), null],'Confirmação inválida!').required('Campo obrigatório!'),
            })
            await schema.validate(data, { abortEarly: false })

            formRef.current.setErrors({})

            const step_1 = {
                clientInfo: Refactoring.removeMask.phone(data.phone)
            }

            const step_2 = {
                token: data.token,
                senha: data.password,
                senhaConfirmacao: data.password_confirm,
            }

            if (data.step === 1) return await recoverPassword(step_1)
            if (data.step === 2) return await resetPassword(step_2, navigation)
        } catch (err) {
            if (err instanceof Yup.ValidationError) {
                const errorMessages = {};
                err.inner.forEach((error) => {
                    errorMessages[error.path] = error.message;
                });

                formRef.current.setErrors(errorMessages);
            }
        }
    }

    const inputs = () => {
        let container = [
            {
                name: 'phone',
                label: 'Telefone',
                disabled: recoveryStep === 2,
                maxLength: 15,
                autoCapitalize: 'none',
                keyboardType: 'numeric',
                placeholder: 'Ex.: (00) 90000-0000',
                value: phone,
                onChangeText: (value) => setPhone(Refactoring.mask.phone(value)),
            }
        ]

        const step_2 = [
            {
                type: 'token',
                name: 'token',
                label: 'Token',
                numeric: true
            },
            {
                name: 'password',
                label: 'Senha',
                maxLength: 255,
                placeholder: '••••••••••••••',
                type: show ? 'text' : 'password',
                icon: {
                    name: show ? 'eye-slash' : 'eye',
                    function: () => setShow(!show)
                }
            },
            {
                name: 'password_confirm',
                label: 'Confirmação de senha',
                maxLength: 255,
                placeholder: '••••••••••••••',
                type: showConfirm ? 'text' : 'password',
                icon: {
                    name: showConfirm ? 'eye-slash' : 'eye',
                    function: () => setShowConfirm(!showConfirm)
                }
            }
        ]

        if (recoveryStep === 2) container = container.concat(step_2)

        return container
    }

    return (
        <Container 
            header={{
                title: 'Recuperar senha',
                left: {
                    function: () => {
                        navigation.navigate('Login')
                        dispatch(AuthActions.setRecoveryStep(1))
                    },
                    icon: 'chevron-left'
                },
                right: {
                    function: () => whatsapp('4834139822'),
                    icon: {
                        name: 'whatsapp',
                        size: 25
                    }
                }
            }}
        >
            <ContainerForm>
                <Scroll>
                    {recoveryStep === 1 && 
                        <>
                            <Logo source={require('../../../assets/logo.png')} />
                            <Text mb={20} size={14} bold color='primary'>Esqueceu sua senha?</Text>
                        </>}
                    {recoveryStep === 2 &&
                        <Alert>
                            <Text size={14} bold color='primary'>Atenção!</Text>
                            <Text lines={10} color='secondary' weight={500}>Verifique o token enviado para seu SMS e preencha os campos abaixo para resetar a senha.</Text>
                        </Alert>}
                    <Form
                        formRef={formRef}
                        onSubmit={handleSubmit}
                        inputs={inputs()}
                        buttons={[
                            {
                                label: { text: recoveryStep === 1 ? 'confirmar' : 'alterar senha' },
                                onPress: () => formRef.current.submitForm(),
                                loading: loadingRecoverPassword || loadingResetPassword,
                                analytics: { complement: recoveryStep === 1 ? "recuperacao_senha" : "" },
                            },
                            {
                                color: 'black-0',
                                label: { text: 'cancelar', color: 'secondary' },
                                onPress: () => {
                                    navigation.navigate('Login')
                                    dispatch(AuthActions.setRecoveryStep(1))
                                },
                                disabled: loadingRecoverPassword || loadingResetPassword,
                                analytics: { complement: "recuperacao_senha" },
                            }
                        ]}
                    />
                </Scroll>
                <Support>
                    <Text color='black-6' mb={5}>precisa de ajuda?</Text>
                    <TouchableOpacity activeOpacity={0.8} onPress={() => whatsapp('4834139822')}>
                        <Text color='primary' bold size={15}><Icon icon='whatsapp' color='primary' size={13} /> ajuda</Text>
                    </TouchableOpacity>
                </Support>
            </ContainerForm>
        </Container>
    )
}
