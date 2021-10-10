<script lang="ts">
	import Button from '$lib/components/Button.svelte';
	import NumberedTextArea from '$lib/components/editor/NumberedTextArea.svelte';

	import { onMount, tick } from 'svelte';

	interface FileSystemHandle {
		kind: string;
		name: string;
		isSameEntry(hndl: FileSystemHandle): boolean;
		queryPermission(opts: { mode: 'read' | 'readwrite' }): PermissionState;
		requestPermission(opts: { mode: 'read' | 'readwrite' }): PermissionState;
	}
	interface FileSystemFileHandle extends FileSystemHandle {
		getFile(): Promise<File>;
		createWritable(): Promise<FileSystemWritableFileStream>;
	}
	interface FileSystemWritableFileStream extends WritableStream {
		write(data: BufferSource | Blob | string): Promise<undefined>;
		close(): Promise<void>;
	}
	interface DataTransferItemExt extends DataTransferItem {
		getAsFileSystemHandle(): Promise<FileSystemFileHandle>;
	}
	type Tab = {
		fileHandle: FileSystemFileHandle;
		text: string;
		name: string;
	};
	let tabs: Tab[] = [
		{
			fileHandle: null,
			text: '',
			name: 'Unnamed 1'
		}
	];
	let selected = 0;
	let newFileCount = 1;

	function dragOverHandler(ev: DragEvent) {
		ev.preventDefault();
		ev.dataTransfer.dropEffect = 'link';
	}
	async function dropHandler(ev: DragEvent) {
		ev.preventDefault();
		const dataTransfer = ev.dataTransfer;
		const items: DataTransferItemExt[] = [];
		for (let i = 0; i < dataTransfer.items.length; i++) {
			const item: DataTransferItemExt = <any>dataTransfer.items[i];
			if (item.kind === 'file') items.push(item);
		}
		const fileHandleArr = (
			await Promise.all(items.map((item) => item.getAsFileSystemHandle()))
		).filter((handle) => handle.kind === 'file');
		for (const fileHandle of fileHandleArr) {
			await openHandle(fileHandle);
		}
	}

	async function open() {
		let fileHandleArr: FileSystemFileHandle[] = await (<any>window)
			.showOpenFilePicker({
				multiple: true
			})
			.catch(() => []);
		for (const fileHandle of fileHandleArr) {
			await openHandle(fileHandle);
		}
	}
	async function openHandle(fileHandle: FileSystemFileHandle) {
		let file: File = await fileHandle.getFile();
		let text = await file.text();
		let name = file.name;
		tabs = [...tabs, { fileHandle, text, name }];
		selected = tabs.length - 1;
	}
	async function save(saveAs: boolean) {
		let fileHandle = tabs[selected].fileHandle;
		if (saveAs || !fileHandle) {
			fileHandle = await (<any>window).showSaveFilePicker();
			let file = await fileHandle.getFile();
			let name = file.name;
			tabs[selected] = {
				fileHandle,
				text: tabs[selected].text,
				name
			};
		}
		const writable = await fileHandle.createWritable();
		await writable.write(tabs[selected].text);
		await writable.close();
	}
	function newTab() {
		newFileCount++;
		tabs = [...tabs, { fileHandle: null, text: '', name: `Unnamed ${newFileCount}` }];
		selected = tabs.length - 1;
	}
	function removeTab(index: number) {
		tabs = tabs.filter((tab, i) => i !== index);
		selected = Math.min(0, tabs.length - 1);
		if (tabs.length == 0) {
			newTab();
		}
	}
</script>

<div class="p-12 h-screen w-full min-w-[500px] min-h-[500px] flex flex-col">
	<div class="pb-4">
		<Button onClick={() => newTab()}>New</Button>
		<Button onClick={() => open().catch()}>Open</Button>
		<Button onClick={() => save(false).catch()}>Save</Button>
		<Button onClick={() => save(true).catch()}>Save As</Button>
	</div>
	<div class="flex overflow-x-auto" id="tabs">
		{#each tabs as tab, i}
			<span
				class="inline-block whitespace-nowrap cursor-pointer border-2 px-3 py-1 border-black"
				on:click={() => (selected = i)}
				class:bg-blue-300={i == selected}
			>
				{tab.name}
				<span on:click={() => removeTab(i)}>&#x274C;</span>
			</span>
		{/each}
	</div>
	<div
		class="overflow-y-auto flex-grow "
		on:drop={(ev) => dropHandler(ev).catch()}
		on:dragover={dragOverHandler}
	>
		<NumberedTextArea bind:value={tabs[selected].text} />
	</div>
</div>

<style lang="postcss">
	#tabs::-webkit-scrollbar {
		@apply h-2;
	}
	#tabs::-webkit-scrollbar-thumb {
		@apply bg-gray-500;
	}
	#tabs::-webkit-scrollbar-thumb:hover {
		@apply bg-gray-700;
	}
</style>
