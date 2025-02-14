import React, {useContext, useState} from "react";

import { yupResolver } from "@hookform/resolvers/yup";
import { Input, Button, Layout, Text, Icon } from "@ui-kitten/components";
import { auth } from "firebase";
import LottieView from "lottie-react-native";
import { useForm, Controller } from "react-hook-form";
import {
	ActivityIndicator,
	KeyboardAvoidingView,
	Platform,
	ScrollView,
	StyleSheet,
	TouchableOpacity,
	View
} from "react-native";
import * as yup from "yup";

import {Loading} from "../../components";
import Header from "../../components/Header";
import {SCREENS} from "../../constant";
import {ContextData} from "../../context";
import {navigate} from "../../navigation";
import {screenSize} from "../../styles";

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
	const [isLoading, setLoading] = useState<boolean>(false);
	const { setLogin } = useContext(ContextData);
	const onSubmit = ({ email, password }: {email: string, password: string}) => {
		setLoading(true);
		if (isLoginProcess) {
			auth()
				.signInWithEmailAndPassword(
					email.trim().toLocaleLowerCase(),
					password
				)
				.then(() => {
					setLogin(true);
					setLoading(false);
					navigate(SCREENS.BlogScreen);
				})
				.catch((error: any) => {
					console.log(error);
					if (error.code === "auth/wrong-password") {
						alert(
							"The password is invalid or the user does not have a password"
						);
					}
					if (error.code === "auth/invalid-email") {
						alert("That email address is invalid!");
					}
					if (error.code === "auth/user-not-found") {
						alert(
							"User corresponding to that email does not exist"
						);
					}
					if (error.code === "auth/weak-password") {
						alert("Your password is not strong enough");
					}
					if (error.code === "auth/network-request-failed") {
						alert("Network error");
					}
					setLoading(false);
				});
		} else {
			auth()
				.createUserWithEmailAndPassword(
					email.trim().toLocaleLowerCase(),
					password
				)
				.then(() => {
					setLoading(false);
					alert("That account was created successful!");
				})
				.catch((error: any) => {
					if (error.code === "auth/email-already-in-use") {
						alert("That email address is already in use!");
					}
					if (error.code === "auth/invalid-email") {
						alert("That email address is invalid!");
					}
					console.error(error);
					setLoading(false);
				});
		}
	};

	return (
		<Layout style={{flex: 1}}>
			<Loading isLoading={isLoading} />
			<Header
				name="arrow-back-outline"
				title={"LOGIN"}
				onPress={() => navigate("BlogScreen")}
			/>
			<KeyboardAvoidingView
				behavior={Platform.OS == "ios" ? "padding" : "height"}
				style={{ flex: 1 }}>
				<ScrollView
					style={{ paddingHorizontal: 25, flex: 1 }}
					contentContainerStyle={{alignItems: "center"}}>
					<View style={{paddingVertical: 15}}>
						<LottieView
							source={require("../../../assets/68312-login.json")}
							autoPlay
							loop
							style={styles.lottie}
						/>
					</View>
					<View style={{width: "100%"}}>
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
							defaultValue="123@gmail.com"
						/>
						{errors.email && (
							<Text style={styles.textError}>{errors.email.message}</Text>
						)}
					</View>
					<View style={{width: "100%"}}>
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
					</View>
					<Button
						status="info"
						style={styles.button}
						onPress={handleSubmit?.(onSubmit)}
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
				</ScrollView>
			</KeyboardAvoidingView>
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
		width: "100%"
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
	loading: {position: "absolute", top: 0, bottom: 0, right: 0, left: 0},
	lottie: {
		width: 400,
		height: 200,
	}
});
