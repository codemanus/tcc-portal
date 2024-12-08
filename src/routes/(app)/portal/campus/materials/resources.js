const resources = [
	{
		id: 'systematic-theology',
		title: 'Systematic Theology',
		author: 'Wayne Grudem',
		description:
			'An introduction to biblical doctrine that has become a modern classic for its clarity, accessibility, and comprehensive coverage.',
		type: 'physical-book',
		requirement: 'required',
		price: '$49.99',
		publisher: 'Zondervan Academic',
		courseDependencies: ['THE101'],
		thumbnail: 'https://m.media-amazon.com/images/I/81fsUkK87BL._AC_UF1000,1000_QL80_.jpg',
		tags: ['theology', 'doctrine', 'foundational']
	},
	{
		id: 'knowing-god-audiobook',
		title: 'Knowing God',
		author: 'J.I. Packer',
		description:
			'A masterful treatise on the attributes of God, available in audio format for learning on the go.',
		type: 'audiobook',
		requirement: 'recommended',
		duration: '9h 45m',
		url: 'https://example.com/knowing-god-audio',
		thumbnail: 'https://m.media-amazon.com/images/I/81H+8-qXXUL._AC_UF1000,1000_QL80_.jpg',
		tags: ['theology', "god's attributes"]
	},

	// Software Resources
	{
		id: 'logos-bible',
		title: 'Logos Bible Software',
		description:
			'Professional Bible study software with powerful tools for detailed biblical analysis.',
		type: 'software',
		requirement: 'required',
		price: '$999.99',
		version: '10',
		platform: ['windows', 'macos', 'ios', 'android'],
		url: 'https://logos.com',
		thumbnail: 'https://m.media-amazon.com/images/I/31pi1SIpoTL.png',
		courseDependencies: ['BIB101', 'THE201', 'GRK301'],
		tags: ['bible-study', 'research']
	},
	{
		id: 'accordance',
		title: 'Accordance Bible Software',
		description: 'Alternative Bible study software with excellent original language tools.',
		type: 'software',
		requirement: 'recommended',
		price: '$599.99',
		version: '14',
		platform: ['macos', 'windows', 'ios'],
		url: 'https://accordancebible.com',
		thumbnail: 'https://www.accordancebible.com/wp-content/uploads/2023/01/Collections-14.png',
		courseDependencies: ['BIB101', 'GRK301'],
		tags: ['bible-study', 'greek', 'hebrew']
	},

	// eBooks
	{
		id: 'christian-theology',
		title: 'Christian Theology: An Introduction',
		author: 'Alister McGrath',
		description: 'Comprehensive introduction to Christian theology in digital format.',
		type: 'ebook',
		requirement: 'required',
		price: '$39.99',
		publisher: 'Wiley-Blackwell',
		url: 'https://example.com/christian-theology-ebook',
		thumbnail: 'https://m.media-amazon.com/images/I/61peiIcaqGL.jpg',
		courseDependencies: ['THE101'],
		tags: ['theology', 'introduction']
	},

	// Tools
	{
		id: 'biblehub-subscription',
		title: 'Bible Hub Pro Subscription',
		description:
			'Online Bible study suite with Greek and Hebrew tools, commentaries, and cross-references.',
		type: 'tool',
		requirement: 'recommended',
		price: '$4.99/month',
		url: 'https://biblehub.com/pro',
		thumbnail:
			'https://static.wixstatic.com/media/c93121_c05c7efae0b645dabdbee10fa39df3b7~mv2.png/v1/crop/x_42,y_0,w_816,h_821/fill/w_279,h_281,al_c,q_85,usm_0.66_1.00_0.01,enc_avif,quality_auto/BibleHub.png',
		tags: ['bible-study', 'online-tools']
	},

	// Video Resources
	{
		id: 'biblical-greek',
		title: 'Biblical Greek Video Course',
		description: 'Comprehensive video series teaching Koine Greek for biblical studies.',
		type: 'video',
		requirement: 'required',
		duration: '40 hours',
		url: 'https://example.com/greek-course',
		thumbnail: 'https://m.media-amazon.com/images/I/711aAGmHfcL._AC_UF894,1000_QL80_.jpg',
		courseDependencies: ['GRK301'],
		tags: ['greek', 'language']
	}
];

export default resources;
