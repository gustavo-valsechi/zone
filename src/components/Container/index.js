import React from "react"
import { StatusBar } from "expo-status-bar"
import { ContainerNummus, SafeArea } from "./styles"
import Header from "../Header"

export default function Container(props) {
    return (
        <SafeArea neverSafeAreaTop={props.neverSafeAreaTop} color={props.color === "transparent" ? undefined : props.color}>
            <StatusBar translucent />
            <ContainerNummus color={props.color === "transparent" ? undefined : props.color}>
                {!!props.header &&
                    <Header
                        color={props.color === "transparent" ? undefined : props.color}
                        title={props.header?.title}
                        left={props.header?.left}
                        right={props.header?.right}
                    />}
                {props.children}
            </ContainerNummus>
        </SafeArea>
    )
}
