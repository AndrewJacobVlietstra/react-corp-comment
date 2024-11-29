import { useEffect, useState } from "react";
import FeedbackItem from "./FeedbackItem";
import Spinner from "./Spinner";
import ErrorMessage from "./ErrorMessage";

export default function FeedbackList() {
	const [feedbackItems, setFeedbackItems] = useState([]);
	const [isLoading, setIsLoading] = useState(false);
	const [isError, setIsError] = useState(false);

	useEffect(() => {
		setIsLoading(true);
		fetch(
			`https://bytegrad.com/course-assets/projects/corpcomment/api/feedbacks`
		)
			.then((response) => {
				if (!response.ok) {
					throw new Error();
				}
				return response.json();
			})
			.then((data) => {
				setFeedbackItems(data.feedbacks);
				setIsLoading(false);
				return setIsError(false);
			})
			.catch((error) => {
				setIsLoading(false);
				setIsError(true);
				return console.error(error);
			});
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
