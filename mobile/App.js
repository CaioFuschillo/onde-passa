import { useEffect, useState } from 'react'
import { StatusBar } from 'expo-status-bar'
import { StyleSheet, Text, View } from 'react-native'
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context'
import Cabecalho from './src/components/Cabecalho'
import Carregando from './src/components/Carregando'
import Creditos from './src/components/Creditos'
import ListaFilmes from './src/components/ListaFilmes'
import backendClient from './src/utils/backendClient'

export default function App() {
  const [emAlta, setEmAlta] = useState([])
  const [carregando, setCarregando] = useState(true)
  const [erro, setErro] = useState(null)

  useEffect(() => {
    backendClient.get('/em-alta')
    .then((result) => {
      setEmAlta(result.data)
      setCarregando(false)
    })
    .catch((falha) => {
      console.log(falha)
      setCarregando(false)
      setErro('Não foi possível carregar os filmes. Verifique se o backend está no ar.')
    })
  }, [])

  return (
    <SafeAreaProvider>
      <SafeAreaView style={styles.container}>
        <StatusBar style="light" />
        <Cabecalho />
        <View style={styles.conteudo}>
          {
            carregando ?
              <Carregando mensagem="Buscando os filmes em alta..." />
            :
            erro ?
              <Text style={styles.erro}>{erro}</Text>
            :
              <ListaFilmes titulo="Em alta nesta semana" filmes={emAlta} />
          }
        </View>
        <Creditos />
      </SafeAreaView>
    </SafeAreaProvider>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1E1E2E'
  },
  conteudo: {
    flex: 1,
    paddingHorizontal: 16
  },
  erro: {
    color: '#FCA5A5',
    fontSize: 15,
    textAlign: 'center',
    marginTop: 24
  }
})