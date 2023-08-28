"use client";

import { useEffect } from "react";
import { useBlocklyConfigurator } from "../BlocklyConfigureator";

export default function Home() {
	const { BlocklyWorkspace, registerCategory } = useBlocklyConfigurator([
		{
			kind: "category",
			name: "Length",
			colour: "Green",
			id: "asdasdasdasdasdasd",
			contents: [
				{
					type: "test",
					message0: "length of %1",
					args0: [
						{
							type: "input_value",
							name: "VALUE",
							check: "Number",
						},
					],
					previousStatement: "Action",
					colour: 160,
					tooltip: "Returns number of letters in the provided text.",
					helpUrl: "http://www.w3schools.com/jsref/jsref_length_string.asp",
				},
				{
					type: "test2",
					message0: "length of %1",
					args0: [
						{
							type: "input_value",
							name: "VALUE",
							check: "Number",
						},
					],
					nextStatement: "Action",
					colour: 160,
					tooltip: "Returns number of letters in the provided text.",
					helpUrl: "http://www.w3schools.com/jsref/jsref_length_string.asp",
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
			],
		},
		{
			kind: "category",
			name: "Epic",
			colour: "Green",
			id: "asdasdasdasdasdasd",
			contents: [
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
			],
		},
	]);

	useEffect(() => {}, []);

	return (
		<>
			<BlocklyWorkspace></BlocklyWorkspace>
		</>
	);
}
