export interface Grade {
	title?: string;
	grade?: string;
	percentage?: number;
	feedback: {
		submittedDate?: string;
		instructorName?: string;
		comments?: string;
		strengths?: string[];
		improvements?: string[];
	};
}
