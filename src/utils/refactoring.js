import "intl"
import "intl/locale-data/jsonp/pt-BR"
import moment from "moment"
import "moment/locale/pt-br"
import { Linking, Platform } from "react-native"
import _ from "lodash"

export class Refactoring {
  static format = {
    icons: (value) => {
      if (!value) return;

      const icon = {
        "BRL": "fa fa-usd",
        "VOLUME": "fa fa-cubes"
      }
      return icon[value]
    },
    identifiers: (value) => {
      const identifier = {
        "BRL": "R$",
        "VOLUME": "vendas"
      }
      return identifier[value]
    },
    money: (currency, value) => {
      if (!value && value !== 0) return ""

      const my_locale = "pt-BR"

      const value_currency = parseFloat(value)

      if (currency) {
        return new Intl.NumberFormat(my_locale, { style: "currency", currency: "BRL" }).format(value_currency)
      }

      return new Intl.NumberFormat(my_locale, { minimumFractionDigits: 2 }).format(value_currency)
    },
    htmlEC: (content) => {
      if (!content) return ""

      let text = content

      const accent_map 	= {
        " " : /&nbsp;/g,
        "á" : /&aacute;/g,
        "ã" : /&atilde;/g,
        "â" : /&acirc;/g,
        "à" : /&agrave;/g,
        "Á" : /&Aacute;/g,
        "Ã" : /&Atilde;/g,
        "Â" : /&Acirc;/g,
        "À" : /&Agrave;/g,
        "é" : /&eacute;/g,
        "ê" : /&ecirc;/g,
        "É" : /&Eacute;/g,
        "Ê" : /&Ecirc;/g,
        "í" : /&iacute;/g,
        "Í" : /&Iacute;/g,
        "ó" : /&oacute;/g,
        "õ" : /&otilde;/g,
        "ô" : /&ocirc;/g,
        "Ó" : /&Oacute;/g,
        "Õ" : /&Otilde;/g,
        "Ô" : /&Ocirc;/g,
        "ú" : /&uacute;/g,
        "Ú" : /&Uacute;/g,
        "ç" : /&ccedil;/g,
        "Ç" : /&Ccedil;/g,
      };

      for ( const letra in accent_map ) {

        const expressaoRegular = accent_map[letra];

        text = text.replace( expressaoRegular, letra );
      }

      return text
    },
    unaccent: (text) => {
      if (!text) return ""

      const mapaAcentosHex 	= {
        a : /[\xE0-\xE6]/g,
        e : /[\xE8-\xEB]/g,
        i : /[\xEC-\xEF]/g,
        o : /[\xF2-\xF6]/g,
        u : /[\xF9-\xFC]/g,
        c : /\xE7/g,
        n : /\xF1/g
      };

      for ( const letter in mapaAcentosHex ) {
        text = text.replace( mapaAcentosHex[letter], letter );
      }

      return text
    },
    date: (value) => {
      if (!value) return ""

      return moment(value).utc().format("DD/MM/YYYY")
    },
    isodate: (value, addDay, addMonth, addYear) => {
      if (!value) return ""

      return moment(value).add(addDay || 0, "day").add(addMonth || 0, "month").add(addYear || 0, "month").format("YYYY-MM-DD")
    },
    datetime: (value) => {
      if (!value) return ""

      return moment(value).format("DD/MM/YYYY HH:mm")
    },
    time: (value, initialFormat) => {
      if (!value) return ""

      return moment(value, initialFormat).format("HH:mm")
    },
    daymonth: (value, date, addDay, addMonth) => {
      if (!value) return ""

      if (date) return moment(value).add(addDay || 0, "day").add(addMonth || 0, "month").format("DD/MM")

      return moment(value).add(addDay || 0, "day").add(addMonth || 0, "month").format("DD MMMM")
    },
    customdate: (value, format, addDay, addMonth, initFormat) => {
      if (!value) return ""

      return moment(value, initFormat).add(addDay || 0, "day").add(addMonth || 0, "month").format(format)
    },
    address: (value) => {
      if (!value) return
    
      let new_address = `${value.street || "Não encontrado"}, ${value.number}, `
    
      if (value.country) new_address += `${value.country}, `
    
      new_address += `${value.neighborhood || "Não encontrado"} - ${value.city}, ${value.state}`
    
      return new_address
    },
    event: (value) => {
      if (!value) return
    
      return _.replace(_.deburr(_.lowerCase((value).trim())), / /g, "_")
    }
  };

  static mask = {
    docNumber: (value) => {
      if(!value) return ""

      value = this.removeMask.docNumber(value)

      return value
        .replace(/\D/g, "")
        .replace(/(\d{3})(\d)/, "$1.$2")
        .replace(/(\d{3})(\d)/, "$1.$2")
        .replace(/(\d{3})(\d{1,2})/, "$1-$2")
        .replace(/(-\d{2})\d+?$/, "$1")
    },
    phone: (value) => {
      if (!value) return ""

      if (value.length === 14 || value.length === 10) {
        return value
          .replace(/\D/g, "")
          .replace(/(\d{2})(\d)/, "($1) $2")
          .replace(/(\d{4})(\d)/, "$1-$2")
          .replace(/(-\d{4})(\d+?$)/, "$1")
      }

      return value
        .replace(/\D/g, "")
        .replace(/(\d{2})(\d)/, "($1) $2")
        .replace(/(\d{5})(\d)/, "$1-$2")
        .replace(/(-\d{4})\d+?$/, "$1")
    },
    percent: (value) => {
      if (!value) return ""

      value = value + ""
      value = value.replace(/\D-+/g, "")

      if (value.length > 2) {
        value = String((value * 100)).replace(/([0-9]{2})$/g, ",$1")
      }

      return value
    },
    money(valor, nosign, integer) {
      valor = valor + ""
      valor = parseInt(valor.replace(/[\D]+/g, ""))

      if (!nosign) valor = "R$ " + valor

      if (!integer) {
        if (!nosign ? valor.length <= 4 : valor.length <= 1) {
          valor = valor.replace(/([0-9]{1})$/g, "00$1")
        }

        if (!nosign ? valor.length <= 5 : valor.length <= 2) {
          valor = valor.replace(/([0-9]{2})$/g, "0$1")
        }

        if (!nosign ? valor.length > 5 : valor.length > 2) {
          valor = valor.replace(/([0-9]{2})$/g, ",$1")
        }

        if (!nosign ? valor.length > 9 : valor.length > 6) {
          valor = valor.replace(/([0-9]{3}),([0-9]{2}$)/g, ".$1,$2")
        }

        if (!nosign ? valor.length > 13 : valor.length > 10) {
          valor = valor.replace(/([0-9]{3}).([0-9]{3}),([0-9]{2}$)/g, ".$1.$2,$3")
        }

        if (!nosign ? valor.length > 17 : valor.length > 14) {
          valor = valor.replace(/([0-9]{3}).([0-9]{3}).([0-9]{3}),([0-9]{2}$)/g, ".$1.$2.$3,$4")
        }
      } else {

        if (!nosign ? valor.length > 6 : valor.length > 3) {
          valor = valor.replace(/([0-9]{3}$)/g, ".$1")
        }

        if (!nosign ? valor.length > 10 : valor.length > 7) {
          valor = valor.replace(/([0-9]{3}).([0-9]{3}$)/g, ".$1.$2")
        }

        if (!nosign ? valor.length > 14 : valor.length > 11) {
          valor = valor.replace(/([0-9]{3}).([0-9]{3}).([0-9]{3}$)/g, ".$1.$2.$3")
        }
      }

      if (valor === "R$ NaN") return ""
      if (valor === "R$ 0,00") return ""

      return valor.substring(0, 20)
    },
    number: (value) => {
      if(!value) return ""

      return value.replace(/\D/g, "")
    },
    date: (value) => {
      if (!value) return ""

      return value
        .replace(/\D/g, "")
        .replace(/(\d{2})(\d)/, "$1/$2")
        .replace(/(\d{2})(\d)/, "$1/$2")
        .replace(/(.\d{4})\d+?$/, "$1")
        .substring(0, 10)
    }
  }

  static removeMask = {
    phone: (value) => {
      if (!value) return ""

      return value
        .replace("(", "")
        .replace(")", "")
        .replace(" ", "")
        .replace("-", "")
    },
    docNumber: (value) => {
      if (!value) return ""

      return value
        .replace(/\./g, "")
        .replace("/", "")
        .replace("-", "")
    },
    percent: (value) => {
      if(!value) return ""

      return value.replace(",", ".").replace("%", "")
    },
    money: (value) => {
      if(!value) return ""

      return value.replace("R$", "").replace(/\./g, "").replace(",", ".")
    },
    number: (value) => {
      if(!value) return ""

      return value.replace(/\D/g, "")
    }
  };

  static link = {
    open: (url) => {
      if (!url) return
    
      if (Platform.OS === "ios") {
        return Linking.openURL(url)
      }
    
      Linking.canOpenURL(url).then((supported) => {
        if (!supported) return

        return Linking.openURL(url)
      })
    }
  };
}
