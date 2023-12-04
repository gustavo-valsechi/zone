import React, { useRef, useState } from "react"
import { Container, Form, Icon, Text } from "../../../components"
import { useAuth } from "../../../contexts/auth"
import { ContainerForm, Scroll, Support } from "./styles"
import { TouchableOpacity } from "react-native"
import { Refactoring, whatsapp } from "../../../utils"
import * as Yup from "yup"

export default function Login({ navigation }) {
    const formRef = useRef({})

    const { signIn, loadingSignIn } = useAuth()

    const [cpf, setCpf] = useState("")
    const [show, setShow] = useState(false)

    async function handleSubmit(data) {
        try {
            const schema = Yup.object().shape({
                username: Yup.string().matches(/(\d{2}\.\d{3}\.\d{3}\/\d{4}-\d{2})|(\d{3}\.\d{3}\.\d{3}-\d{2})/, "CPF inválido!").required("Campo obrigatório!"),
                password: Yup.string().required("Campo obrigatório!")
            })

            await schema.validate(data, { abortEarly: false })

            formRef.current.setErrors({})

            const body = {
                cpf: Refactoring.removeMask.docNumber(data.username),
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
            name: "username",
            label: "CPF",
            autoCapitalize: "none",
            keyboardType: "numeric",
            placeholder: "Ex.: 000.000.000-00",
            value: cpf,
            onChangeText: (value) => setCpf(Refactoring.mask.docNumber(value)),
            maxLength: 14
        },
        {
            name: "password",
            label: "Senha",
            maxLength: 255,
            placeholder: "••••••••••••••",
            type: show ? "text" : "password",
            icon: {
                name: show ? "eye-slash" : "eye",
                function: () => setShow(!show)
            }
        }
    ]

    const buttons = [
        {
            label: { text: "entrar" },
            onPress: () => formRef.current.submitForm(),
            loading: loadingSignIn
        }
    ]

    return (
        <Container 
            header={{
                title: "Login",
                left: {
                    function: () => navigation.navigate("Start"),
                    icon: "chevron-left"
                },
                right: {
                    function: () => whatsapp("48999100598"),
                    icon: {
                        name: "whatsapp",
                        size: 25
                    }
                }
            }}
        >
            <ContainerForm>
                <Scroll>
                    <Form
                        buttons={buttons}
                        formRef={formRef}
                        onSubmit={handleSubmit}
                        inputs={inputs}
                    />
                </Scroll>
                <Support>
                    <Text color="black-6" mb={5}>precisa de ajuda?</Text>
                    <TouchableOpacity activeOpacity={0.8} onPress={() => whatsapp("48999100598")}>
                        <Text color="primary" bold size={15}>
                            <Icon icon="whatsapp" color="primary" size={13} /> ajuda
                        </Text>
                    </TouchableOpacity>
                </Support>
            </ContainerForm>
        </Container>
    )
}
