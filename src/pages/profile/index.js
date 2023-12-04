import React from "react"
import { Avatar, Button, Container, Icon, Text } from "../../components"
import { useAuth } from "../../contexts/auth"
import { ContainerActions, ContainerContent, ContainerName, ContainerProfile, ContainerProfileHeader, Content } from "./styles"
import { Refactoring } from "../../utils"
import _ from "lodash"

export default function Profile({ navigation }) {

  const { signOut, profile, loadingProfile } = useAuth()

  const content = [
    { "phone": Refactoring.mask.phone(profile.phone) || "Sem CPF/CNPJ cadastrado" },
    { "envelope": profile.email || "Sem E-mail cadastrado" },
  ]

  return (
    <Container
      header={{
        title: "Meu perfil",
        left: {
          function: navigation.goBack,
          icon: "chevron-left"
        },
        right: {
          function: signOut,
          icon: {
            pack: "ionicons",
            name: "log-out-outline"
          }
        }
      }}
    >
      <ContainerProfile>
        <ContainerProfileHeader>
          <Avatar size={60} source={profile.photo} loading={loadingProfile} />
          <ContainerName>
            <Text color="secondary" bold size={16}>{profile.name}</Text>
            <Text color="secondary">{Refactoring.mask.docNumber(profile.cpf) || "Sem CPF cadastrado"}</Text>
          </ContainerName>
        </ContainerProfileHeader>
        <ContainerContent>
          {_.map(content, (data, index) =>
            <Content key={index}>
              <Icon 
                color="secondary" 
                pack="fontAwesome5" 
                icon={Object.keys(data)[0]} 
                size={14} 
                mr={10}
              />
              <Text weight={500} color="secondary" size={14}>
                {Object.values(data)[0]}
              </Text>
            </Content>
          )}
          <ContainerActions>
            <Button 
              icon="user-alt"
              label="alterar perfil" 
              onPress={() => {}}
            />
            <Button 
              icon={{ name: "lock", color: "primary" }}
              label={{ text: "alterar senha", color: "primary" }} 
              color="tertiary" 
              onPress={() => {}}
            />
            <Button 
              icon={{ name: "log-out-outline", color: "secondary", pack: "ionicons" }}
              label={{ text: "sair", color: "secondary" }}  
              analytics={{ enabled: false }}
              color="white" 
              onPress={signOut}
            />
          </ContainerActions>
        </ContainerContent>
      </ContainerProfile>
    </Container>
  )
}