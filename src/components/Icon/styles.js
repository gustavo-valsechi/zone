import styled from 'styled-components/native'
import Colors from '../../styles/Colors'

import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons'
import FontAwesome5Icons from '@expo/vector-icons/FontAwesome5'
import FontAwesomeIcons from '@expo/vector-icons/FontAwesome'
import FeatherIcons from '@expo/vector-icons/Feather'
import OctIcons from '@expo/vector-icons/Octicons'
import IonIcons from '@expo/vector-icons/Ionicons'
import EvilIcons from '@expo/vector-icons/EvilIcons'
import MaterialIcons from '@expo/vector-icons/MaterialIcons'
import FontistoIcons from '@expo/vector-icons/Fontisto'
import AntDesignIcons from '@expo/vector-icons/AntDesign'

export const AntDesign = styled(AntDesignIcons).attrs((props) => ({
  name: props.icon,
  size: props.size || 25
}))`
  color: ${props => Colors[props.color || 'white']};
  margin-right: ${props => props.mr || '0'}px;
  margin-left: ${props => props.ml || '0'}px;
  margin-top: ${props => props.mt || '0'}px;
  margin-bottom: ${props => props.mb || '0'}px;
  text-align: ${props => props.align || 'left'};
  flex: ${props => props.flex || 'none'};
  ${props => props.custom}
`;

export const MaterialIcon = styled(MaterialCommunityIcons).attrs((props) => ({
  name: props.icon,
  size: props.size || 25
}))`
  color: ${props => Colors[props.color || 'white']};
  margin-right: ${props => props.mr || '0'}px;
  margin-left: ${props => props.ml || '0'}px;
  margin-top: ${props => props.mt || '0'}px;
  margin-bottom: ${props => props.mb || '0'}px;
  text-align: ${props => props.align || 'left'};
  flex: ${props => props.flex || 'none'};
  ${props => props.custom}
`;

export const Material = styled(MaterialIcons).attrs((props) => ({
  name: props.icon,
  size: props.size || 25
}))`
  color: ${props => Colors[props.color || 'white']};
  margin-right: ${props => props.mr || '0'}px;
  margin-left: ${props => props.ml || '0'}px;
  margin-top: ${props => props.mt || '0'}px;
  margin-bottom: ${props => props.mb || '0'}px;
  text-align: ${props => props.align || 'left'};
  flex: ${props => props.flex || 'none'};
  ${props => props.custom}
`;

export const FontAwesome5 = styled(FontAwesome5Icons).attrs((props) => ({
  name: props.icon,
  size: props.size || 25
}))`
  color: ${props => Colors[props.color || 'white']};
  margin-right: ${props => props.mr || '0'}px;
  margin-left: ${props => props.ml || '0'}px;
  margin-top: ${props => props.mt || '0'}px;
  margin-bottom: ${props => props.mb || '0'}px;
  text-align: ${props => props.align || 'left'};
  flex: ${props => props.flex || 'none'};
  ${props => props.custom}
`;

export const FontAwesome = styled(FontAwesomeIcons).attrs((props) => ({
  name: props.icon,
  size: props.size || 25
}))`
  color: ${props => Colors[props.color || 'white']};
  margin-right: ${props => props.mr || '0'}px;
  margin-left: ${props => props.ml || '0'}px;
  margin-top: ${props => props.mt || '0'}px;
  margin-bottom: ${props => props.mb || '0'}px;
  text-align: ${props => props.align || 'left'};
  flex: ${props => props.flex || 'none'};
  ${props => props.custom}
`;

export const Feather = styled(FeatherIcons).attrs((props) => ({
  name: props.icon,
  size: props.size || 25
}))`
  color: ${props => Colors[props.color || 'white']};
  margin-right: ${props => props.mr || '0'}px;
  margin-left: ${props => props.ml || '0'}px;
  margin-top: ${props => props.mt || '0'}px;
  margin-bottom: ${props => props.mb || '0'}px;
  text-align: ${props => props.align || 'left'};
  flex: ${props => props.flex || 'none'};
  ${props => props.custom}
`;

export const Octicons = styled(OctIcons).attrs((props) => ({
  name: props.icon,
  size: props.size || 25
}))`
  color: ${props => Colors[props.color || 'white']};
  margin-right: ${props => props.mr || '0'}px;
  margin-left: ${props => props.ml || '0'}px;
  margin-top: ${props => props.mt || '0'}px;
  margin-bottom: ${props => props.mb || '0'}px;
  text-align: ${props => props.align || 'left'};
  flex: ${props => props.flex || 'none'};
  ${props => props.custom}
`;

export const Ionicons = styled(IonIcons).attrs((props) => ({
  name: props.icon,
  size: props.size || 25
}))`
  color: ${props => Colors[props.color || 'white']};
  margin-right: ${props => props.mr || '0'}px;
  margin-left: ${props => props.ml || '0'}px;
  margin-top: ${props => props.mt || '0'}px;
  margin-bottom: ${props => props.mb || '0'}px;
  text-align: ${props => props.align || 'left'};
  flex: ${props => props.flex || 'none'};
  ${props => props.custom}
`;

export const Evilicons = styled(EvilIcons).attrs((props) => ({
  name: props.icon,
  size: props.size || 25
}))`
  color: ${props => Colors[props.color || 'white']};
  margin-right: ${props => props.mr || '0'}px;
  margin-left: ${props => props.ml || '0'}px;
  margin-top: ${props => props.mt || '0'}px;
  margin-bottom: ${props => props.mb || '0'}px;
  text-align: ${props => props.align || 'left'};
  flex: ${props => props.flex || 'none'};
  ${props => props.custom}
`;

export const Fontisto = styled(FontistoIcons).attrs((props) => ({
  name: props.icon,
  size: props.size || 25
}))`
  color: ${props => Colors[props.color || 'white']};
  margin-right: ${props => props.mr || '0'}px;
  margin-left: ${props => props.ml || '0'}px;
  margin-top: ${props => props.mt || '0'}px;
  margin-bottom: ${props => props.mb || '0'}px;
  text-align: ${props => props.align || 'left'};
  flex: ${props => props.flex || 'none'};
  ${props => props.custom}
`;
