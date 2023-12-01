import React from "react"
import { Container, GroupPlus, Group, Photo } from "./styles"
import LoadingBar from "../LoadingBar"
import Icon from "../Icon"
import _ from "lodash"

export default function Avatar(props) {

  const groupStyle = (index) => {

    const size = props.size ? props.size - 10 : 30

    const two = props.source?.length === 2

    const style = {
      "0": [3, two ? 5 : 0, 0],
      "1": [2, two ? 15 : 10, 5],
      "2": [1, 20, 10],
    }

    return `
      position: absolute;
      width: ${size}px;
      height: ${size}px;
      z-index: ${style[index]?.[0]};
      bottom: ${style[index]?.[1]}px;
      right: ${style[index]?.[2]}px;
      opacity: .9;
    `
  }

  return (
    <Container group={_.isArray(props.source) && props.source?.length > 1} {...props}>
      {!!props.loading
      ? <LoadingBar white={props.white} circle={props.size || 40} />
      : _.isArray(props.source) && props.source?.length > 1
        ? <Group>
            {_.map(props.source, (data, index) => index < 3 && (
              !!data
              ? <Photo key={index} source={data} custom={groupStyle(index)} />
              : <Container key={index} custom={groupStyle(index)}>
                  <Icon
                    pack={props.icon?.pack || 'fontAwesome5'}
                    size={props.size ? ((props.size - 10) / 2.5) : 8.5}
                    icon={props.icon?.name || props.icon || 'user-alt'}
                  />
                </Container>
            ))}
            {props.source.length > 3 &&
              <GroupPlus>
                <Icon pack="fontAwesome5" icon="plus" size={12} color="secondary" />
              </GroupPlus>}
          </Group>
        : !!props.source && (_.includes(props.source, "http") || _.includes(props.source, "file"))
          ? <Photo 
              source={_.isArray(props.source) ? props.source[0] : props.source} 
              {..._.omit(props, ["source"])} 
            />
          : <Icon
              pack={props.icon?.pack || 'fontAwesome5'}
              size={props.size ? (props.size / 2.5) : 15}
              icon={props.icon?.name || props.icon || 'user-alt'}
            />}
    </Container>
  )
}
