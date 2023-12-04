import React, { useRef } from "react"
import { Container, Form, Icon, Text } from "../../../components"
import { ContainerForm, Scroll, Support } from "./styles"
import { TouchableOpacity } from "react-native"
import { whatsapp } from "../../../utils"
import * as Yup from "yup"

export default function Register({ navigation }) {
    const formRef = useRef({})

    const onSubmit = async (data) => {
        try {
            const schema = Yup.object().shape({
                phone: Yup.string().required("Campo obrigatório!").matches(/^(?:(?:\(?[1-9][0-9]\)?)?\s?)?(?:((9\d|9)\d{4})-?(\d{4}))$/, "Telefone inválido!"),
                document_number: Yup.string().required("Campo obrigatório!").matches(/(\d{2}\.\d{3}\.\d{3}\/\d{4}-\d{2})|(\d{3}\.\d{3}\.\d{3}-\d{2})/, "CPF inválido!"),
                name: Yup.string().required("Campo obrigatório!"),
                email: Yup.string().required("Campo obrigatório!").email("E-mail inválido!"),
                password: Yup.string().required("Campo obrigatório!").min(6, "A senha deve conter no mínimo 6 caracteres"),
                password_confirm: Yup.string().required("Campo obrigatório!").oneOf([Yup.ref("password"), null],"Confirmação inválida!"),
            })
        
            await schema.validate(data, { abortEarly: false })
        
            formRef.current.setErrors({})
        
            navigation.navigate("Login")
        } catch (err) {
            if (err instanceof Yup.ValidationError) {
                const errorMessages = {}

                err.inner.forEach((error) => errorMessages[error.path] = error.message)
        
                formRef.current.setErrors(errorMessages)
            }
        }
    }

    return (
        <Container 
            header={{
                title: "Cadastro",
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
                        formRef={formRef}
                        onSubmit={onSubmit}
                        inputs={[
                            { name: "name", label: "Nome", maxLength: 255 },
                            { name: "document_number", label: "CPF", maxLength: 14 },
                            { name: "phone", label: "Telefone", maxLength: 15 },
                            { name: "email", label: "E-mail", maxLength: 255 },
                            { name: "password", label: "Senha", maxLength: 255 },
                            { name: "password_confirm", label: "Confirmação de senha", maxLength: 255 },
                        ]}
                        buttons={[
                            {
                                label: "confirmar",
                                onPress: () => formRef.current.submitForm(),
                            },
                            {
                                label: { text: "cancelar", color: "secondary" },
                                onPress: () => navigation.navigate("Start"),
                                color: "black-0"
                            }
                        ]}
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
