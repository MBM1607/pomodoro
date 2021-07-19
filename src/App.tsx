import TimeInput from './components/TimeInput';
import Timer from './components/Timer';
import State from './interfaces/State';
import './App.scss';
import { useState } from 'react';
import GithubCorner from 'react-github-corner';

const App = () => {

	const [state, setState] = useState<State>({
		seconds: 1500,
		sessionLength: 1500,
		breakLength: 300,
		playSession: true,
		play: false,
		intervalId: undefined
	});

	const handleSessionChange = (num: number) => {
		if (!state.play) {
			setState({
				seconds: state.playSession ? num : state.seconds,
				sessionLength: num,
				breakLength: state.breakLength,
				playSession: state.playSession,
				play: state.play,
				intervalId: state.intervalId
			});
		}
	}

	const handleBreakChange = (num: number) => {
		if (!state.play) {
			setState({
				seconds: !state.playSession ? num : state.seconds,
				sessionLength: state.sessionLength,
				breakLength: num,
				playSession: state.playSession,
				play: state.play,
				intervalId: state.intervalId
			});
		}
	};

	const resetState = () => {
		const alarm = document.getElementById('beep') as HTMLMediaElement;
		alarm.pause()
		alarm.currentTime = 0;

		state.intervalId && clearInterval(state.intervalId);
		setState({
			seconds: 1500,
			sessionLength: 1500,
			breakLength: 300,
			playSession: true,
			play: false,
			intervalId: undefined
		});
	};

	return (
		<>
			<GithubCorner
				href='https://github.com/username/repo'
				bannerColor='#264143'
				octoColor='#eddcd9'
			/>
			<main>
				<h1>Tomato Timer</h1>
				<TimeInput
					id='break'
					value={state.breakLength}
					setValue={handleBreakChange}
				/>
				<TimeInput
					id='session'
					value={state.sessionLength}
					setValue={handleSessionChange}
				/>
				<Timer
					state={state}
					setState={setState}
					resetState={resetState}
				/>
				<audio id='beep' src='ping.wav' />

			</main>
			<footer>&#169;MBM_1607</footer>
		</>
	);
}

export default App;
