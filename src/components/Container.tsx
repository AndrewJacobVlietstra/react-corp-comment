import { feedbackItem } from "../lib/types";
import FeedbackList from "./FeedbackList";
import Header from "./Header";

type ContainerProps = {
	feedbackItems: feedbackItem[];
	isLoading: boolean;
	isError: boolean;
	handleAddToList: (text: string) => void;
};

export default function Container({
	feedbackItems,
	isLoading,
	isError,
	handleAddToList,
}: ContainerProps) {
	return (
		<main className="container">
			<Header handleAddToList={handleAddToList} />
			<FeedbackList
				feedbackItems={feedbackItems}
				isLoading={isLoading}
				isError={isError}
			/>
		</main>
	);
}
