import React from "react"
import { AuthProvider } from "./contexts/auth"
import { Routes } from "./routes"
import { registerRootComponent } from "expo"
import Toast from "react-native-toast-message"

export default function App() {
  return (
    <AuthProvider>
      <Routes />
      <Toast 
        autoHide 
        visibilityTime={3000} 
        topOffset={100}
      />
    </AuthProvider>
  )
}

registerRootComponent(App)
