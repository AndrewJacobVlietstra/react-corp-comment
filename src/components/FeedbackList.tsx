import { useEffect, useState } from "react";
import FeedbackItem from "./FeedbackItem";
import Spinner from "./Spinner";
import ErrorMessage from "./ErrorMessage";

export default function FeedbackList() {
	const [feedbackItems, setFeedbackItems] = useState([]);
	const [isLoading, setIsLoading] = useState(false);
	const [isError, setIsError] = useState(false);

	useEffect(() => {
		const fetchFeedbackItems = async () => {
			setIsLoading(true);
			try {
				const response = await fetch(
					`https://bytegrad.com/course-assets/projects/corpcomment/api/feedbacks`
				);

				if (!response.ok) {
					throw new Error();
				}

				const data = await response.json();
				setFeedbackItems(data.feedbacks);
				setIsError(false);
			} catch (error) {
				setIsError(true);
			}
			setIsLoading(false);
		};

		fetchFeedbackItems();
	}, []);

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
