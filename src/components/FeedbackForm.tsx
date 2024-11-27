import { ChangeEvent, useState } from "react";
import { MAX_CHARACTERS } from "../lib/constants";

type TextAreaChangeEvent = ChangeEvent<HTMLTextAreaElement>;

export default function FeedbackForm() {
	const [text, setText] = useState("");
	const charCount = MAX_CHARACTERS - text.length;

	const handleTextChange = (e: TextAreaChangeEvent) => {
		const currentText = e.target.value;
		if (currentText.length > MAX_CHARACTERS) {
			return;
		}
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
				<p className="u-italic">{charCount}</p>
				<button>
					<span>Submit</span>
				</button>
			</div>
		</form>
	);
}
