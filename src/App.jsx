import styles from './App.module.css';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';

const regEmail =
	/^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/;

const fieldsSchema = yup.object().shape({
	email: yup
		.string()
		.required('Обязательное поле')
		.matches(regEmail, 'Некорректный email'),
	password: yup
		.string()
		.required('Обязательное поле')
		.max(12, 'Пароль должен быть короче')
		.min(3, 'Пароль должен быть длиннее'),
	repeatPassword: yup
		.string()
		.required('Обязательное поле')
		.oneOf([yup.ref('password'), null], 'Пароли не совпадают'),
});

export const App = () => {
	const {
		register,
		handleSubmit,
		reset,
		setFocus,
		watch,
		formState: { errors },
	} = useForm({
		defaultValues: {
			email: '',
			password: '',
			repeatPassword: '',
		},
		resolver: yupResolver(fieldsSchema),
	});

	const sendData = (formData) => {
		console.log(formData);
		reset();
	};

	watch((data) => {
		if (data.password === data.repeatPassword) {
			setFocus('button');
		}
	});

	const loginError = errors.repeatPassword?.message;

	return (
		<div className={styles.app}>
			<h1>Регистрация</h1>
			<form onSubmit={handleSubmit(sendData)}>
				<div className={styles.errorLabel}>{errors.email?.message}</div>
				<input
					type="email"
					name="email"
					placeholder="Почта"
					{...register('email')}
				/>
				<div className={styles.errorLabel}>{errors.password?.message}</div>
				<input
					type="password"
					name="password"
					placeholder="Пароль"
					{...register('password')}
				/>
				<div className={styles.errorLabel}>{errors.repeatPassword?.message}</div>
				<input
					type="password"
					name="repeatPassword"
					placeholder="Повторите пароль"
					{...register('repeatPassword')}
				/>
				<button {...register('button')} type="submit" disabled={!!loginError}>
					Зарегистрироваться
				</button>
			</form>
		</div>
	);
};
