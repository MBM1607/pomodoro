import { faMinus, faPlus } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

interface TimeInputProps {
	id: string;
	value: number;
	setValue: (arg0: number) => void;
}

const TimeInput = ({ id, value, setValue }: TimeInputProps) => {

	const decrement = () => {
		setValue(Math.max(value - 60, 60));
	};

	const increment = () => {
		setValue(Math.min(value + 60, 3600))
	};

	return (
		<div className='time-input'>
			<span id={`${id}-label`} className='label'>
				{`${id} length`}
			</span>

			<div className='input-div'>
				<button id={`${id}-decrement`} onClick={decrement}>
					<FontAwesomeIcon icon={faMinus} />
				</button>
				<span id={`${id}-length`} className='input'>
					{value / 60}
				</span>
				<button id={`${id}-increment`} onClick={increment}>
					<FontAwesomeIcon icon={faPlus} />
				</button>
			</div>
		</div>
	)
};

export default TimeInput;
