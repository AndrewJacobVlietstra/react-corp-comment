import { useFeedbackItemsContext } from "../../lib/hooks";
import HashtagItem from "./HashtagItem";

export default function HashtagList() {
	const { companyList, handleSelectedCompany } = useFeedbackItemsContext();
	return (
		<ul className="hashtags">
			{companyList.map((company) => (
				<HashtagItem
					key={company}
					company={company}
					onSelectCompany={handleSelectedCompany}
				/>
			))}
		</ul>
	);
}
