import React from 'react'
import { Avatar, Button, Container, Icon, Text } from '../../components'
import { useAuth } from '../../contexts/auth'
import { ContainerActions, ContainerContent, ContainerName, ContainerProfile, ContainerProfileHeader, Content } from './styles'
import { useSelector } from "react-redux"
import { Refactoring } from '../../utils'
import _ from 'lodash'

const GENDER = {
  "M": "Masculino",
  "F": "Feminino",
  "N/I": "Não informado",
}

export default function Profile({ navigation }) {

  const { signOut } = useAuth()

  const { profile, loadingProfile } = useSelector((state) => state.profile)

  const content = [
    { "id-card": Refactoring.mask.docNumber(profile.cpf_cnpj) || "Sem CPF/CNPJ cadastrado" },
    { "envelope": profile.email || "Sem E-mail cadastrado" },
    { "gift": Refactoring.format.date(profile.dt_nasc) || "Sem data de aniversário cadastrada" },
    { "transgender-alt": GENDER[profile.genero] || "Não informado" },
  ]

  return (
    <Container
      header={{
        title: 'Meu perfil',
        left: {
          function: navigation.goBack,
          icon: 'chevron-left'
        },
        right: {
          function: signOut,
          icon: {
            pack: 'ionicons',
            name: 'log-out-outline'
          }
        }
      }}
    >
      <ContainerProfile>
        <ContainerProfileHeader>
          <Avatar size={60} source={profile.foto_url} loading={loadingProfile} />
          <ContainerName>
            <Text color="secondary" bold size={16}>{profile.nome}</Text>
            <Text color="secondary">{Refactoring.mask.phone(profile.telefone) || "Sem telefone cadastrado"}</Text>
          </ContainerName>
        </ContainerProfileHeader>
        <ContainerContent>
          {_.map(content, (data, index) =>
            <Content key={index}>
              <Icon 
                color="secondary" 
                pack="fontAwesome5" 
                icon={Object.keys(data)[0]} 
                size={15} 
                mr={10}
              />
              <Text weight={500} color="secondary" size={15}>
                {Object.values(data)[0]}
              </Text>
            </Content>
          )}
          <ContainerActions>
            <Button 
              icon="user-alt"
              label="alterar perfil" 
              onPress={() => navigation.navigate('ProfileUpdate')}
            />
            <Button 
              icon={{ name: "lock", color: "primary" }}
              label={{ text: "alterar senha", color: "primary" }} 
              color="tertiary" 
              onPress={() => navigation.navigate('ChangePassword')}
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