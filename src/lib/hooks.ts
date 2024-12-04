import { useContext, useEffect, useState } from "react";
import { FeedbackItemsContext } from "../contexts/FeedbackItemsContextProvider";
import { feedbackItem } from "./types";
import { FEEDBACK_ITEMS_URL } from "./constants";

export const useFeedbackItemsContext = () => {
	const context = useContext(FeedbackItemsContext);

	if (!context) {
		throw new Error(
			"useFeedbackItemsContext must be used within a FeedbackItemsContextProvider"
		);
	}

	return context;
};

export const useFeedbackItems = () => {
	const [feedbackItems, setFeedbackItems] = useState<feedbackItem[] | []>([]);
	const [isLoading, setIsLoading] = useState(false);
	const [isError, setIsError] = useState(false);

	useEffect(() => {
		const fetchFeedbackItems = async () => {
			setIsLoading(true);
			try {
				const response = await fetch(FEEDBACK_ITEMS_URL);

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

	return { feedbackItems, setFeedbackItems, isLoading, isError };
};
