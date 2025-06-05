//Chat.js
import React, { useState } from 'react';
import { StyleSheet, Text, TextInput, Button, ScrollView, View, TouchableOpacity, Image } from 'react-native';
import { useTheme } from '../screens/Tema';
import { useNavigation } from '@react-navigation/native';


export default function Chat() {
  const [input, setInput] = useState('');
  const [response, setResponse] = useState('');
  const { backgroundColor, textColor, boxBackground, isDarkMode } = useTheme();
  const navigation = useNavigation();


  const handleSend = async () => {
    try {
      console.log('Enviando pergunta:', input);
      const res = await fetch('http://192.168.0.163:3000/ask', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ question: input }),
      });
      const data = await res.json();
      console.log('Resposta recebida:', data);

      
      if (data.answer) {
        setResponse(data.answer);
      } else if (data.error) {
        setResponse(`Erro: ${data.details?.error?.message || data.error}`);
      } else {
        setResponse('Sem resposta');
      }
    } catch (err) {
      console.error('Erro ao conectar:', err);
      setResponse('Erro ao conectar com o servidor');
    }
  };


  return (
    <View style={[{ flex: 1, backgroundColor }]}>
      
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={[styles.title, { color: textColor }]}>Assistente Virtual com LLM</Text>
      <TextInput
        style={[styles.input, { color: textColor }]}
        placeholder="Digite sua pergunta"
        placeholderTextColor={textColor}
        value={input}
        onChangeText={setInput}
      />
      <Button title="Enviar" onPress={handleSend} />
      <Text style={[styles.responseTitle, { color: textColor }]}>Resposta:</Text>
      <Text style={[styles.response, { color: textColor }]}>{response}</Text>
    </ScrollView>

    <View style={styles.menuContainer}>
            <TouchableOpacity
              style={[styles.button, { backgroundColor: 'rgb(255, 75, 75)' }]}
              onPress={() => navigation.navigate('Local')}>
              <Image source={require('../assets/map.png')} style={[styles.icon, { tintColor: '#ffffff' }]} />
            </TouchableOpacity>
    
            <TouchableOpacity
              style={[styles.button, { backgroundColor: 'rgb(84, 169, 255)' }]}
              onPress={() => navigation.navigate('Chat')}>
              <Image source={require('../assets/chat.png')} style={[styles.icon, { tintColor: '#ffffff' }]} />
            </TouchableOpacity>
    
            <TouchableOpacity
              style={[styles.button, { backgroundColor: 'rgb(240, 206, 13)' }]}
              onPress={() => navigation.navigate('Storage')}>
              <Image source={require('../assets/archive.png')} style={[styles.icon, { tintColor: '#ffffff' }]} />
            </TouchableOpacity>
    
            <TouchableOpacity
              style={[styles.button, { backgroundColor: 'rgb(19, 216, 150)' }]}
              onPress={() => navigation.navigate('Config')}>
              <Image source={require('../assets/cog.png')} style={[styles.icon, { tintColor: '#ffffff' }]} />
            </TouchableOpacity>
          </View>
        </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    flexGrow: 1,
    justifyContent: 'center',
  },
  title: {
    fontSize: 24,
    marginBottom: 20,
    textAlign: 'center',
  },
  input: {
    height: 50,
    borderColor: 'gray',
    borderWidth: 1,
    paddingHorizontal: 10,
    marginBottom: 10,
  },
  responseTitle: {
    marginTop: 20,
    fontSize: 18,
    fontWeight: 'bold',
  },
  response: {
    fontSize: 16,
    marginTop: 10,
  },
  menuContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    paddingVertical: 100,
    paddingHorizontal: 10,
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
  },
  button: {
    paddingVertical: 15,
    paddingHorizontal: 20,
    borderRadius: 5,
  },
  icon: {
    width: 35,
    height: 35,
  },
});
