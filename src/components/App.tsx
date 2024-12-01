import { useEffect, useState } from "react";
import { feedbackItem } from "../lib/types";
import Container from "./Container";
import Footer from "./Footer";
import HashtagList from "./HashtagList";

function App() {
	const [feedbackItems, setFeedbackItems] = useState<feedbackItem[] | []>([]);
	const [isLoading, setIsLoading] = useState(false);
	const [isError, setIsError] = useState(false);

	const handleAddToList = (text: string) => {
		const company = text
			.split(" ")
			.find((word) => word.includes("#"))!
			.substring(1);

		const newItem: feedbackItem = {
			id: new Date().getTime(),
			text: text,
			upvoteCount: 0,
			daysAgo: 0,
			company,
			badgeLetter: company.substring(0, 1).toUpperCase(),
		};

		setFeedbackItems([...feedbackItems, newItem]);
	};

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
		<div className="app">
			<Footer />

			<Container
				feedbackItems={feedbackItems}
				isLoading={isLoading}
				isError={isError}
				handleAddToList={handleAddToList}
			/>

			<HashtagList />
		</div>
	);
}

export default App;
