const grades = [
	{
		id: 'john-1-3',
		title: 'John 1-3',
		grade: 'A',
		percentage: 94,
		feedback: {
			comments:
				'Excellent exegetical analysis of the text. Your interpretation shows deep understanding of the historical context.',
			strengths: [
				'Strong theological framework',
				'Well-supported arguments',
				'Clear writing style'
			],
			improvements: [
				'Consider including more contemporary applications',
				'Could expand on the Greek word studies'
			],
			submittedDate: '2024-02-15',
			gradedDate: '2024-02-20',
			instructorName: 'Dr. Smith'
		}
	},
	{
		id: 'ministry-reflection',
		title: 'Ministry Reflection',
		grade: 'B',
		percentage: 85,
		feedback: {
			comments:
				'Good personal insights and practical applications. Need more theological reflection.',
			strengths: [
				'Honest self-evaluation',
				'Practical ministry applications',
				'Good use of examples'
			],
			improvements: ['Deepen theological reflection', 'Include more scholarly sources'],
			submittedDate: '2024-03-01',
			gradedDate: '2024-03-05',
			instructorName: 'Dr. Johnson'
		}
	},
	{
		id: 'prayer-journal',
		title: 'Prayer Journal',
		grade: 'A',
		percentage: 96,
		feedback: {
			comments:
				'Exceptional depth of spiritual reflection and consistent engagement throughout the semester.',
			strengths: [
				'Regular, thoughtful entries',
				'Deep personal insights',
				'Growth clearly demonstrated'
			],
			improvements: ['Could include more scripture references', 'Consider adding prayer outcomes'],
			submittedDate: '2024-03-10',
			gradedDate: '2024-03-15',
			instructorName: 'Dr. Anderson'
		}
	}
];

export default grades;
