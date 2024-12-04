import { useState } from "react";
import { FEEDBACK_FORM_MAX_CHARACTERS } from "../../lib/constants";
import { useFeedbackItemsContext } from "../../lib/hooks";

type TextAreaChangeEvent = React.ChangeEvent<HTMLTextAreaElement>;
type FormEvent = React.FormEvent<HTMLFormElement>;

export default function FeedbackForm() {
	const [text, setText] = useState("");
	const [showValidIndicator, setShowValidIndicator] = useState(false);
	const [showInvalidIndicator, setShowInvalidIndicator] = useState(false);
	const charactersRemaining = FEEDBACK_FORM_MAX_CHARACTERS - text.length;
	const { handleAddToList } = useFeedbackItemsContext();

	const handleTextChange = (e: TextAreaChangeEvent) => {
		const currentText = e.target.value;
		const charLimitReached = currentText.length > FEEDBACK_FORM_MAX_CHARACTERS;
		if (charLimitReached) return;
		return setText(currentText);
	};

	const handleSubmit = (e: FormEvent) => {
		e.preventDefault();

		// Basic form validation
		if (text.includes("#") && text.length >= 5) {
			setShowValidIndicator(true);
			setTimeout(() => setShowValidIndicator(false), 2000);
		} else {
			setShowInvalidIndicator(true);
			return setTimeout(() => setShowInvalidIndicator(false), 2000);
		}

		handleAddToList(text);
		setText("");
	};

	return (
		<form
			onSubmit={handleSubmit}
			className={`form ${showValidIndicator && "form--valid"} ${
				showInvalidIndicator && "form--invalid"
			}`}
		>
			<textarea
				value={text}
				onChange={handleTextChange}
				id="feedback-textarea"
				placeholder=""
				spellCheck={false}
			/>
			<label htmlFor="feedback-textarea">
				Enter your feedback here, remember to #hashtag the company!
			</label>

			<div>
				<p className="u-italic">
					{charactersRemaining === 0
						? `0 Max Limit Reached!`
						: charactersRemaining}
				</p>
				<button>
					<span>Submit</span>
				</button>
			</div>
		</form>
	);
}
