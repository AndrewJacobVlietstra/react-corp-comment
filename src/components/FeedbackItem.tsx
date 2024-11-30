import { TriangleUpIcon } from "@radix-ui/react-icons";
import { feedbackItem } from "../lib/types";

type feedbackItemProps = {
	feedbackItem: feedbackItem;
};

export default function FeedbackItem({ feedbackItem }: feedbackItemProps) {
	const { upvoteCount, badgeLetter, companyName, text, daysAgo } = feedbackItem;

	return (
		<li className="feedback">
			<button>
				<TriangleUpIcon />
				<span>{upvoteCount}</span>
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
