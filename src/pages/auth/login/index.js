import React, { useRef, useState } from 'react'
import { Container, Form, Icon, Text } from "../../../components"
import { useAuth } from "../../../contexts/auth"
import { ContainerForm, Logo, Scroll, Support } from "./styles"
import { TouchableOpacity } from 'react-native'
import { Refactoring, whatsapp } from '../../../utils'
import * as Yup from 'yup'

export default function Login({ navigation }) {
    const formRef = useRef({})

    const { signIn, loadingSignIn } = useAuth()

    const [phone, setPhone] = useState("")
    const [show, setShow] = useState(false)

    async function handleSubmit(data) {
        try {
            const schema = Yup.object().shape({
                username: Yup.string().matches(/^(?:(?:\(?[1-9][0-9]\)?)?\s?)?(?:((9\d|9)\d{4})-?(\d{4}))$/, 'Telefone está incorreto').required('Campo obrigatório!'),
                password: Yup.string().required('Campo obrigatório!')
            })

            await schema.validate(data, { abortEarly: false })

            formRef.current.setErrors({})

            const body = {
                phone: Refactoring.removeMask.phone(data.username),
                password: data.password,
            }

            await signIn(body)
        } catch (err) {
            if (err instanceof Yup.ValidationError) {
                const errorMessages = {}
                err.inner.forEach((error) => {
                    errorMessages[error.path] = error.message
                });

                formRef.current.setErrors(errorMessages)
            }
        }
    }

    const inputs = [
        {
            name: 'username',
            label: 'Telefone',
            autoCapitalize: 'none',
            keyboardType: 'numeric',
            placeholder: 'Ex.: (00) 90000-0000',
            value: phone,
            onChangeText: (value) => setPhone(Refactoring.mask.phone(value)),
            maxLength: 15
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
        }
    ]

    const buttons = [
        {
            label: { text: 'entrar' },
            onPress: () => formRef.current.submitForm(),
            loading: loadingSignIn
        },
        {
            color: 'black-0',
            label: { text: 'esqueci minha senha', color: 'secondary' },
            onPress: () => navigation.navigate('Recovery'),
            disabled: loadingSignIn
        }
    ]

    return (
        <Container 
            header={{
                title: 'Login',
                left: {
                    function: () => navigation.navigate('Start'),
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
                <Logo source={require('../../../assets/logo.png')} />
                <Scroll>
                    <Form
                        buttons={buttons}
                        formRef={formRef}
                        onSubmit={handleSubmit}
                        inputs={inputs}
                    />
                </Scroll>
                <Support>
                    <Text color='black-6' mb={5}>precisa de ajuda?</Text>
                    <TouchableOpacity activeOpacity={0.8} onPress={() => whatsapp('4834139822')}>
                        <Text color='primary' bold size={15}>
                            <Icon icon='whatsapp' color='primary' size={13} /> ajuda
                        </Text>
                    </TouchableOpacity>
                </Support>
            </ContainerForm>
        </Container>
    )
}
