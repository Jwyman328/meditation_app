import React from 'react'

const audioBookPlaylist = {
    A1:
	    {
        orderNumber: 1,
        title: 'Capable Shift',
        time:'12:00',
		author: 'Richard Burr',
		source: 'Librivox',
		uri:  require('../audio/CapableChange.mp3'),
		imageSource: 'http://www.archive.org/download/LibrivoxCdCoverArt8/hamlet_1104.jpg',
		
    },
    A2:
	    {
        orderNumber:2,
        id:'A2',
        time:'12:00',
		title: 'Restful Sleep',
		author: 'Richard Burr',
		source: 'Librivox',
		uri:require('../audio/restfulSleep.mp3'),
		imageSource: 'http://www.archive.org/download/LibrivoxCdCoverArt8/hamlet_1104.jpg'
    },
    A3:
	{
        orderNumber:3,
        id:'A3',
        title: 'Work in Progress',
        time:'12:00',
		author: 'Richard Burr ',
		source: 'Librivox',
		uri: require('../audio/WorkInProgress.mp3'),
		imageSource: 'http://www.archive.org/download/LibrivoxCdCoverArt8/hamlet_1104.jpg',

    },
    A4:
	{
        orderNumber:4,
        id:'A4',
        title: 'Positive Self',
        time:'12:00',
		author: 'Richard Burr',
		source: 'Librivox',
		uri: require('../audio/PositiveSelf.mp3'),
		imageSource: 'http://www.archive.org/download/LibrivoxCdCoverArt8/hamlet_1104.jpg'
	},
	A5:{
        orderNumber:5,
        id:'A5',
        title: 'Anxiety Free',
        time:'12:00',
		author: 'Richard Burr',
		source: 'Librivox',
		uri: require('../audio/AnxietyFree.mp3'),
		imageSource: 'http://www.archive.org/download/LibrivoxCdCoverArt8/hamlet_1104.jpg'
	}}


export default audioBookPlaylist;
