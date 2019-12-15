import React from 'react'

const audioBookPlaylist = [
	{
        id:'A1',
		title: 'Capable Shift',
		author: 'Richard Burr',
		source: 'Librivox',
		uri:  require('../audio/CapableChange.mp3'),
		imageSource: 'http://www.archive.org/download/LibrivoxCdCoverArt8/hamlet_1104.jpg',
		
	},
	{
        id:'A2',
		title: 'Restful Sleep',
		author: 'Richard Burr',
		source: 'Librivox',
		uri:require('../audio/restfulSleep.mp3'),
		imageSource: 'http://www.archive.org/download/LibrivoxCdCoverArt8/hamlet_1104.jpg'
	},
	{
        id:'A3',
		title: 'Work in Progress',
		author: 'Richard Burr ',
		source: 'Librivox',
		uri: require('../audio/WorkInProgress.mp3'),
		imageSource: 'http://www.archive.org/download/LibrivoxCdCoverArt8/hamlet_1104.jpg',

	},
	{
        id:'A4',
		title: 'Positive Self',
		author: 'Richard Burr',
		source: 'Librivox',
		uri: require('../audio/PositiveSelf.mp3'),
		imageSource: 'http://www.archive.org/download/LibrivoxCdCoverArt8/hamlet_1104.jpg'
	},
	{
        id:'A5',
		title: 'Anxiety Free',
		author: 'Richard Burr',
		source: 'Librivox',
		uri: require('../audio/AnxietyFree.mp3'),
		imageSource: 'http://www.archive.org/download/LibrivoxCdCoverArt8/hamlet_1104.jpg'
	}
]

export default audioBookPlaylist;
