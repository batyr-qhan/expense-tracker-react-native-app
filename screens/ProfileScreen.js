import { useContext, useEffect, useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import { GlobalStyles } from "../constants/styles";
import { AuthContext } from "../store/auth-context";
import Button from "../UI/Button";
import { getUserData } from "../utils/auth";

function ProfileScreen() {
  const authCtx = useContext(AuthContext);
  const [userDataEmail, setUserDataEmail] = useState("");

  useEffect(() => {
    fetchUserData();
  }, []);

  const fetchUserData = async () => {
    try {
      const response = await getUserData(authCtx.token);
      setUserDataEmail(response.users[0].email);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.listItem}>
        <View style={styles.infoContainer}>
          <Text style={styles.text}>Email: </Text>
        </View>

        <View style={styles.infoContainer}>
          <Text style={styles.text}>{userDataEmail}</Text>
        </View>
      </View>
    </View>
  );
}

export default ProfileScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: GlobalStyles.colors.metallicGrey,
    padding: 8,
  },
  listItem: {
    backgroundColor: GlobalStyles.colors.blueviolet,
    marginBottom: 8,
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
    borderRadius: 5,
  },
  infoContainer: {
    padding: 4,
    borderRadius: 6,
    width: "50%",
  },
  text: {
    backgroundColor: "#fff",
    marginHorizontal: 4,
    marginVertical: 2,
    padding: 8,
    borderRadius: 6,
  },
});
