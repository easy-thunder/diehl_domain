import { TextInputType } from "./TextInputType"

export default function TextInput({label,placeholder,name,value,type="text",onChange, required, customLabelStyle,}:TextInputType ){
    return<div className={`text-input`}>
        <label style={customLabelStyle} className={"text-input__label"} htmlFor={`${name}`}>{label}</label>
        <input id={`${name}`} name={`${name}`} placeholder={`${placeholder}`} className="text-input__field" value={value} onChange={onChange} type={type} required={required}  />
    </div>
}
