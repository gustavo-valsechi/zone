import React from "react"
import {
  MaterialIcon, 
  FontAwesome, 
  FontAwesome5, 
  Feather,
  Octicons, 
  Ionicons, 
  Evilicons, 
  Material, 
  Fontisto, 
  AntDesign
} from "./styles"

export default function GlobalIcon(props) {

  const packs = {
    "fontAwesome": <FontAwesome {...props} />,
    "fontAwesome5": <FontAwesome5 {...props} />,
    "materialIcons": <MaterialIcon {...props} />,
    "material": <Material {...props} />,
    "feather": <Feather {...props} />,
    "octicons": <Octicons {...props} />,
    "ionicons": <Ionicons {...props} />,
    "evilIcons": <Evilicons {...props} />,
    "fontisto": <Fontisto {...props} />,
    "antDesign": <AntDesign {...props} />,
  }

  return packs[props.pack || 'materialIcons']
}
