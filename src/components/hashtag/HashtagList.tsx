import { useFeedbackItemsStore } from "../../stores/feedbackItemsStore";
import HashtagItem from "./HashtagItem";

export default function HashtagList() {
	const { getCompanyList: companyList, selectCompany } = useFeedbackItemsStore(
		(state) => ({
			getCompanyList: state.getCompanyList(),
			selectCompany: state.selectCompany,
		})
	);

	return (
		<ul className="hashtags">
			{companyList.map((company) => (
				<HashtagItem
					key={company}
					company={company}
					onSelectCompany={selectCompany}
				/>
			))}
		</ul>
	);
}
