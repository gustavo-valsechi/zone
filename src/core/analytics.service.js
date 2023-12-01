import analytics from '@react-native-firebase/analytics'

const TRANSLATE = {
  Start: "inicio", 
  Login: "entrar", 
  Recovery: "recuperar_senha", 
  Register: "registar",
  Main: "pagina_inicial", 
  Profile: "perfil", 
  ProfileUpdate: "alterar_perfil", 
  ChangePassword: "alterar_senha", 
  ProfilePassword: "alterar_telefone", 
  Coupons: "cupons", 
  WebView: "webview", 
  Indicate: "indicar", 
  Location: "estabelecimentos", 
  Notifications: "notificacoes", 
  EstablishmentDetails: "detalhes_estabelecimento",
  WalletGroup: "grupo_economico",
  WalletDetails: "detalhes_carteira",
  WalletTransfer: "transferir_cashback",
}

export class Analytics {
  static screen = async (route) => {
    await analytics().logScreenView({
      screen_name: TRANSLATE[route] || route,
      screen_class: TRANSLATE[route] || route,
    })
  }

  static event = async (name, content) => {
    await analytics().logEvent(name, { ...content, dt_event: new Date() })
  }
}