import React from "react"
import { RefreshControl, FlatList } from "react-native"
import { ContainerLoading } from "./styles"
import Empty from "../Empty"
import LoadingBar from "../LoadingBar"
import _ from "lodash"

export default function InfiniteScroll(props) {
    return (
        props.content?.loading && !props.fetch?.loading && !props.refresh?.loading
        ?   [1,2,3,4,5,6,7,8,9,0].map((data, index) =>
                <ContainerLoading key={index}>
                    <LoadingBar height={props.item?.height || 100}/>
                </ContainerLoading>)
        :   <FlatList
                data={props.content?.data || []}
                keyExtractor={(item, index) => index}
                renderItem={({ item, index }) => props.item?.component ? props.item.component(item, index) : null}
                contentContainerStyle={{ paddingBottom: 70, paddingHorizontal: 25, ...props.style }}
                onEndReachedThreshold={0.5}
                showsVerticalScrollIndicator={false}
                onEndReached={!props.fetch?.loading && props.fetch?.function}
                ListFooterComponent={() => props.fetch?.loading && <LoadingBar height={40}/>}
                refreshControl={props.refresh?.function && props.refresh?.enabled !== false ?
                    <RefreshControl
                        tintColor="#fff"
                        enabled={props.refresh?.enabled}
                        refreshing={props.refresh?.loading || false}
                        onRefresh={props.refresh?.function}
                    /> : undefined
                }
                ListEmptyComponent={
                    props.empty?.enabled ?? true
                    ? <Empty
                            icon={props.empty?.icon || "list-ul"}
                            message={props.empty?.message || "Nenhum registro encontrado"}
                            button={props.empty?.button}
                        />
                    : <></>
                }
            >
                {props.children}
            </FlatList>
    )
}
