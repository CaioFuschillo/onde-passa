import { Image, ScrollView, StyleSheet, Text, View } from 'react-native'

export default function Provedores({ titulo, provedores }) {
  if (provedores.length === 0) {
    return null
  }

  return (
    <View style={styles.container}>
      <Text style={styles.titulo}>{titulo}</Text>
      <ScrollView horizontal>
        {
          provedores.map((provedor) => (
            <View key={provedor.nome} style={styles.item}>
              <Image source={{ uri: provedor.logo }} style={styles.logo} />
              <Text style={styles.nome} numberOfLines={2}>{provedor.nome}</Text>
            </View>
          ))
        }
      </ScrollView>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    marginBottom: 16
  },
  titulo: {
    color: '#FFFFFF',
    fontSize: 15,
    fontWeight: 'bold',
    marginBottom: 8
  },
  item: {
    width: 72,
    alignItems: 'center',
    marginRight: 12
  },
  logo: {
    width: 56,
    height: 56,
    borderRadius: 12
  },
  nome: {
    color: '#CBD5E1',
    fontSize: 11,
    textAlign: 'center',
    marginTop: 4
  }
})