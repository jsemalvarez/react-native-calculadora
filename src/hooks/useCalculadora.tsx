import { useRef, useState } from "react"

enum Operadores {
    sumar, restar, multiplicar, dividir
}

export const useCalculadora = () => {

    const [numeroAnterior, setNumeroAnterior] = useState('0')
    const [numero, setNumero] = useState('0')

    const ultimaOperacion = useRef<Operadores>()

    const limpiar = () => {
        setNumero('0')
        setNumeroAnterior('0')
    }

    const armarNumero = ( numeroTexto: string ) => {


        if( numero.includes('.') && numeroTexto === '.' ) return;

        if( numero.startsWith('0') || numero.startsWith('-0')){

            //punto decimal
            if( numeroTexto === '.'){
                setNumero( numero + numeroTexto )

                //Evaluar si es otro cero, y hay un punto 
            }else if( numeroTexto === '0' && numero.includes('.') ){
                setNumero( numero + numeroTexto)

                // Evaluar si es diferente de cero y no tiene un punto
            }else if( numeroTexto !== '0' && !numero.includes('.') ){
                setNumero( numeroTexto )

                //Evitar 0000.00
            }else if( numeroTexto === '0' && !numero.includes('.') ){
                setNumero( numeroTexto )
            }else{
                setNumero( numero + numeroTexto )
            }


        }else{
            setNumero( numero + numeroTexto)
        }

    }

    const positivoNegativo = () => {
        if( numero.includes('-')){
            setNumero( numero.replace('-', ''))
        }else{
            setNumero('-' + numero )
        }
    }

    const btnDel = () => {

        if( numero.startsWith('-') && numero.length === 2){
            setNumero('0')
        }else if( numero.length === 1 ){
            setNumero('0')
        }else{
            setNumero( numero.slice( 0 , -1 ))
        }
    }

    const cambiarNumeroPorAnterior = () => {

        // evitar 2220. 
        if( numero.endsWith('.') ){
            setNumeroAnterior( numero.slice(0,-1) )
        }else{
            setNumeroAnterior( numero )
        }
        setNumero('0')
    }

    const btnDividir = () => {
        cambiarNumeroPorAnterior()
        ultimaOperacion.current = Operadores.dividir
    }

    const btnMultiplicar = () => {
        cambiarNumeroPorAnterior()
        ultimaOperacion.current = Operadores.multiplicar
    }

    const btnRestar = () => {
        cambiarNumeroPorAnterior()
        ultimaOperacion.current = Operadores.restar
    }

    const btnSumar = () => {
        cambiarNumeroPorAnterior()
        ultimaOperacion.current = Operadores.sumar
    }

    const calcular = () => {

        const num1 = Number( numeroAnterior )
        const num2 = Number( numero )

        switch ( ultimaOperacion.current ) {

            case Operadores.sumar:
                    setNumero( `${ num1 + num2}` )
                break;

            case Operadores.restar:
                setNumero( `${ num1 - num2}` )
                break;
            
            case Operadores.multiplicar:
                setNumero( `${ num1 * num2}` )
                break;

            case Operadores.dividir:
                if(num2 !== 0){
                    setNumero( `${ num1 / num2}` )
                }
                break;

        }
        setNumeroAnterior('0')
    }

    return{
        numero,
        numeroAnterior,
        limpiar,
        armarNumero,
        btnDel,
        positivoNegativo,
        btnDividir,
        btnMultiplicar,
        btnRestar,
        btnSumar,
        calcular,
    }
   
}
