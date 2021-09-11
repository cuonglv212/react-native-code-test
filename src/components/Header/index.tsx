import React from "react";
import {StyleSheet, TouchableOpacity, View} from "react-native";
import { Icon, Text } from "@ui-kitten/components";
import {screenSize} from "../../styles";

type Props = {
    onPress: () => void;
    name: string;
};

export default function Header({ onPress, name }: Props) {
    return (
        <TouchableOpacity onPress={onPress} style={styles.container}>
            <Icon style={styles.icon} fill="#8F9BB3" name={name} />

            <Text style={styles.textHeader}>Header</Text>
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    container: {
        width: '100%',
        backgroundColor: "white",
        alignItems: "center",
        justifyContent: "center",
        flexDirection: 'row',
        paddingHorizontal: 15
    },
    icon: {
        width: 24,
        height: 24,
    },
    textHeader: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        textAlign: "center",
        fontWeight: 'bold',
        fontSize: 16
    }
});
