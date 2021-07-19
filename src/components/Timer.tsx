import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPause, faPlay, faRedo } from '@fortawesome/free-solid-svg-icons';
import { Dispatch, SetStateAction } from 'react';
import State from '../interfaces/State';


interface TimerProps {
	state: State;
	setState: Dispatch<SetStateAction<State>>;
	resetState: () => void;
}

const displayNumeric = (num: number) => {
	return `${num.toString().padStart(2, '0')}`;
};

const displayTime = (seconds: number) => {
	return `${displayNumeric(Math.floor(seconds / 60))}:${displayNumeric(seconds % 60)}`
}

const Timer = ({ state, setState, resetState }: TimerProps) => {

	const start_stop = async () => {
		if (!state.play) {
			const intervalId = setInterval(() => {
				setState(prevState => {

					const alarm = document.getElementById('beep') as HTMLMediaElement;
					let seconds = prevState.seconds - 1;
					let play = prevState.play;
					let playSession = prevState.playSession;

					if (seconds < 0) {
						alarm.play();

						if (prevState.playSession) {
							playSession = false;
							seconds = prevState.breakLength;
						}
						else {
							playSession = true;
							seconds = prevState.sessionLength;
						}
					}

					return {
						seconds: seconds,
						sessionLength: prevState.sessionLength,
						breakLength: prevState.breakLength,
						playSession: playSession,
						play: play,
						intervalId: prevState.intervalId
					};
				})
			}, 1000);

			setState({
				seconds: state.seconds,
				playSession: state.playSession,
				sessionLength: state.sessionLength,
				breakLength: state.breakLength,
				play: true,
				intervalId: intervalId
			});
		}
		else {
			state.intervalId && clearInterval(state.intervalId);

			setState({
				seconds: state.seconds,
				playSession: state.playSession,
				sessionLength: state.sessionLength,
				breakLength: state.breakLength,
				play: false,
				intervalId: undefined
			});
		}

	}

	return (
		<div className='timer'>
			<p id='timer-label'>{state.playSession ? 'Session' : 'Break' }</p>
			<p id='time-left'>
				{displayTime(state.seconds)}
			</p>
			<div className='timer-btn-container'>
				<button id='start_stop' className='icon' onClick={start_stop}>
					<FontAwesomeIcon icon={state.play ? faPause : faPlay} />
				</button>
				<button id='reset' className='icon' onClick={resetState}>
					<FontAwesomeIcon icon={faRedo} />
				</button>
			</div>
		</div>
	)
};

export default Timer;
