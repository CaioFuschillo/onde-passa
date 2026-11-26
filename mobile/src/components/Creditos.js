import { StyleSheet, Text } from 'react-native'

export default function Creditos() {
  return (
    <Text style={styles.texto}>
      Este produto usa a API do TMDB, mas não é endossado nem certificado pelo TMDB.
    </Text>
  )
}

const styles = StyleSheet.create({
  texto: {
    fontSize: 11,
    color: '#94A3B8',
    textAlign: 'center',
    padding: 12
  }
})