import { createElement } from "react";

export const Block = (props: any) => {
	props = { ...props, is: "blockly" };

	return createElement("block", props, props.children);
};
