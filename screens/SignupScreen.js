import { useState, useContext } from "react";
import { Alert } from "react-native";
import AuthContent from "../components/Auth/AuthContent";
import { AuthContext } from "../store/auth-context";
import LoadingOverlay from "../UI/LoadingOverlay";
import { createUser } from "../utils/auth";

function SignupScreen() {
  const [isAuthenticating, setIsAuthenticating] = useState(false);

  const authCtx = useContext(AuthContext);

  async function signupHandler({ email, password }) {
    setIsAuthenticating(true);
    try {
      const token = await createUser(email, password);
      authCtx.authenticate(token);
    } catch (err) {
      Alert.alert("Auth failed!", "could not create user, check input data");
      setIsAuthenticating(false);
    }
  }

  if (isAuthenticating) {
    return <LoadingOverlay message="it is being processed... " />;
  }

  return <AuthContent onAuthenticate={signupHandler} />;
}

export default SignupScreen;
