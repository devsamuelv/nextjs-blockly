import {
	Theme,
	Themes,
	ToolboxCategory,
	ToolboxItem,
	WorkspaceSvg,
	defineBlocksWithJsonArray,
	inject,
} from "blockly";
import {
	CategoryInfo,
	DynamicCategoryInfo,
	StaticCategoryInfo,
} from "blockly/core/utils/toolbox";
import { Fragment, useEffect, useRef, useState } from "react";

const {
	ContinuousToolbox,
	ContinuousFlyout,
	ContinuousMetrics,
} = require("@blockly/continuous-toolbox");

export type BlockConfig = {
	message0: string;
	type: string;
	output?: string;
	color?: number;
	tooltip?: string;
	helpUrl?: string;
	args0: { type: string; name: string; check: string }[];
	colour: number;
};

export interface Category {
	contents: BlockConfig[];
	name: string;
	kind: string;
	id?: string | undefined;
	categorystyle?: string | undefined;
	colour?: string | undefined;
	cssconfig?: ToolboxCategory.CssConfig | undefined;
	hidden?: string | undefined;
	expanded?: string | boolean;
}

export const useBlocklyConfigurator = (c: Category[]) => {
	const blocklyDiv = useRef<any>();
	const toolbox = useRef<any>();

	let primaryWorkspace = useRef<WorkspaceSvg>();

	const [categories, setCategories] = useState<CategoryInfo[]>([]);
	const [blocks, setBlocks] = useState<BlockConfig[]>([]);

	const customTheme = Theme.defineTheme("zegit", {
		base: Themes.Zelos,
		name: "zegit",
		categoryStyles: {},
	});

	const registerCategory = (c: Category) => {
		const brokenDownBlocks = c.contents.map((v) => {
			return { kind: "block", type: v.type };
		});

		const newCategory: any = {
			...c,
			contents: brokenDownBlocks,
		};

		// put all the defined blocks into the list.
		setBlocks([...blocks, ...c.contents]);

		setCategories([...categories, newCategory]);
	};

	const BlocklyWorkspace: React.FC<any> = () => {
		useEffect(() => {
			const newBlocks = c.flatMap((c) => c.contents);
			const brokenDownBlocks = newBlocks.map((v) => {
				return { kind: "block", type: v.type };
			});

			const newCategory: any = {
				...c,
				contents: brokenDownBlocks,
			};

			setBlocks([...blocks, ...newBlocks]);
			setCategories([...categories, newCategory]);

			defineBlocksWithJsonArray(blocks);

			primaryWorkspace.current = inject(blocklyDiv.current, {
				toolbox: {
					kind: "categoryToolbox",
					contents: categories,
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
				<div
					ref={blocklyDiv}
					style={{ position: "absolute" }}
					id="blocklyDiv"
				></div>
				<div ref={toolbox}></div>
			</Fragment>
		);
	};

	const declareBlocks = () => {};

	return { registerCategory, BlocklyWorkspace };
};
