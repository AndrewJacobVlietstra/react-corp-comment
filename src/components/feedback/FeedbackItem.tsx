import { TriangleUpIcon } from "@radix-ui/react-icons";
import { feedbackItem } from "../../lib/types";
import { useState } from "react";

type ButtonEvent = React.MouseEvent<HTMLButtonElement, MouseEvent>;

type feedbackItemProps = {
	feedbackItem: feedbackItem;
};

export default function FeedbackItem({ feedbackItem }: feedbackItemProps) {
	const { upvoteCount, badgeLetter, company, text, daysAgo } = feedbackItem;
	const [open, setOpen] = useState(false);
	const [upvotes, setUpvotes] = useState(upvoteCount);

	const handleUpvote = (e: ButtonEvent) => {
		setUpvotes((prev) => prev + 1);
		e.currentTarget.disabled = true;
		e.stopPropagation();
	};

	return (
		<li
			onClick={() => setOpen(!open)}
			className={`feedback ${open && "feedback--expand"}`}
		>
			<button onClick={handleUpvote}>
				<TriangleUpIcon />
				<span>{upvotes}</span>
			</button>

			<div>
				<p>{badgeLetter}</p>
			</div>

			<div>
				<p>{company}</p>
				<p>{text}</p>
			</div>

			<p>{daysAgo === 0 ? "NEW" : `${daysAgo}d`}</p>
		</li>
	);
}
