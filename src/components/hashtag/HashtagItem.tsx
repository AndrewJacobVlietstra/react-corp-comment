type HashtagItemProps = {
	company: string;
	onSelectedCompany: (company: string) => void;
};

export default function HashtagItem({
	company,
	onSelectedCompany,
}: HashtagItemProps) {
	return (
		<li>
			<button
				onClick={() => onSelectedCompany(company)}
			>{`#${company}`}</button>
		</li>
	);
}
