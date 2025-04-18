import { useState } from "react";
import TextInput from "../textInput/TextInput";
import DarkButton from "../../button/darkButton";
import SocialsComponent from "../SocialsComponent";
import { supabase } from "@/lib/supaBase/supabaseClient";
import { useRouter } from "next/router";

export default function FormLogin() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const handleSignIn = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setErrorMessage("");

    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      setErrorMessage(error.message);
    } else {
      console.log("Signed in:", data);
      router.push("/games/bearsHaresAndSnares"); // or wherever you want to go
    }

    setLoading(false);
  };

  return (
    <div className="spaceBelow">
      <h1>Login for Games</h1>
      <form onSubmit={handleSignIn}>
        <div className="inputContainer">
          <TextInput
            label="Email"
            placeholder="Please Enter Email"
            name="Email"
            type="email"
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <TextInput
            label="Password"
            placeholder="Please Enter Password"
            name="Password"
            type="password"
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        {errorMessage && <p className="error">{errorMessage}</p>}
        <div className="buttonContainer">
          <DarkButton content={loading ? "Logging in..." : "Login"} type="submit" clicking="" />
        </div>
      </form>
      <span>Or login with:</span>
      <SocialsComponent />
    </div>
  );
}
