import React,{ useState, useEffect} from "react";


const useForm = (initialValue, validate, setCurrentID)=>{
    const [values, setValues] = useState(initialValue)
    const [errors, setErrors] = useState({}) 


    const handleInputChange = e =>{
        const {name,value}=e.target
        const fieldValues = {[name]:value}
        setValues({
            ...values,
            ...fieldValues
        })
        validate(fieldValues)
    }

    const reset = () =>{
        setValues({
            ...initialValue
        })
        setErrors({})
        setCurrentID(0)
    }

    return {values,
        setValues,
        errors,
        setErrors,
        handleInputChange,
        reset};
    }

export default useForm;