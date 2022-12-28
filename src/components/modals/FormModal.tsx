import { useEffect, useState } from "react";
import { Animated, ImageBackground, StyleSheet, View } from "react-native";
import PaperForm from "../../../assets/Images/paperFormTEMP.png";
import Button from "../buttons/Buttons";
import { SignUpForm } from "../forms/Signup";


type ModalProps = {
    // Text maybe for future cases when the modal has a badge for a title. Might not use this tho.
    text?: string;
    onEmit: Function;
    formName: string | undefined;
};

export default function FormModal({ text, formName, onEmit }: ModalProps) {
    const [formNameState, setformNameState] = useState<string | undefined>();
    const translateX = new Animated.Value(1000);  // Initial value for translateX

    useEffect(() => {
        if (formNameState !== formName) setformNameState(formName);
    }, [formName])

    useEffect(() => {
        if (formNameState) {
            // Animate slide in.
            Animated.timing(translateX, {
                toValue: 0,
                duration: 1000,
                useNativeDriver: true
            }).start();
        } else {
            // Animate slide out.
            Animated.timing(translateX, {
                toValue: 1000,
                duration: 1000,
                useNativeDriver: true
            }).start();
        }
    }, [formNameState])

    const styles = StyleSheet.create({
        modal: {
            position: 'absolute',
            zIndex: 10,
        }
    })

    return (
        <Animated.View style={[styles.modal, { transform: [{ translateX }] }]}>
            <ImageBackground resizeMode="stretch" source={PaperForm}>
                <View style={{ width: "100 %", alignSelf: "flex-end" }}>
                    <Button
                        background="Close"
                        onPress={() => { setformNameState(undefined); onEmit(undefined) }}
                    />
                </View>
                {formNameState === "SignUp" &&
                    <SignUpForm />
                }
            </ImageBackground>
        </Animated.View>
    );
}
