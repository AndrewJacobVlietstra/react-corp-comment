import HashtagList from "./hashtag/HashtagList";
import Footer from "./layout/Footer";
import Container from "./layout/Container";
import FeedbackItemsContextProvider from "../contexts/FeedbackItemsContextProvider";

export default function App() {
	return (
		<div className="app">
			<Footer />

			<FeedbackItemsContextProvider>
				<Container />
				<HashtagList />
			</FeedbackItemsContextProvider>
		</div>
	);
}
