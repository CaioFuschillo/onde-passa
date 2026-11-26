import { useEffect, useState } from 'react'
import { StatusBar } from 'expo-status-bar'
import { StyleSheet, Text, View } from 'react-native'
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context'
import Busca from './src/components/Busca'
import Cabecalho from './src/components/Cabecalho'
import Carregando from './src/components/Carregando'
import Creditos from './src/components/Creditos'
import ListaFilmes from './src/components/ListaFilmes'
import backendClient from './src/utils/backendClient'

export default function App() {
  const [emAlta, setEmAlta] = useState([])
  const [carregando, setCarregando] = useState(true)
  const [erro, setErro] = useState(null)
  const [termo, setTermo] = useState('')
  const [termoBuscado, setTermoBuscado] = useState('')
  const [resultados, setResultados] = useState(null)

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

  const buscar = () => {
    setCarregando(true)
    backendClient.get('/filmes', {
      params: {
        busca: termo
      }
    })
    .then((result) => {
      setResultados(result.data)
      setTermoBuscado(termo)
      setErro(null)
      setCarregando(false)
    })
    .catch((falha) => {
      console.log(falha)
      if (falha.response && falha.response.data.mensagem) {
        setErro(falha.response.data.mensagem)
      }
      else {
        setErro('Não foi possível buscar os filmes.')
      }
      setCarregando(false)
    })
  }

  const limpar = () => {
    setTermo('')
    setResultados(null)
    setErro(null)
  }

  const cargaInicial = emAlta.length === 0 && erro === null

  return (
    <SafeAreaProvider>
      <SafeAreaView style={styles.container}>
        <StatusBar style="light" />
        <Cabecalho />
        <Busca
          termo={termo}
          onTermoAlterado={setTermo}
          onBuscar={buscar}
          onLimpar={limpar} />
        <View style={styles.conteudo}>
          {
            carregando ?
              <Carregando mensagem={cargaInicial ? 'Buscando os filmes em alta...' : 'Procurando filmes...'} />
            :
            erro ?
              <Text style={styles.mensagem}>{erro}</Text>
            :
            resultados === null ?
              <ListaFilmes titulo="Em alta nesta semana" filmes={emAlta} />
            :
            resultados.length === 0 ?
              <Text style={styles.mensagem}>Nenhum filme encontrado para “{termoBuscado}”.</Text>
            :
              <ListaFilmes titulo={`Resultados para “${termoBuscado}”`} filmes={resultados} />
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
  mensagem: {
    color: '#CBD5E1',
    fontSize: 15,
    textAlign: 'center',
    marginTop: 24
  }
})