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

const {
	ContinuousToolbox,
	ContinuousFlyout,
	ContinuousMetrics,
} = require("@blockly/continuous-toolbox");

export default function Home() {
	const toolbox = useRef<any>();
	const blocklyDiv = useRef<any>();

	let primaryWorkspace = useRef<Blockly.WorkspaceSvg>();

	useEffect(() => {
		const customTheme = Blockly.Theme.defineTheme("zegit", {
			base: Blockly.Themes.Zelos,
			name: "zegit",
			categoryStyles: {},
		});

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
				message0: "distance",
				output: "Number",
			},
			{
				type: "string_length",
				message0: "length of %1",
				args0: [
					{
						type: "input_value",
						name: "VALUE",
						check: "Number",
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
				kind: "categoryToolbox",
				contents: [
					{
						kind: "category",
						name: "Length",
						colour: "Green",
						// contents: [
						// 	{
						// 		kind: "block",
						// 		type: "string_length",
						// 	},
						// ],
					},
					{
						kind: "category",
						name: "Operators",
						colour: "blue",
						contents: [
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
				],
			},
			theme: customTheme,
			readOnly: false,
			trashcan: true,
			grid: {
				spacing: 20,
				length: 3,
				colour: "#ccc",
				snap: true,
			},
			plugins: {
				toolbox: ContinuousToolbox,
				flyoutsVerticalToolbox: ContinuousFlyout,
				metricsManager: ContinuousMetrics,
			},
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
