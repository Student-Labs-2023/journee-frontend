import {useState} from "react";
import {useValidation} from "./useValidation";

export const useInput = (initialValue: any, validations: any) => {
    const [value, setValue] = useState(initialValue);
    const [isDirty, setDirty] = useState(false);
    const valid = useValidation(value, validations);

    const onChange = (e: any) => {
        setValue(e.target.value);
    }

    const onBlur = (e: any) => {
        setDirty(true);
    }

    return {
        value,
        onChange,
        onBlur,
        ...valid,
        isDirty
    }
}