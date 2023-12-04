import axios from "axios"
import AsyncStorage from "@react-native-community/async-storage"

const baseURL = "http://locahost:3333"

const Api = axios.create({ baseURL })

Api.interceptors.request.use(async (config) => {
  const tokenStorage = await AsyncStorage.getItem("@nummuscustomer:token")

  const headers = { ...config.headers }

  if (tokenStorage) headers.Authorization = `Bearer ${tokenStorage}`

  return { ...config, headers }
})

export { Api }
