import React from "react";
import { Container, GlobalModal, Title, ButtonsContainer, Scroll } from "./styles";
import Button from "../Form/button";

export default function Modal(props) {
    return (
        <GlobalModal isVisible={props.isVisible} onBackdropPress={props.onBackdropPress}>
            <Container {...props}>
                {!!props.title && <Title>{props.title}</Title>}
                <Scroll>{props.children}</Scroll>
                <ButtonsContainer>
                    {props.buttons?.map((button, key) => !button.hide && 
                        <Button key={key} {...button} />
                    )}
                </ButtonsContainer>
            </Container>
        </GlobalModal>
    );
}
