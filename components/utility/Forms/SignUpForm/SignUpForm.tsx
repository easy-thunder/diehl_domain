import TextInput from "../textInput/TextInput"
import DarkButton from "../../button/darkButton"
import SocialsComponent from "../SocialsComponent"
import { supabase } from "@/lib/supaBase/supabaseClient";
import { useState } from "react";

export default function SignUpForm(){  
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [username, setUsername] = useState("");
    const [loading, setLoading] = useState(false);
    const [errorMessage, setErrorMessage] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");



    const handleSignUp = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setErrorMessage("");
        if (password !== confirmPassword) {
          setErrorMessage("Passwords do not match");
          return;
        }
    
        const { data, error } = await supabase.auth.signUp({
          email,
          password,
          options: {
            data: { username },
            // redirect user back to your app after they click the link
            emailRedirectTo: `${location.origin}`,
          },
        });

        if (error) {
          setErrorMessage(error.message);
        } else {
          const userId = data?.user?.id
          const { error: insertError } = await supabase
          .from("users")
          .insert([{ id: userId, username, win_percent: 100, wins: 0, losses: 0, games_played: 0 }]);
      
        if (insertError) {
          console.error("Insert error:", insertError.message);
        }
          setErrorMessage("Check your email to confirm your signup!");
        }
    
        setLoading(false);
      };
      if(loading){
        return<>loading....</>
      }
      if(errorMessage){
        return<>Error....{errorMessage}</>
      }


    return(<div className="spaceBelow">
        <h1>Sign Up</h1>
        <p> Enable voice chat, start instant messaging, and make a friends list by making an account.</p>
        <form onSubmit={handleSignUp}>
            <div className="inputContainer">

                <TextInput label="Email" placeholder="Please Enter Email" name="Email" type="email" onChange={(e) => setEmail(e.target.value)} required/>
                <TextInput label="User Name" placeholder="Please Enter User Name" name="UserName" type="text" onChange={(e)=> setUsername(e.target.value)} required/>
                <TextInput label="Password" placeholder="Please Enter Password" name="Password" type="password" onChange={(e) => setPassword(e.target.value)} required/>
                <TextInput label="Confirm Password" placeholder="Please Confirm Password" name="ConfirmPassword" onChange={(e)=>setConfirmPassword(e.target.value)} type="password"/> 
            </div> 
            <div className="buttonContainer">

            <DarkButton content="Sign Up" type="submit" clicking=""/>
            </div>
        </form>
            <p>Or sign up with:</p>
        <SocialsComponent />

            
    </div>
)}