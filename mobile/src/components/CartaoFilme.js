import { Image, Pressable, StyleSheet, Text, View } from 'react-native'
import { formatarNota } from '../utils/formatacao'

export default function CartaoFilme({ id, titulo, ano, nota, poster, onSelecionar }) {
  return (
    <Pressable style={styles.cartao} onPress={() => onSelecionar(id)}>
      {
        poster ?
          <Image source={{ uri: poster }} style={styles.poster} />
        :
          <View style={styles.semPoster}>
            <Text style={styles.semPosterTexto}>Sem pôster</Text>
          </View>
      }
      <View style={styles.info}>
        <Text style={styles.titulo} numberOfLines={2}>{titulo}</Text>
        {
          ano ?
            <Text style={styles.detalhe}>{ano}</Text>
          :
            null
        }
        <Text style={styles.detalhe}>{formatarNota(nota)}</Text>
      </View>
    </Pressable>
  )
}

const styles = StyleSheet.create({
  cartao: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#2A2A3C',
    borderRadius: 10,
    padding: 10,
    marginBottom: 10
  },
  poster: {
    width: 70,
    height: 105,
    borderRadius: 6
  },
  semPoster: {
    width: 70,
    height: 105,
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
    marginLeft: 12
  },
  titulo: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 4
  },
  detalhe: {
    color: '#CBD5E1',
    fontSize: 14
  }
})