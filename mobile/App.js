import { useEffect, useState } from 'react'
import { StatusBar } from 'expo-status-bar'
import { StyleSheet, Text, View } from 'react-native'
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context'
import Busca from './src/components/Busca'
import Cabecalho from './src/components/Cabecalho'
import Carregando from './src/components/Carregando'
import Creditos from './src/components/Creditos'
import DetalhesFilme from './src/components/DetalhesFilme'
import ListaFilmes from './src/components/ListaFilmes'
import backendClient from './src/utils/backendClient'

export default function App() {
  const [emAlta, setEmAlta] = useState([])
  const [carregando, setCarregando] = useState(true)
  const [erro, setErro] = useState(null)
  const [termo, setTermo] = useState('')
  const [termoBuscado, setTermoBuscado] = useState('')
  const [resultados, setResultados] = useState(null)
  const [filmeSelecionado, setFilmeSelecionado] = useState(null)
  const [buscando, setBuscando] = useState(false)

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

  useEffect(() => {
    const termoLimpo = termo.trim()

    if (termoLimpo === '') {
      setResultados(null)
      setErro(null)
      setBuscando(false)
      return
    }

    if (termoLimpo.length < 3) {
      setBuscando(false)
      return
    }

    let ativa = true

    const agendamento = setTimeout(() => {
      setBuscando(true)
      backendClient.get('/filmes', {
        params: {
          busca: termoLimpo
        }
      })
      .then((result) => {
        if (ativa) {
          setResultados(result.data)
          setTermoBuscado(termoLimpo)
          setErro(null)
          setBuscando(false)
        }
      })
      .catch((falha) => {
        console.log(falha)
        if (ativa) {
          if (falha.response && falha.response.data.mensagem) {
            setErro(falha.response.data.mensagem)
          }
          else {
            setErro('Não foi possível buscar os filmes.')
          }
          setBuscando(false)
        }
      })
    }, 600)

    return () => {
      ativa = false
      clearTimeout(agendamento)
    }
  }, [termo])

  const limpar = () => {
    setTermo('')
  }

  const voltar = () => {
    setFilmeSelecionado(null)
  }

  const termoCurto = termo.trim().length > 0 && termo.trim().length < 3

  return (
    <SafeAreaProvider>
      <SafeAreaView style={styles.container}>
        <StatusBar style="light" />
        <Cabecalho />
        {
          filmeSelecionado === null ?
            <View style={styles.tela}>
              <Busca
                termo={termo}
                buscando={buscando}
                onTermoAlterado={setTermo}
                onLimpar={limpar} />
              {
                termoCurto ?
                  <Text style={styles.dica}>Digite pelo menos 3 letras.</Text>
                :
                  null
              }
              <View style={styles.conteudo}>
                {
                  carregando ?
                    <Carregando mensagem="Buscando os filmes em alta..." />
                  :
                  erro ?
                    <Text style={styles.mensagem}>{erro}</Text>
                  :
                  resultados === null ?
                    <ListaFilmes
                      titulo="Em alta nesta semana"
                      filmes={emAlta}
                      onSelecionar={setFilmeSelecionado} />
                  :
                  resultados.length === 0 ?
                    <Text style={styles.mensagem}>Nenhum filme encontrado para “{termoBuscado}”.</Text>
                  :
                    <ListaFilmes
                      titulo={`Resultados para “${termoBuscado}”`}
                      filmes={resultados}
                      onSelecionar={setFilmeSelecionado} />
                }
              </View>
            </View>
          :
            <DetalhesFilme id={filmeSelecionado} onVoltar={voltar} />
        }
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
  tela: {
    flex: 1
  },
  dica: {
    color: '#94A3B8',
    fontSize: 13,
    marginHorizontal: 16,
    marginTop: 6
  },
  conteudo: {
    flex: 1,
    paddingHorizontal: 16,
    marginTop: 16
  },
  mensagem: {
    color: '#CBD5E1',
    fontSize: 15,
    textAlign: 'center',
    marginTop: 24
  }
})