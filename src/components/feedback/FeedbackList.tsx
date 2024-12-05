import FeedbackItem from "./FeedbackItem";
import ErrorMessage from "../ErrorMessage";
import Spinner from "../Spinner";
import { useFeedbackItemsStore } from "../../stores/feedbackItemsStore";

export default function FeedbackList() {
	const {
		getSelectedFeedbackItems: selectedFeedbackItems,
		isLoading,
		isError,
	} = useFeedbackItemsStore((state) => ({
		getSelectedFeedbackItems: state.getSelectedFeedbackItems(),
		isLoading: state.isLoading,
		isError: state.isError,
	}));

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
