interface State {
	seconds: number;
	sessionLength: number;
	breakLength: number;
	playSession: boolean;
	play: boolean;
	intervalId: undefined | NodeJS.Timeout;
}

export default State;
