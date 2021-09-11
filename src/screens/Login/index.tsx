import React, { useState } from "react";
import {StyleSheet, TouchableOpacity} from "react-native";
import { Input, Button, Layout, Text, Icon } from "@ui-kitten/components";
import Header from "../../components/Header";
import {navigate} from "../../navigation";
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

type Props = {
};

export type LoginType = {
    email: string;
    password: string;
};

export const YupLogin = yup.object().shape({
    email: yup
        .string()
        .email("Invalid email provided")
        .required("email is required"),
    password: yup
        .string()
        .min(8, ({ min }) => `Password must be at least ${min} characters`)
        .required("Password is required"),
});


export default function Login(props: Props) {
    const {
        handleSubmit,
        control,
        formState: { errors },
    } = useForm<LoginType>({ resolver: yupResolver(YupLogin) });
    const [showPassword, setShowPassword] = useState<boolean>(true);
    const [isLoginProcess, setIsLoginProcess] = useState<boolean>(true);
    const onSubmit = handleSubmit(({ email, password }) => {
    });

    return (
        <Layout style={{flex: 1}}>
            <Header
                name="arrow-ios-back-outline"
                onPress={() => navigate('BlogScreen')}
            />
            <Controller
                control={control}
                render={({ field: { onChange, onBlur, value } }) => (
                    <Input
                        placeholder="Email"
                        onBlur={onBlur}
                        style={!errors.email && styles.input}
                        value={value}
                        onChangeText={(nextValue) => onChange(nextValue)}
                    />
                )}
                name="email"
                rules={{ required: true }}
                defaultValue=""
            />
            {errors.email && (
                <Text style={styles.textError}>{errors.email.message}</Text>
            )}
            <Controller
                control={control}
                render={({ field: { onChange, onBlur, value } }) => (
                    <Input
                        placeholder="Password"
                        style={!errors.password && styles.input}
                        onBlur={onBlur}
                        value={value}
                        onChangeText={(nextValue) => onChange(nextValue)}
                        secureTextEntry={showPassword}
                        accessoryRight={() => (
                            <TouchableOpacity
                                onPress={() => setShowPassword(!showPassword)}
                            >
                                <Icon
                                    style={styles.icon}
                                    fill="#8F9BB3"
                                    name={showPassword ? "eye-off" : "eye"}
                                />
                            </TouchableOpacity>
                        )}
                    />
                )}
                name="password"
                rules={{ required: true }}
                defaultValue=""
            />
            {errors.password && (
                <Text style={styles.textError}>{errors.password.message}</Text>
            )}
            <Button
                status="info"
                style={styles.button}
                onPress={() => onSubmit()}
            >
                {isLoginProcess ? "LOGIN" : "REGISTER"}
            </Button>
            <Text style={{ marginTop: 20, alignSelf: "center" }}>
                {isLoginProcess ? "Dont have account yet?" : "Have an account?"}
            </Text>
            <TouchableOpacity
                onPress={() => setIsLoginProcess(!isLoginProcess)}
                style={{ alignSelf: "center" }}
            >
                <Text style={{ fontFamily: "Roboto-Bold", margin: 10 }}>
                    {isLoginProcess ? "Register here" : "Login Here"}
                </Text>
            </TouchableOpacity>
        </Layout>
    );
}

const styles = StyleSheet.create({
    input: {
        marginBottom: 5,
    },
    button: {
        marginTop: 50,
        borderRadius: 10,
    },
    textError: {
        color: "red",
        fontSize: 13,
        marginBottom: 15,
        marginStart: 2,
    },
    icon: {
        width: 25,
        height: 25,
    },
});
