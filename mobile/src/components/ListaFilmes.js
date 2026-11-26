import { FlatList, StyleSheet, Text, View } from 'react-native'
import CartaoFilme from './CartaoFilme'

export default function ListaFilmes({ titulo, filmes, onSelecionar }) {
  return (
    <View style={styles.container}>
      <Text style={styles.titulo}>{titulo}</Text>
      <FlatList
        data={filmes}
        keyExtractor={(filme) => String(filme.id)}
        renderItem={({ item }) => (
          <CartaoFilme
            id={item.id}
            titulo={item.titulo}
            ano={item.ano}
            nota={item.nota}
            poster={item.poster}
            onSelecionar={onSelecionar} />
        )}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  titulo: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 12
  }
})