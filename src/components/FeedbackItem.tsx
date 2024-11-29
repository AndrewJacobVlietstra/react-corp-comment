import { TriangleUpIcon } from "@radix-ui/react-icons";

type feedbackItemProps = {
	upVoteCount: number;
	badgeLetter: string;
	companyName: string;
	text: string;
	daysAgo: number;
};

export default function FeedbackItem({
	feedbackItem,
}: {
	feedbackItem: feedbackItemProps;
}) {
	const { upVoteCount, badgeLetter, companyName, text, daysAgo } = feedbackItem;

	return (
		<li className="feedback">
			<button>
				<TriangleUpIcon />
				<span>{upVoteCount}</span>
			</button>

			<div>
				<p>{badgeLetter}</p>
			</div>

			<div>
				<p>{companyName}</p>
				<p>{text}</p>
			</div>

			<p>{daysAgo}d</p>
		</li>
	);
}
