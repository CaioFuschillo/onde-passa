import { Pressable, StyleSheet, Text, TextInput, View } from 'react-native'

export default function Busca({ termo, onTermoAlterado, onBuscar, onLimpar }) {
  return (
    <View style={styles.linha}>
      <TextInput
        style={styles.campo}
        value={termo}
        onChangeText={onTermoAlterado}
        placeholder="Digite o título de um filme" />
      {
        termo !== '' ?
          <Pressable style={styles.limpar} onPress={onLimpar}>
            <Text style={styles.textoLimpar}>✕</Text>
          </Pressable>
        :
          null
      }
      <Pressable style={styles.botao} onPress={onBuscar}>
        <Text style={styles.textoBotao}>Buscar</Text>
      </Pressable>
    </View>
  )
}

const styles = StyleSheet.create({
  linha: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginHorizontal: 16,
    marginBottom: 16
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
  },
  botao: {
    backgroundColor: '#E0473C',
    borderRadius: 8,
    paddingHorizontal: 14,
    paddingVertical: 11
  },
  textoBotao: {
    color: '#FFFFFF',
    fontSize: 15,
    fontWeight: 'bold'
  }
})