import React from "react";
import useKeyDown from "../../hooks/useKeyDown";

export const ToastContext = React.createContext();

function ToastProvider({ children }) {
	const [toasts, setToasts] = React.useState([
		{
			id: crypto.randomUUID(),
			message: "Oh no, error!",
			variant: "error",
		},
		{
			id: crypto.randomUUID(),
			message: "yay, logged in",
			variant: "success",
		},
		{
			id: crypto.randomUUID(),
			message: "this is a warning",
			variant: "warning",
		},
	]);
	const handleEscape = React.useCallback(() => {
		setToasts([]);
	}, []);
	useKeyDown("Escape", handleEscape);

	function createToast(message, variant) {
		const nextToasts = [
			...toasts,
			{
				id: crypto.randomUUID(),
				message,
				variant,
			},
		];
		setToasts(nextToasts);
	}

	function handleDismiss(id) {
		const nextToasts = toasts.filter((toast) => {
			return toast.id !== id;
		});
		setToasts(nextToasts);
	}
	return (
		<ToastContext.Provider value={{ toasts, createToast, handleDismiss }}>
			{children}
		</ToastContext.Provider>
	);
}

export default ToastProvider;
