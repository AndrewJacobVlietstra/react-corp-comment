export default function FeedbackForm() {
	return (
		<form className="form">
			<textarea id="feedback-textarea" placeholder="" spellCheck={false} />
			<label htmlFor="feedback-textarea">
				Enter your feedback here, remember to #hashtag the company!
			</label>

			<div>
				<p className="u-italic">150</p>
				<button>
					<span>Submit</span>
				</button>
			</div>
		</form>
	);
}
