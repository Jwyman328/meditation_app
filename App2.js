import React from 'react'
import { StyleSheet, TouchableOpacity, View, Image, Text, ActivityIndicator, Dimensions } from 'react-native'
import { Ionicons } from '@expo/vector-icons'
import { Audio } from 'expo-av'
import audioBookPlaylist from './Data/AudioBookPlaylist'
import { AppLoading } from 'expo';
import { Asset } from 'expo-asset';
import colors from './constants/colors'



export default class App extends React.Component {
	state = {
		isPlaying: false,
		playbackInstance: null,
		currentIndex: 0,
		volume: 1.0,
		isBuffering: true,
		isReady: false,
	}

	//meditation = this.props.meditationId
  

	async componentDidMount() {
		try {
			await Audio.setAudioModeAsync({
				allowsRecordingIOS: false,
				interruptionModeIOS: Audio.INTERRUPTION_MODE_IOS_DO_NOT_MIX,
				playsInSilentModeIOS: true,
				interruptionModeAndroid: Audio.INTERRUPTION_MODE_ANDROID_DO_NOT_MIX,
				shouldDuckAndroid: true,
				staysActiveInBackground: true,
				playThroughEarpieceAndroid: true
			})

			this.loadAudio()
			this.handlePlayPause()
		} catch (e) {
			console.log(e)
		}
	}

	async loadAudio() {
		const { currentIndex, isPlaying, volume } = this.state

		try {
			const playbackInstance = new Audio.Sound()
			const source = audioBookPlaylist[this.props.meditationId].uri
			
			const status = {
				shouldPlay: isPlaying,
				volume: volume
			}

			playbackInstance.setOnPlaybackStatusUpdate(this.onPlaybackStatusUpdate)
			await playbackInstance.loadAsync(source, status, false)
			this.setState({
				playbackInstance
			})
		} catch (e) {
			console.log(e)
		}
	}

	onPlaybackStatusUpdate = status => {
		this.setState({
			isBuffering: status.isBuffering
		})
	}

	handlePlayPause = async () => {
		const { isPlaying, playbackInstance } = this.state
		isPlaying ? await playbackInstance.pauseAsync() : await playbackInstance.playAsync()

		this.setState({
			isPlaying: !isPlaying
		})
	}

	/*handlePreviousTrack = async () => {
		let { playbackInstance, currentIndex } = this.state
		if (playbackInstance) {
			await playbackInstance.unloadAsync()
			this.setState({
				currentIndex : (currentIndex === 0 ? audioBookPlaylist.length -1 : currentIndex-1)
			});
			this.loadAudio()
		}
	}*/

	/*handleNextTrack = async () => {
		let { playbackInstance, currentIndex } = this.state
		if (playbackInstance) {
			await playbackInstance.unloadAsync()
			this.setState({
				currentIndex: (currentIndex+1 > audioBookPlaylist.length - 1 ? 0 : currentIndex+1)
			});
			this.loadAudio()
		}
	}*/

	renderFileInfo() {
		

		const { playbackInstance, currentIndex } = this.state
		return !this.state.isBuffering ? (
			<View style={styles.trackInfo}>
				<Text style={[styles.trackInfoText, styles.largeText]}>
					{audioBookPlaylist[this.props.meditationId].title}
				</Text>
				<Text style={[styles.trackInfoText, styles.smallText]}>
					{audioBookPlaylist[this.props.meditationId].author}
				</Text>
				<Text style={[styles.trackInfoText, styles.smallText]}>
					{audioBookPlaylist[this.props.meditationId].source}
				</Text>
			</View>
		) : null
	}

	render() {
		if (!this.state.isReady){
			return <AppLoading 
				startAsync={this._cacheResourceAsync}
				onFinish={()=> this.setState({isReady:true})}
				onError = {console.warn}
			/>
		}else{

		}

		if (!this.state.isBuffering){
		return (
			<View style={{...styles.container, ...this.props.style}}>
				
				<View style={styles.controls}>
					{/*<TouchableOpacity style={styles.control} onPress={this.handlePreviousTrack}>
						<Ionicons name='ios-skip-backward' size={48} color='#444' /> 
					</TouchableOpacity>*/}
					<TouchableOpacity style={styles.control} onPress={this.handlePlayPause}>
						{this.state.isPlaying ? (
							<Ionicons name='ios-pause' size={48} color='#444' />
						) : (
							<Ionicons name='ios-play-circle' size={48} color='#444' />
						)}
					</TouchableOpacity>

					{/*<TouchableOpacity style={styles.control} onPress={this.handleNextTrack}>
						<Ionicons name='ios-skip-forward' size={48} color='#444' />
						</TouchableOpacity>*/}
				</View>
				{!this.state.isBuffering? this.renderFileInfo():null}
			</View>
		)}else{
			return (
				<View style={{...styles.waitingContainer}}>
					<ActivityIndicator size="large" color={'black'} />
				</View>
			)
		}
	}

	async _cacheResourceAsync(){
		const audios = [audioBookPlaylist[this.props.meditationId].uri]

		const cacheAudios = audios.map(audio => {
			return Asset.fromModule(audio).downloadAsync();
		  }); 
		  return Promise.all(cacheAudios);
	}
}

const styles = StyleSheet.create({
	waitingContainer: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center',
		height: Dimensions.get('window').height * .6,
	  },
	  waitingHorizontal: {
		flexDirection: 'row',
		justifyContent: 'space-around',
		padding: 10
	  },
	container: {
		flex: 1,
		//backgroundColor: '#fff',
		alignItems: 'center',
		justifyContent: 'center'
	},
	albumCover: {
		width: 250,
		height: 250
	},
	trackInfo: {
		padding: 40,
		//backgroundColor: '#fff'
	},

	trackInfoText: {
		textAlign: 'center',
		flexWrap: 'wrap',
		color: '#550088'
	},
	largeText: {
		fontSize: 22
	},
	smallText: {
		fontSize: 16
	},
	control: {
		margin: 20
	},
	controls: {
		flexDirection: 'row'
	}
})