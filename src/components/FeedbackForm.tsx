import { ChangeEvent, useState } from "react";
import { FEEDBACK_FORM_MAX_CHARACTERS } from "../lib/constants";

type TextAreaChangeEvent = ChangeEvent<HTMLTextAreaElement>;

export default function FeedbackForm() {
	const [text, setText] = useState("");
	const charactersRemaining = FEEDBACK_FORM_MAX_CHARACTERS - text.length;

	const handleTextChange = (e: TextAreaChangeEvent) => {
		const currentText = e.target.value;
		const charLimitReached = currentText.length > FEEDBACK_FORM_MAX_CHARACTERS;
		if (charLimitReached) return;
		return setText(currentText);
	};

	return (
		<form className="form">
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
