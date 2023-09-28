export default class Sound {
	static loadAudio() {
		const toggleSound = new Audio('sound/mixkit-air-woosh-1489-pitch.wav');
		const reverseToggleSound = new Audio('sound/mixkit-air-woosh-1489-pitch-reverse.wav');
		const doneSound = new Audio('sound/mixkit-game-ball-tap-2073.wav');
		const reverseDoneSound = new Audio('sound/mixkit-game-ball-tap-2073-reverse-slow.wav');
		const starSound = new Audio('sound/mixkit-retro-arcade-casino-notification-211.wav');
		const reverseStarSound = new Audio('sound/mixkit-retro-arcade-casino-notification-211-reverse.wav');
		const removeSound = new Audio('sound/Empty-trash-sound-effect-reverse.mp3');
		const loadExampleSound = new Audio('sound/mixkit-player-boost-recharging-2040.wav');
		const addNewSound = new Audio('sound/mixkit-repeating-arcade-beep-1084.wav');
		const alertSound = new Audio('sound/mixkit-quick-jump-arcade-game-239.wav');
		const confirmSound = new Audio('sound/mixkit-video-game-lock-2851.wav');
		const abortSound = new Audio('sound/mixkit-video-game-lock-2851-reverse.wav');

		return {
			toggleSound,
			reverseToggleSound,
			doneSound,
			reverseDoneSound,
			starSound,
			reverseStarSound,
			removeSound,
			loadExampleSound,
			addNewSound,
			alertSound,
			confirmSound,
			abortSound,
		};
	}
}
