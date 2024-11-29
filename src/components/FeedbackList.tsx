import FeedbackItem from "./FeedbackItem";

export default function FeedbackList() {
	const feedbackItems = [
		{
			upVoteCount: 550,
			badgeLetter: "S",
			companyName: "Starbucks",
			text: "The coffee there is sooo good",
			daysAgo: 3,
		},
		{
			upVoteCount: 420,
			badgeLetter: "B",
			companyName: "ByteGrad",
			text: "Does good educational content",
			daysAgo: 5,
		},
		{
			upVoteCount: 727,
			badgeLetter: "C",
			companyName: "CorpComment",
			text: "Make comments but publicly, anytime, anywhere!",
			daysAgo: 1,
		},
	];

	return (
		<ol className="feedback-list">
			{feedbackItems.map((item) => (
				<FeedbackItem key={item.text} feedbackItem={item} />
			))}
		</ol>
	);
}
