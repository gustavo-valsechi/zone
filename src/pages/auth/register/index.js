import React, { useEffect, useRef, useState } from "react"
import { Container, Form, Icon, Steps, Text } from "../../../components"
import { useDispatch, useSelector } from "react-redux"
import { ContainerForm, Scroll, Support } from "./styles"
import { TouchableOpacity } from "react-native"
import { Refactoring, whatsapp } from "../../../utils"
import { Platform } from "react-native"
import moment from "moment"
import * as Yup from "yup"

import AuthActions from "../../../store/ducks/auth"

const BUTTON_LABEL = {
    "1": "enviar token",
    "2": "verificar",
    "3": "continuar",
    "4": "finalizar"
}

export default function Register({ navigation }) {
    const dispatch = useDispatch()
    const formRef = useRef(null)

    const { 
        registrationStep, 
        registerCustomer,
        resendTokenTimer,
        loadingRegistrationComplete,
        loadingRegistrationToken,
        loadingRegistrationTokenVerification,
        loadingRegistrationInformations,
    } = useSelector(state => state.auth)

    const [phone, setPhone] = useState("")
    const [documentNumber, setDocumentNumber] = useState("")
    const [birthdate, setBirthdate] = useState("")
    const [gender, setGender] = useState("N/I")

    const [show, setShow] = useState(false)
    const [showConfirm, setShowConfirm] = useState(false)
    const [terms, setTerms] = useState(false)

    useEffect(() => {
        if (!resendTokenTimer || registrationStep < 2) return

        setTimeout(() => {
            dispatch(AuthActions.setResendTokenTimer(resendTokenTimer - 1))
        }, 1000)
    }, [resendTokenTimer, registrationStep])

    useEffect(() => {
        if (!registerCustomer.id || !formRef.current || registrationStep !== 3) return 

        formRef.current.setData({
            name: registerCustomer.nome || "",
            birthday: registerCustomer.dt_nasc ? moment(registerCustomer.dt_nasc, "YYYY-MM-DD").format("DD/MM/YYYY") : "",
            email: registerCustomer.email || "",
            gender: registerCustomer.genero || "N/I",
        })

        setGender(registerCustomer.genero || "N/I")
    }, [formRef, registerCustomer, registrationStep])

    async function handleSubmit(data) {

        data.step = registrationStep
    
        const birthday = moment(data.birthday, "DD/MM/YYYY").format("YYYY-MM-DD")
    
        try {
            const schema = Yup.object().shape({
                phone: Yup.string().when("step", {
                    is: 1,
                    then: Yup.string().required("Campo obrigatório!").matches(/^(?:(?:\(?[1-9][0-9]\)?)?\s?)?(?:((9\d|9)\d{4})-?(\d{4}))$/, "Telefone inválido!")
                }),
                document_number: Yup.string().when("step", {
                    is: 1,
                    then: Yup.string().required("Campo obrigatório!").matches(/(\d{2}\.\d{3}\.\d{3}\/\d{4}-\d{2})|(\d{3}\.\d{3}\.\d{3}-\d{2})/, "CPF inválido!")
                }),
        
                token: Yup.string().when("step", {
                    is: 2,
                    then: Yup.string().required("Campo obrigatório!").min(4, "Mínimo 4 dígitos").max(4, "Máximo 4 dígitos")
                }),
        
                name: Yup.string().when("step", {
                    is: 3,
                    then: Yup.string().required("Campo obrigatório!")
                }),
        
                email: Yup.string().when("step", {
                    is: 3,
                    then: Yup.string().required("Campo obrigatório!").email("E-mail inválido!")
                }),
                birthday: Yup.string().when("step", {
                    is: 3,
                    then: Yup.string().required("Campo obrigatório!")
                }),
                gender: Yup.string().when("step", {
                    is: 3,
                    then: Yup.string().required("Campo obrigatório!")
                }),
        
                password: Yup.string().when("step", {
                    is: 4,
                    then: Yup.string().required("Campo obrigatório!").min(6, "A senha deve conter no mínimo 6 caracteres")
                }),
                password_confirm: Yup.string().when("step", {
                    is: 4,
                    then: Yup.string().required("Campo obrigatório!").oneOf([Yup.ref("password"), null],"Confirmação inválida!")
                }),
            })
        
            await schema.validate(data, { abortEarly: false })
        
            formRef.current.setErrors({})
        
            if (birthday === "Data inválida" && data.step === 3)
                return formRef.current.setErrors({ birthday: "Data inválida" })
        
            const step_one_body = { 
                phone: Refactoring.removeMask.phone(data.phone), 
                document_number: Refactoring.removeMask.docNumber(data.document_number) 
            }
            
            const step_two_body = {
                token: data.token,
            }
        
            const step_three_body = {
                name: data.name,
                birthday: birthday,
                email: data.email?.toLowerCase(),
                gender: data.gender,
            }
        
            const step_four_body = {
                password: data.password,
                terms_of_use: terms ? "S" : "N",
                platform: Platform.OS
            }
        
            if (data.step === 1) return dispatch(AuthActions.registrationTokenRequest(step_one_body))
            if (data.step === 2) return dispatch(AuthActions.registrationTokenVerificationRequest(step_two_body))
            if (data.step === 3) return dispatch(AuthActions.registrationInformationsRequest(step_three_body))
            if (data.step === 4) return dispatch(AuthActions.registrationCompleteRequest(step_four_body, navigation))
        } catch (err) {
            if (err instanceof Yup.ValidationError) {
                const errorMessages = {}
                err.inner.forEach((error) => {
                    errorMessages[error.path] = error.message
                })
        
                if (birthday === "Data inválida" && data.step === 3)
                    return formRef.current.setErrors({ birthday: "Data inválida", ...errorMessages })
        
                formRef.current.setErrors(errorMessages)
            }
        }
    }

    const submitSecondary = () => {
        if (registrationStep === 2) return dispatch(AuthActions.registrationTokenRequest({ 
            phone: Refactoring.removeMask.phone(phone),
            document_number: Refactoring.removeMask.docNumber(documentNumber) 
        }))
        if (registrationStep === 4) return dispatch(AuthActions.setRegistrationStep(3))
    }

    const close = () => {
        navigation.navigate("Start")
        dispatch(AuthActions.setRegistrationStep(1))
        dispatch(AuthActions.setRegisterCustomer({}))
    }

    return (
        <Container 
            header={{
                title: "Cadastro",
                left: {
                    function: close,
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
                <Steps 
                    steps={[
                        { icon: "phone", label: "telefone" },
                        { icon: "lock", label: "token" },
                        { icon: "info", label: "informações" },
                        { icon: "unlock-alt", label: "senha" },
                    ]} 
                    currentStep={registrationStep}
                />
                <Scroll>
                    <Form
                        formRef={formRef}
                        onSubmit={handleSubmit}
                        inputs={[
                            {
                                hide: registrationStep !== 1,
                                name: "phone",
                                label: "Telefone",
                                placeholder: "Ex.: (00) 90000-0000",
                                value: phone,
                                onChangeText: (value) => setPhone(Refactoring.mask.phone(value)),
                                required: true,
                                maxLength: 15,
                                keyboardType: "numeric",
                                disabled: loadingRegistrationToken
                            },
                            {
                                hide: registrationStep !== 1,
                                name: "document_number",
                                label: "CPF",
                                placeholder: "Ex.: 000.000.000-00",
                                value: documentNumber,
                                onChangeText: (value) => setDocumentNumber(Refactoring.mask.docNumber(value)),
                                required: true,
                                maxLength: 18,
                                keyboardType: "numeric",
                                disabled: loadingRegistrationToken
                            },
                            {
                                hide: registrationStep !== 2,
                                type: "token",
                                name: "token",
                                label: "Token",
                                required: true,
                                maxLength: 4,
                                numeric: true,
                                disabled: loadingRegistrationTokenVerification
                            },
                            {
                                hide: registrationStep !== 3,
                                name: "name",
                                label: "Nome completo",
                                placeholder: "Informe seu nome",
                                required: true,
                                maxLength: 255,
                                keyboardType: "default",
                                disabled: loadingRegistrationInformations
                            },
                            {
                                hide: registrationStep !== 3,
                                name: "email",
                                label: "E-mail",
                                placeholder: "Ex.: exemplo@nummus.com.br",
                                autoCapitalize: "none",
                                required: true,
                                maxLength: 255,
                                keyboardType: "email-address",
                                disabled: loadingRegistrationInformations
                            },
                            {
                                hide: registrationStep !== 3,
                                name: "birthday",
                                label: "Data de nascimento",
                                placeholder: "__/__/____",
                                value: birthdate,
                                onChangeText: (value) => setBirthdate(Refactoring.mask.date(value)),
                                required: true,
                                maxLength: 10,
                                keyboardType: "numeric",
                                disabled: loadingRegistrationInformations
                            },
                            {
                                hide: registrationStep !== 3,
                                name: "gender",
                                type: "select",
                                label: "Gênero",
                                value: gender,
                                disabled: loadingRegistrationInformations,
                                options: [
                                    { "Masculino": "M" },
                                    { "Feminino": "F" },
                                    { "Não informar": "N/I" },
                                ],
                            },
                            {
                                hide: registrationStep !== 4,
                                name: "password",
                                label: "Senha",
                                maxLength: 255,
                                placeholder: "••••••••••••••",
                                disabled: loadingRegistrationComplete,
                                type: show ? "text" : "password",
                                icon: {
                                    name: show ? "eye-slash" : "eye",
                                    function: () => setShow(!show)
                                }
                            },
                            {
                                hide: registrationStep !== 4,
                                name: "password_confirm",
                                label: "Confirmação de senha",
                                disabled: loadingRegistrationComplete,
                                maxLength: 255,
                                placeholder: "••••••••••••••",
                                type: showConfirm ? "text" : "password",
                                icon: {
                                    name: showConfirm ? "eye-slash" : "eye",
                                    function: () => setShowConfirm(!showConfirm)
                                }
                            },
                            {
                                hide: registrationStep !== 4,
                                name: "terms",
                                type: "checkbox",
                                value: terms,
                                onChangeText: setTerms,
                                disabled: loadingRegistrationComplete,
                                label: <>
                                    Eu li e concordo com os{" "}
                                    <Text 
                                        bold 
                                        color="primary"
                                        onPress={() => Refactoring.link.open(
                                            "https://s3.sa-east-1.amazonaws.com/cashback.prod.nummus/Termos+Condic%CC%A7o%CC%83es+de+Uso+NUMMUS+__+CONSUMIDOR.docx.pdf"
                                        )}
                                    >
                                        termos de uso{" "}
                                    </Text>
                                    e com a{" "}
                                    <Text 
                                        bold 
                                        color="primary"
                                        onPress={() => Refactoring.link.open(
                                            "https://s3.sa-east-1.amazonaws.com/cashback.prod.nummus/TERMO+DE+CONSENTIMENTO+PARA+ARMAZENAMENTO+E+TRATAMENTO+DE+DADOS+PESSOAIS+EM+CONFORMIDADE+COM+A+LEI+N%C2%BA+13+(1).docx+(2).pdf"
                                        )}
                                    >
                                        lei geral de proteção de dados
                                    </Text>
                                </>
                            },
                        ]}
                        buttons={[
                            {
                                label: BUTTON_LABEL[registrationStep],
                                onPress: () => formRef.current.submitForm(),
                                loading: (loadingRegistrationComplete && registrationStep === 4) 
                                    || (loadingRegistrationToken && registrationStep === 1) 
                                    || (loadingRegistrationTokenVerification && registrationStep === 2) 
                                    || (loadingRegistrationInformations && registrationStep === 3),
                                disabled: loadingRegistrationComplete 
                                    || loadingRegistrationToken 
                                    || loadingRegistrationTokenVerification 
                                    || loadingRegistrationInformations 
                                    || (registrationStep === 4 && !terms)
                            },
                            {
                                hide: registrationStep !== 2 && registrationStep !== 4,
                                color: "white-0",
                                label: { 
                                    text: registrationStep === 2 ? "reenviar token" : "voltar", 
                                    color: "secondary",
                                    timer: registrationStep === 2 ? resendTokenTimer : undefined
                                },
                                onPress: submitSecondary,
                                analytics: { enabled: false },
                                loading: loadingRegistrationToken,
                                disabled: loadingRegistrationComplete 
                                    || loadingRegistrationToken 
                                    || loadingRegistrationTokenVerification 
                                    || (registrationStep === 2 && resendTokenTimer)
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
