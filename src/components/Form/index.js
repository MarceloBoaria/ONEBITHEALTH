import React, { useState } from 'react'
import { Text, TextInput, View, TouchableOpacity, Vibration, Pressable, Keyboard } from 'react-native'
import ResultImc from './ResulImc'
import styles from './style'

export default function Form(props) {

    const [height, setHeight] = useState(null)
    const [weight, setWeight] = useState(null)
    const [messageImc, setMessageImc] = useState("Preencha o Peso e Altura")
    const [imc, setImc] = useState(null)
    const [textButton, setTextButton] = useState("Calcular")
    const [errorMessage, setErrorMessage] = useState(null)

    function imcCalculator() {
        let heightFormat = height.replace(",",".")
        return setImc((weight/(heightFormat * heightFormat)).toFixed(2))
    }

    function verificationImc() {
        if (imc == null) {
            Vibration.vibrate()
            setErrorMessage("Campo Obrigatório!*")
        }
    }

    function validationImc() {
        if (weight != null && height != null) {
            imcCalculator()
            setHeight(null)
            setWeight(null)
            setMessageImc("Seu IMC é igual:")
            setTextButton("Calcular Novamente")
            setErrorMessage(null)
        } else {
            verificationImc()
            setImc(null)
            setTextButton("Calcular")
            setMessageImc("Preencha o Peso e Altura")
        }
    }

  return (
    <View style={styles.formContext}>
        {imc == null ? 
        <Pressable onPress={Keyboard.dismiss} style={styles.form}>
            <Text style={styles.formLabel}>Altura</Text>
            <Text style={styles.errorMessage}>{errorMessage}</Text>
            <TextInput
            style={styles.input}
            onChangeText={setHeight}
            value={height}
            placeholder='Ex. 1.75'
            keyboardType='numeric'
            />

            <Text style={styles.formLabel}>Peso</Text>
            <Text style={styles.errorMessage}>{errorMessage}</Text>
            <TextInput
            style={styles.input}
            onChangeText={setWeight}
            value={weight}
            placeholder='Ex. 86.300'
            keyboardType='numeric'
            />

            <TouchableOpacity
            style={styles.buttonCalculator}
            onPress={ () => {
                validationImc()
            }}
            >
            <Text style={styles.textButtonCalculator}>{textButton}</Text>
            </TouchableOpacity>
        </Pressable>
        : 
        <View style={styles.exhibitionResultImc}>
            <ResultImc messageResultImc={messageImc} resultImc={imc}/>
            <TouchableOpacity
            style={styles.buttonCalculator}
            onPress={ () => {
                validationImc()
            }}
            >
            <Text style={styles.textButtonCalculator}>{textButton}</Text>
            </TouchableOpacity>
        </View>
        }
    </View>
  );
}