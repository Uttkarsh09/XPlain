import { useLayoutEffect } from "react";

function useChangeTitle(title) {
	useLayoutEffect(() => {
		document.title = "XPlain • " + title;
	}, [title]);
}

export default useChangeTitle;
