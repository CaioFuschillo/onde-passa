import { StyleSheet, Text, View } from 'react-native'

export default function Cabecalho() {
  return (
    <View style={styles.container}>
      <View style={styles.linha}>
        <Text style={styles.emoji}>🍿</Text>
        <Text style={styles.nome}>OndePassa</Text>
      </View>
      <Text style={styles.subtitulo}>Descubra onde assistir qualquer filme</Text>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    paddingVertical: 16,
    paddingHorizontal: 16
  },
  linha: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8
  },
  emoji: {
    fontSize: 28
  },
  nome: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#FFFFFF'
  },
  subtitulo: {
    fontSize: 14,
    color: '#94A3B8',
    marginTop: 4
  }
})