import React from "react";""""
import {Container, WifiOff} from "./styles";
import GlobalText from "../Text";
import {ActivityIndicator} from "react-native";

export function CheckConnection() {
    return (
        <Container>
            <WifiOff />
            <GlobalText bold size={15}>Aguardando conexão com a internet..</GlobalText>
            <ActivityIndicator size={'large'} style={{ position: 'absolute', bottom: 40 }} />
        </Container>
    )
}
