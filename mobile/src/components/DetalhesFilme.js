import { useEffect, useState } from 'react'
import { Image, Pressable, ScrollView, StyleSheet, Text, View } from 'react-native'
import Carregando from './Carregando'
import backendClient from '../utils/backendClient'
import { formatarDuracao, formatarNota } from '../utils/formatacao'

export default function DetalhesFilme({ id, onVoltar }) {
  const [filme, setFilme] = useState(null)
  const [carregando, setCarregando] = useState(true)
  const [erro, setErro] = useState(null)

  useEffect(() => {
    setCarregando(true)
    setErro(null)
    backendClient.get('/filme', {
      params: {
        id: id
      }
    })
    .then((result) => {
      setFilme(result.data)
      setCarregando(false)
    })
    .catch((falha) => {
      console.log(falha)
      if (falha.response && falha.response.data.mensagem) {
        setErro(falha.response.data.mensagem)
      }
      else {
        setErro('Não foi possível carregar os detalhes.')
      }
      setCarregando(false)
    })
  }, [id])

  return (
    <View style={styles.container}>
      <Pressable style={styles.voltar} onPress={onVoltar}>
        <Text style={styles.textoVoltar}>‹ Voltar</Text>
      </Pressable>
      {
        carregando ?
          <Carregando mensagem="Carregando os detalhes." />
        :
        erro ?
          <Text style={styles.erro}>{erro}</Text>
        :
          <ScrollView>
            {
              filme.fundo ?
                <Image source={{ uri: filme.fundo }} style={styles.fundo} />
              :
                null
            }
            <View style={styles.topo}>
              {
                filme.poster ?
                  <Image source={{ uri: filme.poster }} style={styles.poster} />
                :
                  <View style={styles.semPoster}>
                    <Text style={styles.semPosterTexto}>Sem pôster</Text>
                  </View>
              }
              <View style={styles.info}>
                <Text style={styles.titulo}>{filme.titulo}</Text>
                <Text style={styles.detalhe}>
                  {[filme.ano, formatarDuracao(filme.duracao), ...filme.generos].filter((item) => item).join(' · ')}
                </Text>
                <Text style={styles.detalhe}>{formatarNota(filme.nota)}</Text>
              </View>
            </View>
            <Text style={styles.secao}>Sinopse</Text>
            <Text style={styles.texto}>{filme.sinopse ? filme.sinopse : 'Sinopse indisponível.'}</Text>
          </ScrollView>
      }
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 16
  },
  voltar: {
    paddingVertical: 8,
    marginBottom: 8
  },
  textoVoltar: {
    color: '#E0473C',
    fontSize: 16,
    fontWeight: 'bold'
  },
  erro: {
    color: '#CBD5E1',
    fontSize: 15,
    textAlign: 'center',
    marginTop: 24
  },
  fundo: {
    width: '100%',
    height: 180,
    borderRadius: 8,
    marginBottom: 16
  },
  topo: {
    flexDirection: 'row'
  },
  poster: {
    width: 100,
    height: 150,
    borderRadius: 6
  },
  semPoster: {
    width: 100,
    height: 150,
    borderRadius: 6,
    backgroundColor: '#6B7280',
    alignItems: 'center',
    justifyContent: 'center'
  },
  semPosterTexto: {
    color: '#FFFFFF',
    fontSize: 12,
    textAlign: 'center'
  },
  info: {
    flex: 1,
    marginLeft: 12,
    gap: 6
  },
  titulo: {
    color: '#FFFFFF',
    fontSize: 22,
    fontWeight: 'bold'
  },
  detalhe: {
    color: '#CBD5E1',
    fontSize: 14
  },
  secao: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: 'bold',
    marginTop: 20,
    marginBottom: 8
  },
  texto: {
    color: '#E2E8F0',
    fontSize: 15,
    lineHeight: 22
  }
})