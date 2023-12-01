import React from 'react'
import { Avatar, Icon, LoadingBar, Text } from '../../../../components'
import { Container, ContainerIcons, ContainerLabel, ContainerName, ContainerUser, Pressable } from './styles'
import { useAuth } from '../../../../contexts/auth'
import { useSelector } from "react-redux"

export default function Profile(props) {

  const { signOut } = useAuth()
  
  const { profile, loadingProfile } = useSelector((state) => state.profile)
  const { notifications } = useSelector((state) => state.notification)

  const badge_custom = `
    position: absolute;
    top: 0;
    right: 0;
  `;

  const badgePending = (pending) => {
    return `
      position: absolute;
      top: 1.45px;
      right: ${pending > 9 ? '2.2px' : '5.13px'};
    `;
  }

  return (
    <Container>
      <ContainerUser onPress={() => !loadingProfile && props.navigation.navigate('Profile')}>
        <Avatar loading={loadingProfile} white icon="user-alt" source={profile.foto_url} />
        <ContainerLabel>
          <Text>Olá,</Text>
          {loadingProfile
          ? <LoadingBar white width={150} mt={6.5} height={15} />
          : <ContainerName>
              <Text bold>{profile.nome}</Text>
              <Icon size={23} icon="chevron-right" />
            </ContainerName>}
        </ContainerLabel>
      </ContainerUser>
      <ContainerIcons>
        <Pressable onPress={() => props.navigation.navigate("Notifications")}>
          <Icon icon='bell-outline' />
          {notifications.unread > 0 &&
            <>
              <Icon icon='checkbox-blank-circle' size={15} color='red' custom={badge_custom} />
              <Text size={9} bold custom={badgePending(notifications.unread)}>
                {notifications.unread < 10 ? notifications.unread : '9+'}
              </Text>
            </>}
        </Pressable>
        <Pressable onPress={signOut}>
          <Icon pack="ionicons" mt={2} icon="log-out-outline"/>
        </Pressable>
      </ContainerIcons>
    </Container>
  );
}