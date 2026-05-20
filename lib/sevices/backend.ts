import axios from "axios";

const defaultBaseURL = process.env.EXPO_PUBLIC_API_URL ?? "http://localhost:3000";

export const backend = axios.create({
	baseURL: defaultBaseURL,
	headers: {
		Accept: "application/json",
		"Content-Type": "application/json",
	},
	timeout: 15000,
});
