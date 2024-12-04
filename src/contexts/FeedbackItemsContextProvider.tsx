import { createContext, useMemo, useState } from "react";
import { feedbackItem } from "../lib/types";
import { FEEDBACK_ITEMS_URL } from "../lib/constants";
import { useFeedbackItems } from "../lib/hooks";

type FeedbackItemsContextProviderProps = {
	children: React.ReactNode;
};

type TFeedbackItemsContext = {
	selectedFeedbackItems: feedbackItem[];
	isLoading: boolean;
	isError: boolean;
	companyList: string[];
	handleSelectedCompany: (company: string) => void;
	handleAddToList: (text: string) => void;
};

export const FeedbackItemsContext = createContext<TFeedbackItemsContext | null>(
	null
);

export default function FeedbackItemsContextProvider({
	children,
}: FeedbackItemsContextProviderProps) {
	const [selectedCompany, setSelectedCompany] = useState("all");
	const { feedbackItems, setFeedbackItems, isLoading, isError } =
		useFeedbackItems();

	const selectedFeedbackItems = useMemo(
		() =>
			feedbackItems.filter((item) => {
				if (selectedCompany === "all") return item;
				if (item.company.toLowerCase() === selectedCompany.toLowerCase())
					return item;
			}),
		[feedbackItems, selectedCompany]
	);

	const companyList = useMemo(
		() =>
			feedbackItems
				.map((item) => item.company.toLowerCase())
				.filter((company, index, array) => array.indexOf(company) === index),
		[feedbackItems]
	);

	const handleSelectedCompany = (company: string) => {
		selectedCompany === company
			? setSelectedCompany("all")
			: setSelectedCompany(company);
	};

	const handleAddToList = async (text: string) => {
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

		await fetch(FEEDBACK_ITEMS_URL, {
			method: "POST",
			body: JSON.stringify(newItem),
			headers: {
				Accept: "application/json",
				"Content-Type": "application/json",
			},
		});
	};

	return (
		<FeedbackItemsContext.Provider
			value={{
				selectedFeedbackItems,
				isLoading,
				isError,
				companyList,
				handleSelectedCompany,
				handleAddToList,
			}}
		>
			{children}
		</FeedbackItemsContext.Provider>
	);
}
