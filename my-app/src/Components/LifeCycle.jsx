import React, { use, useEffect } from 'react'
import { useState } from 'react'

const LifeCycle = () => {
  const [text, setText] = useState("");


    useEffect(() => {
        console.log("El componente LifeCycle se ha montado");
    },[])

    useEffect(() => {
        console.log("El componente LifeCycle se ha actualizado");
    },[text])

    useEffect(() => {
        return () => {
            console.log("El componente LifeCycle se ha desmontado");
        }
    },[])

    useEffect(() => {
        console.log("Use Effect siempre se ejecuta");
    })

    return (
        <div>
        <input 
        type="text" 
        placeholder="Escribe algo"
        value={text}
        onChange={(e) => setText(e.target.value)}
        />
        </div>
    )
}

export default LifeCycle
