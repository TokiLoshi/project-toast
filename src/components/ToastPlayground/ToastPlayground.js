import React from "react";

import Button from "../Button";

import styles from "./ToastPlayground.module.css";
import ToastShelf from "../ToastShelf";
import { ToastContext } from "../ToastProvider";

const VARIANT_OPTIONS = ["notice", "warning", "success", "error"];

function ToastPlayground() {
	const [message, setMessage] = React.useState("");
	const [variant, setVariant] = React.useState(VARIANT_OPTIONS[0]);
	const { createToast } = React.useContext(ToastContext);

	function handleToastCreation(event) {
		event.preventDefault();
		createToast(message, variant);

		setMessage("");
		setVariant(VARIANT_OPTIONS[0]);
	}

	// function handleDismiss(id) {
	// 	const nextToasts = toasts.filter((toast) => {
	// 		return toast.id !== id;
	// 	});
	// 	setToasts(nextToasts);
	// }
	return (
		<div className={styles.wrapper}>
			<header>
				<img alt='Cute toast mascot' src='/toast.png' />
				<h1>Toast Playground</h1>
			</header>
			<ToastShelf />
			<form className={styles.controlsWrapper} onSubmit={handleToastCreation}>
				<div className={styles.row}>
					<label
						htmlFor='message'
						className={styles.label}
						style={{ alignSelf: "baseline" }}>
						Message
					</label>
					<div className={styles.inputWrapper}>
						<textarea
							value={message}
							id='message'
							className={styles.messageInput}
							onChange={(event) => {
								setMessage(event.target.value);
							}}
						/>
					</div>
				</div>

				<div className={styles.row}>
					<div className={styles.label}>Variant</div>
					<div className={`${styles.inputWrapper} ${styles.radioWrapper}`}>
						{VARIANT_OPTIONS.map((option) => {
							return (
								<label htmlFor='variant-notice' key={`variant-${option}`}>
									<input
										id='variant-notice'
										key={option}
										type='radio'
										name='variant'
										value={option}
										checked={variant === option}
										onChange={(event) => {
											setVariant(event.target.value);
										}}
									/>
									{option}
								</label>
							);
						})}
					</div>
				</div>

				<div className={styles.row}>
					<div className={styles.label} />
					<div className={`${styles.inputWrapper} ${styles.radioWrapper}`}>
						<Button onClick={handleToastCreation}>Pop Toast!</Button>
					</div>
				</div>
			</form>
		</div>
	);
}

export default ToastPlayground;
