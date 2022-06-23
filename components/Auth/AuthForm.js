import { useState } from "react";
import { StyleSheet, View, ScrollView } from "react-native";

import Button from "../../UI/Button";
import Input from "./Input";
import SecondaryButton from "../../UI/SecondaryButton";
import { useNavigation } from "@react-navigation/native";

function AuthForm({ isLogin, onSubmit, credentialsInvalid }) {
  const [enteredEmail, setEnteredEmail] = useState("");
  const [enteredPassword, setEnteredPassword] = useState("");
  const [enteredConfirmPassword, setEnteredConfirmPassword] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [company, setCompany] = useState("");

  const navigation = useNavigation();

  const {
    email: emailIsInvalid,
    password: passwordIsInvalid,
    confirmPassword: passwordsDontMatch,
  } = credentialsInvalid;

  function updateInputValueHandler(inputType, enteredValue) {
    switch (inputType) {
      case "email":
        setEnteredEmail(enteredValue);
        break;
      case "password":
        setEnteredPassword(enteredValue);
        break;
      case "confirmPassword":
        setEnteredConfirmPassword(enteredValue);
        break;
      case "firstName":
        setFirstName(enteredValue);
        break;
      case "lastName":
        setLastName(enteredValue);
        break;
      case "company":
        setCompany(enteredValue);
        break;
    }
  }

  function submitHandler() {
    onSubmit({
      email: enteredEmail,
      password: enteredPassword,
      confirmPassword: enteredConfirmPassword,
    });
  }

  return (
    <ScrollView style={styles.form}>
      {!isLogin && (
        <>
          <Input
            label="First name"
            onUpdateValue={updateInputValueHandler.bind(this, "firstName")}
            value={firstName}
          />
          <Input
            label="Last name"
            onUpdateValue={updateInputValueHandler.bind(this, "lastName")}
            value={lastName}
          />
        </>
      )}
      <Input
        label="Email Address"
        onUpdateValue={updateInputValueHandler.bind(this, "email")}
        value={enteredEmail}
        keyboardType="email-address"
        isInvalid={emailIsInvalid}
      />

      <Input
        label="Password"
        onUpdateValue={updateInputValueHandler.bind(this, "password")}
        secure
        value={enteredPassword}
        isInvalid={passwordIsInvalid}
      />
      {!isLogin && (
        <Input
          label="Confirm Password"
          onUpdateValue={updateInputValueHandler.bind(this, "confirmPassword")}
          secure
          value={enteredConfirmPassword}
          isInvalid={passwordsDontMatch}
        />
      )}
      <View style={styles.buttons}>
        <Button
          onPress={submitHandler}
          title={isLogin ? "Log In" : "Sign Up"}
        />
        <SecondaryButton
          onPress={() => {
            if (isLogin) {
              navigation.navigate("Signup");
            } else {
              navigation.navigate("Login");
            }
          }}
        >
          {isLogin ? "sign up instead" : "login instead"}
        </SecondaryButton>
      </View>
    </ScrollView>
  );
}

export default AuthForm;

const styles = StyleSheet.create({
  form: {
    color: "#000",
  },
  buttons: {
    marginTop: 12,
  },
});
