import React from 'react';
import {useState} from 'react'
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';

export default function App() {
  // Mapeamento de teclas
  const buttons = ['LIMPAR', 'DEL', '%', '/', 7 ,8, 9, "x", 4, 5, 6, '-', 1, 2, 3, '+', 0, '.', '+/-', '=']

  const [currentNumber, setCurrentNumber] = useState("")
  const [lastNumber, setLastNumber] = useState("")


  function calculator(){
    const splitNumbers = currentNumber.split(' ')
    const fistNumber = parseFloat(splitNumbers[0])
    const lastNumber = parseFloat(splitNumbers[2])
    const operator = splitNumbers[1]

    if(currentNumber.slice(-1) == '%')
    {
      switch(operator){
        case '+':
          setCurrentNumber((fistNumber + (fistNumber * lastNumber / 100)).toString())
          return
        case '-': 
          setCurrentNumber((fistNumber - (fistNumber * lastNumber / 100)).toString())
          return
        case 'x':
          setCurrentNumber((fistNumber * lastNumber / 100).toString()) // O sinal estava de soma ao invés de multiplicação
          return
        case '/': 
          setCurrentNumber((fistNumber / (fistNumber * lastNumber / 100)).toString()) // O sinal estava de subtração ao invés de divisão
          return
      }
    }
    // Faz ação referente tecla pressionada
    switch(operator){
      case '+':
        setCurrentNumber((fistNumber + lastNumber).toString())
        return
      case '-': 
        setCurrentNumber((fistNumber - lastNumber).toString())
        return
      case 'x':
        setCurrentNumber((fistNumber * lastNumber).toString()) // O sinal estava de soma ao invés de multiplicação
        return
      case '/': 
        setCurrentNumber((fistNumber / lastNumber).toString()) // O sinal estava de subtração ao invés de divisão
        return
    }
  }

  function handleInput(buttonPressed){
    console.log(buttonPressed) // Mostra no Console a tecla pressionada
    if(buttonPressed === '+' | buttonPressed === "-" | buttonPressed === "x" | buttonPressed === "/" ){
      setCurrentNumber(currentNumber + " " + buttonPressed + " ")
      return
    }
    switch(buttonPressed){
      case 'DEL':
        setCurrentNumber(currentNumber.substring(0, (currentNumber.length - 2)))
        return
      case 'LIMPAR': // Limpa todo o conteúdo
        setLastNumber("") 
        setCurrentNumber("") 
        return
      case '=':
        setLastNumber(currentNumber + " = ")
        calculator()
        return
      case '+/-':
        return
    }

    setCurrentNumber(currentNumber + buttonPressed)
  }


  return (
    <View style={styles.container}>

      {/* Area onde o resultado é exibido */}
      <View style={styles.results}>
        <Text style={styles.historyText}>{lastNumber}</Text>
        <Text style={styles.resultText}>{currentNumber}</Text>
      </View>

      {/* Area onde os botões são exibidos*/}
      <View style={styles.buttons}>

        {buttons.map((button) => 
          button === '=' ? // Mapeamento do botão =
        <TouchableOpacity onPress={() => handleInput(button)} key={button} style={[styles.button, {backgroundColor: '#000039'}]}>
          <Text style={[styles.textButton, {color: "white", fontSize: 30}]}>{button}</Text>
        </TouchableOpacity>
          : // Mapeamento dos outros botões
          <TouchableOpacity onPress={() => handleInput(button)} key={button} style={styles.button}>
            <Text style={[styles.textButton, {color: typeof(button) === 'number' ? 'white': '#7c7c7c'}]}>{button}</Text>
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
}

/* Estilização */
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  results: {
    flex: 2,
    justifyContent: "center",
    backgroundColor: "#000039"
  },
  resultText: {
    color: "#FFFF",
    fontSize: 32,
    fontWeight: "bold",
    padding: 12,
    textAlign: "right"
  },
  historyText:{
    color: "#646666",
    fontSize: 20,
    marginRight: 10,
    alignSelf: 'flex-end',
  },
  buttons: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    color: "#FFFFFF"
  },
  button: {
    backgroundColor: '#6B0E85',
    alignItems: 'center',
    justifyContent: 'center',
    minWidth: 90, 
    minHeight: 90,
    flex: 2,
  },
  textButton: {
    color: "#FFF",
    fontSize: 20,
  } 
});
