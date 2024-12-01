import FeedbackItem from "./FeedbackItem";
import ErrorMessage from "../ErrorMessage";
import Spinner from "../Spinner";
import { feedbackItem } from "../../lib/types";

type FeedbackListProps = {
	feedbackItems: feedbackItem[];
	isLoading: boolean;
	isError: boolean;
};

export default function FeedbackList({
	feedbackItems,
	isLoading,
	isError,
}: FeedbackListProps) {
	return (
		<>
			<ol className="feedback-list">
				{isLoading ? <Spinner /> : null}

				{isError ? <ErrorMessage message={"Something Went Wrong!"} /> : null}

				{feedbackItems.map((item) => (
					<FeedbackItem key={item.id} feedbackItem={item} />
				))}
			</ol>
		</>
	);
}
