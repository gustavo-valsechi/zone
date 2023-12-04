import React from "react";
import { Text, Button } from "../../../components"
import { Background, Content } from "./styles"
import { StatusBar } from "expo-status-bar"

export default function Start({ navigation }) {
    return (
        <>
            <StatusBar translucent />
            <Background source={require("../../../assets/start.jpg")}>
                <Content>
                    <Text size={25} bold lines={2} mb={40}>
                        Com a <Text bold size={26} color="tertiary">Zone</Text>,
                        sem preocupação
                    </Text>
                    <Button
                        label="COMEÇAR"
                        color="white-15"
                        onPress={() => navigation.navigate("Register")}
                        analytics={{ enabled: false }}
                    />
                    <Button
                        label={{ text: "já sou cadastrado", size: 15 }}
                        color="white-0"
                        onPress={() => navigation.navigate("Login")}
                        analytics={{ enabled: false }}
                    />
                </Content>
            </Background>
        </>
    )
}
