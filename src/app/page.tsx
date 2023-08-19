"use client";
import {
	useRef,
	useState,
	useCallback,
	useEffect,
	Fragment,
	LegacyRef,
	createElement,
} from "react";
import * as Blockly from "blockly/core";
var toolbox = {
	kind: "categoryToolbox",
	contents: [
		{
			kind: "category",
			name: "Control",
			contents: [
				{
					kind: "block",
					type: "controls_if",
				},
			],
		},
		{
			kind: "category",
			name: "Logic",
			contents: [
				{
					kind: "block",
					type: "logic_compare",
				},
				{
					kind: "block",
					type: "logic_operation",
				},
				{
					kind: "block",
					type: "logic_boolean",
				},
			],
		},
	],
};

const Block = (props: any) => {
	console.log(props);
	props = { ...props, is: "blockly" };

	return createElement("block", props, props.children);
};

export default function Home() {
	const toolbox = useRef<any>();
	const blocklyDiv = useRef<any>();

	let primaryWorkspace = useRef<Blockly.WorkspaceSvg>();

	useEffect(() => {
		// Blockly.Blocks["string_length"] = {
		// 	init: function () {
		// 		this.appendValueInput("VALUE")
		// 			.setCheck("String")
		// 			.appendField("length of");
		// 		this.setOutput(true, "Number");
		// 		this.setColour(160);
		// 		this.setTooltip("Returns number of letters in the provided text.");
		// 		this.setHelpUrl(
		// 			"http://www.w3schools.com/jsref/jsref_length_string.asp"
		// 		);
		// 	},
		// };

		Blockly.defineBlocksWithJsonArray([
			{
				type: "gg",
				message0: "template: %1",
				args0: [
					{
						type: "input_value",
						name: "number",
					},
				],
			},
			{
				type: "input_value",
				message0: "reeeee",
				output: "String",
			},
			{
				type: "string_length",
				message0: "length of %1",
				args0: [
					{
						type: "input_value",
						name: "VALUE",
						check: "String",
					},
				],
				output: "Number",
				colour: 160,
				tooltip: "Returns number of letters in the provided text.",
				helpUrl: "http://www.w3schools.com/jsref/jsref_length_string.asp",
			},
		]);

		primaryWorkspace.current = Blockly.inject(blocklyDiv.current, {
			toolbox: {
				kind: "flyoutToolbox",
				contents: [
					{
						kind: "block",
						type: "string_length",
					},
					{
						type: "input_value",
						kind: "block",
					},
					{
						kind: "block",
						type: "gg",
					},
				],
			},
			readOnly: false,
			trashcan: true,
			plugins: { "": "" },
			move: {
				scrollbars: true,
				drag: true,
				wheel: true,
			},
		});
	}, [primaryWorkspace]);

	return (
		<Fragment>
			<div style={{ position: "absolute" }} ref={blocklyDiv} id="blocklyDiv" />
			<div ref={toolbox}>{/* <Block kind="block" type="simplebot" /> */}</div>
		</Fragment>
	);
}
