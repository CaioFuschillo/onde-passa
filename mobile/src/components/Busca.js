import { ActivityIndicator, Pressable, StyleSheet, Text, TextInput, View } from 'react-native'

export default function Busca({ termo, buscando, onTermoAlterado, onLimpar }) {
  return (
    <View style={styles.linha}>
      <TextInput
        style={styles.campo}
        value={termo}
        onChangeText={onTermoAlterado}
        placeholder="Digite o título de um filme" />
      {
        buscando ?
          <ActivityIndicator size="small" color="#E0473C" />
        :
          null
      }
      {
        termo !== '' ?
          <Pressable style={styles.limpar} onPress={onLimpar}>
            <Text style={styles.textoLimpar}>✕</Text>
          </Pressable>
        :
          null
      }
    </View>
  )
}

const styles = StyleSheet.create({
  linha: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginHorizontal: 16
  },
  campo: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    color: '#111827',
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 10,
    fontSize: 15
  },
  limpar: {
    paddingHorizontal: 8,
    paddingVertical: 10
  },
  textoLimpar: {
    color: '#FFFFFF',
    fontSize: 18
  }
})