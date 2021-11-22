<script lang="ts">
	let inputDays: InputTTDay[] = [
		{
			name: 'Monday',
			events: [
				{
					name: 'English',
					start: '00:30'
				},
				{
					name: 'Maths',
					start: '08:00'
				}
			]
		}
	];
	$: days = updateDays(inputDays);
	const minuteToPixel = 2;
	type InputTTDay = {
		name: string;
		events: InputTTEvent[];
	};
	type InputTTEvent = {
		name: string;
		start: string;
		end?: string;
	};
	type TTDay = {
		name: string;
		events: TTEvent[];
	};
	type TTEvent = {
		name: string;
		start: number;
		end: number;
	};

	function updateDays(inputDays: InputTTDay[]): TTDay[] {
		return inputDays.map(parseIDay);
	}
	function parseIDay(iday: InputTTDay): TTDay | undefined {
		let day: TTDay = {
			name: iday.name,
			events: []
		};
		for (const event of iday.events) {
			let newEvent: TTEvent = {
				name: event.name,
				start: dateStringToMinutes(event.start) ?? 0,
				end: dateStringToMinutes(event.end)
			};
			if (!newEvent.end) newEvent.end = Math.min(newEvent.start + 60, 24 * 60 - 1);
			if (newEvent.start > newEvent.end) continue;
			day.events.push(newEvent);
		}
		return day;
	}
	function stringToColour(str: string): string {
		var hash = 0;
		for (var i = 0; i < str.length; i++) {
			hash = str.charCodeAt(i) + ((hash << 5) - hash);
		}
		var colour = '#';
		for (var i = 0; i < 3; i++) {
			var value = (hash >> (i * 8)) & 0xff;
			colour += ('00' + value.toString(16)).substr(-2);
		}
		return colour;
	}
	function dateStringToMinutes(dateStr: string): number | null {
		const timeRegex = /^([01]\d|2[0-3]):?([0-5]\d)$/g;
		if (!timeRegex.test(dateStr)) return null;
		let hours = parseInt(dateStr.substr(0, 2));
		let mins = parseInt(dateStr.substr(-2));
		return hours * 60 + mins;
	}
</script>

<div class="grid grid-cols-5 p-4">
	{#each days as day}
		<div>
			<h2 class="p-4 text-center text-lg">{day.name}</h2>
			<div class="relative h-[1000px] bg-gray-400">
				{#each day.events as event}
					<div
						class="absolute left-0 right-0"
						style="
						background-color: {stringToColour(event.name)};
						top: {(event.start * 100) / (24 * 60)}%;
						height: {((event.end - event.start) * 100) / (24 * 60)}%;
						"
					>
						<h3 class="text-center">{event.name} {event.start} {event.end}</h3>
					</div>
				{/each}
			</div>
		</div>
	{/each}
</div>

<style lang="postcss">
</style>
