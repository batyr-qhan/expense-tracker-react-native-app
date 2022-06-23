import { useContext, useEffect } from "react";
import { StyleSheet, Text, View } from "react-native";
import { GlobalStyles } from "../constants/styles";
import { AuthContext } from "../store/auth-context";
import { getUserData } from "../utils/auth";

function ProfileScreen() {
  const authCtx = useContext(AuthContext);

  useEffect(() => {
    getUserData(authCtx.token);
  });

  return (
    <View style={styles.container}>
      <Text>This is profile page</Text>
      <Text>{authCtx.token}</Text>
    </View>
  );
}

export default ProfileScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: GlobalStyles.colors.metallicGrey,
    alignItems: "center",
    justifyContent: "center",
  },
});
