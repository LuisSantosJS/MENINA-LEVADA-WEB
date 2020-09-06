import React, { HTMLAttributes, useCallback} from 'react';
const Input: React.FC<HTMLAttributes<HTMLInputElement>> = ({ ...props }) => {

    const handleKeyUp = useCallback((e: React.FormEvent<HTMLInputElement>)=>{
        e.currentTarget.maxLength = 9;
        let value = e.currentTarget.value;
        value = value.replace(/\D/g,"");
        value = value.replace(/ˆ(\d{5})(\d)/,"$1-$2");
        e.currentTarget.value = value;
    },[])
    return (
        <input {...props} onKeyUp={handleKeyUp} />
    )
}

export default Input;