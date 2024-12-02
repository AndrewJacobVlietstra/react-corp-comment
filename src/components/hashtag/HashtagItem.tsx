import { CapitalizeString } from "../../lib/utility";

type HashtagItemProps = {
	company: string;
	onSelectCompany: (company: string) => void;
};

export default function HashtagItem({
	company,
	onSelectCompany,
}: HashtagItemProps) {
	return (
		<li>
			<button onClick={() => onSelectCompany(company)}>{`#${CapitalizeString(
				company
			)}`}</button>
		</li>
	);
}
