import TextInput from "../FormBox/textInput/TextInput"

export default function FormLogin(){  
    return(<>
        <form>
            <TextInput label="Email" placeholder="Please Enter Email" name="Email" type="email"/>
            <TextInput label="Password" placeholder="Please Enter Password" name="Password" type="password"/>
            <button type="submit">Login</button>
        </form>
    
    </>)
}