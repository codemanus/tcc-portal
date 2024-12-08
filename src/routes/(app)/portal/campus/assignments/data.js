const data = {
	upcomingAssignments: [
		{ title: 'Read John 1-3', slug: 'read-john-1-3' },
		{ title: 'Complete Ministry Reflection', slug: 'complete-ministry-reflection' },
		{ title: 'Submit Prayer Journal', slug: 'submit-prayer-journal' }
	],
	pastDueAssignments: [
		{ title: 'Church History Essay', slug: 'church-history-essay' },
		{ title: 'Leadership Case Study', slug: 'leadership-case-study' }
	],
	assignments: [
		{
			title: 'Read John 1-3',
			dueDate: '2024-03-20',
			status: 'pending',
			slug: 'read-john-1-3',
			content: 'Read the first three chapters of the Gospel of John and reflect on the key themes.'
		},
		{
			title: 'Complete Ministry Reflection',
			dueDate: '2024-03-25',
			status: 'pending',
			slug: 'complete-ministry-reflection',
			content: 'Write a reflection on your recent ministry activities and their impact.'
		},
		{
			title: 'Submit Prayer Journal',
			dueDate: '2024-03-28',
			status: 'pending',
			slug: 'submit-prayer-journal',
			content: 'Submit your prayer journal entries for the past month.'
		},
		{
			title: 'Church History Essay',
			dueDate: '2024-03-01',
			status: 'completed',
			slug: 'church-history-essay',
			content: 'Write an essay on the development of early church history.'
		},
		{
			title: 'Leadership Case Study',
			dueDate: '2024-03-05',
			status: 'overdue',
			slug: 'leadership-case-study',
			content: 'Analyze a leadership case study and provide your insights.'
		}
	]
};

export default data;
