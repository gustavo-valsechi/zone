import React from 'react'
import { Provider } from 'react-redux'
import { AuthProvider } from './contexts/auth'
import { Routes } from './routes'
import { registerRootComponent } from 'expo'
import store from './store'
import Toast from "react-native-toast-message"

export default function App() {
  return (
    <Provider store={store}>
      <AuthProvider>
        <Routes />
        <Toast 
          autoHide 
          visibilityTime={3000} 
          topOffset={100}
        />
      </AuthProvider>
    </Provider>
  )
}

registerRootComponent(App)
