import styled from "styled-components/native"
import { Colors } from "../../../../styles"

export const AddPlateButton = styled.TouchableOpacity.attrs((props) => ({
  activeOpacity: .9
}))`
  border-width: 1px;
  border-style: dashed;
  border-color: ${Colors["black-2"]};
  border-radius: 5px;
  padding: 13px 15px;
  justify-content: center;
  align-items: center;
`;