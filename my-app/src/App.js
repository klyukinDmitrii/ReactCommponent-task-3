import { useState } from 'react';
import styles from './App.module.css';

export const App = () => {
	const NUMS = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '0'];
	const SYMBOLS = ['C', '-', '+', '='];
	const [operand1, setOperand1] = useState('');
	const [operand2, setOperand2] = useState('');
	const [operator, setOperator] = useState('');
	const [result, setResult] = useState('');

	function reset() {
		setOperand1('');
		setOperand2('');
		setOperator('');
		setResult('');
	}

	function handlePutNumber({ target }) {
		if (operator === '+' || operator === '-') {
			if (operand2 === '0') {
				setOperand2((prev) => target.textContent);
			} else if (operand2.length < 10) {
				setOperand2((prev) => prev + target.textContent);
			}
		} else if (operator === '=') {
			if (operand1 === '0') {
				reset();
				setOperand1((prev) => target.textContent);
			} else {
				reset();
				setOperand1((prev) => prev + target.textContent);
			}
		} else if (operand1 === '0') {
			setOperand1((prev) => target.textContent);
		} else if (operand1.length < 10) {
			setOperand1((prev) => prev + target.textContent);
		}
	}

	function handlePutSymbol({ target }) {
		if (target.textContent === '=' && operator === '+') {
			setResult(+operand1 + +operand2);
		} else if (target.textContent === '=' && operator === '-') {
			setResult(+operand1 - +operand2);
		} else if (target.textContent === '=' && !operand2) {
			setResult(operand1);
		}

		if (
			operator === '=' &&
			(target.textContent === '-' || target.textContent === '+')
		) {
			reset();
			setOperand1(result);
			setOperator(target.textContent);
		} else {
			setOperator(target.textContent);
		}
	}

	if (operator === 'C') {
		reset();
	}

	return (
		<>
			<div className={styles.calculator}>
				<div
					className={
						styles.display + (operator === '=' ? ' ' + styles.result : '')
					}
				>
					<span className={styles['display-content']}>
						{operator === '='
							? result
							: `${operand1} ${operator} ${operand2}`}
					</span>
				</div>
				<div className={styles['button-container']}>
					<div className={styles['button-container__numbers']}>
						{NUMS.map((e) => (
							<button
								key={e}
								className={styles['button-numbers']}
								onClick={handlePutNumber}
							>
								{e}
							</button>
						))}
					</div>
					<div className={styles['button-container__symbols']}>
						{SYMBOLS.map((e) => (
							<button
								key={e}
								className={styles['button-symbols']}
								onClick={handlePutSymbol}
							>
								{e}
							</button>
						))}
					</div>
				</div>
			</div>
		</>
	);
};
