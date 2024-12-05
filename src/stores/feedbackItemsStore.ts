import { create } from "zustand";
import { feedbackItem } from "../lib/types";
import { FEEDBACK_ITEMS_URL } from "../lib/constants";

type Store = {
	feedbackItems: feedbackItem[];
	isLoading: boolean;
	isError: boolean;
	selectedCompany: string;
	selectCompany: (company: string) => void;
	getCompanyList: () => string[];
	getSelectedFeedbackItems: () => feedbackItem[];
	addItemToList: (text: string) => Promise<void>;
	fetchFeedbackItems: () => Promise<void>;
};

export const useFeedbackItemsStore = create<Store>((set, get) => ({
	feedbackItems: [],
	isLoading: false,
	isError: false,
	selectedCompany: "all",
	selectCompany: (company: string) => {
		set((state) => ({
			selectedCompany: state.selectedCompany === company ? "all" : company,
		}));
	},
	getCompanyList: () => {
		const { feedbackItems } = get();

		return feedbackItems
			.map((item) => item.company.toLowerCase())
			.filter((company, index, array) => array.indexOf(company) === index);
	},
	getSelectedFeedbackItems: () => {
		const { feedbackItems, selectedCompany } = get();

		return feedbackItems.filter((item) => {
			if (selectedCompany === "all") return item;
			if (item.company.toLowerCase() === selectedCompany.toLowerCase())
				return item;
		});
	},
	addItemToList: async (text: string) => {
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

		set((state) => ({
			feedbackItems: [...state.feedbackItems, newItem],
		}));

		await fetch(FEEDBACK_ITEMS_URL, {
			method: "POST",
			body: JSON.stringify(newItem),
			headers: {
				Accept: "application/json",
				"Content-Type": "application/json",
			},
		});
	},
	fetchFeedbackItems: async () => {
		set(() => ({ isLoading: true }));
		try {
			const response = await fetch(FEEDBACK_ITEMS_URL);

			if (!response.ok) {
				throw new Error();
			}

			const data = await response.json();
			set(() => ({ feedbackItems: data.feedbacks }));
			set(() => ({ isError: false }));
		} catch (error) {
			console.error(error);
			set(() => ({ isError: true }));
		}
		set(() => ({ isLoading: false }));
	},
}));
