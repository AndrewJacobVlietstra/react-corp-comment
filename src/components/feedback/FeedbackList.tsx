import FeedbackItem from "./FeedbackItem";
import ErrorMessage from "../ErrorMessage";
import Spinner from "../Spinner";
import { useFeedbackItemsContext } from "../../lib/hooks";

export default function FeedbackList() {
	const { selectedFeedbackItems, isLoading, isError } =
		useFeedbackItemsContext();

	return (
		<>
			<ol className="feedback-list">
				{isLoading ? <Spinner /> : null}

				{isError ? <ErrorMessage message={"Something Went Wrong!"} /> : null}

				{selectedFeedbackItems.map((item) => (
					<FeedbackItem key={item.id} feedbackItem={item} />
				))}
			</ol>
		</>
	);
}
