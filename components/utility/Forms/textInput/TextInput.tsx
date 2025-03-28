import { TextInputType } from "./TextInputType"

export default function TextInput({label,placeholder,name,value,type="text",onChange}:TextInputType){
    return<div className={`text-input`}>
        <label className={"text-input__label"} htmlFor={`${name}`}>{label}</label>
        <input id={`${name}`} name={`${name}`} placeholder={`${placeholder}`} className="text-input__field" value={value} onChange={onChange} type={type}/>
    </div>
}
