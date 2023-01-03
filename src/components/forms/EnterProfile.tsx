import { DocumentData } from "firebase/firestore";
import { useEffect, useState } from "react";
import { View, StyleSheet } from "react-native";
import Button from "../buttons/Buttons";
import { TextInput } from "../CustomInput";
import { Text } from "../Text";

type EnterProfileProps = {
    name: any;
    pin: any;
    parent: any;
    onClose?: () => void;
}

export const EnterProfile = ({ name, pin, parent, onClose }: EnterProfileProps) => {
    const [pinState, setPinState] = useState("");

    const styles = StyleSheet.create({
        container: {
        },
    });

    const handleSubmit = () => {
        // Compare pin from db to entered pin.
        if (pinState === pin) {
            if (parent) {
                // If the profile is parent then navigate to selectProfile but with parent view 
                // (parent wont need to enter pin for other profiles and wont see own profile again)
                // Set a global parent state to true
                console.log("This is a parent profile");
                if (onClose) onClose();
            } else {
                //Here the user gets navigated to their room.
                console.log("This is a child profile");
                if (onClose) onClose();
            }
        }
    };

    return (
        <View style={styles.container}>
            <Text>{`Welcome ${name}`}</Text>
            <Text type="formText">Enter your profile</Text>
            <TextInput
                placeholder="Enter PIN code"
                secureTextEntry
                autoCapitalize="none"
                value={pinState}
                onChangeText={(changedPin) => setPinState(changedPin)}
            />
            <Button
                background="GreenForms"
                text="Enter profile"
                onPress={handleSubmit}
            />
        </View>
    );
};
