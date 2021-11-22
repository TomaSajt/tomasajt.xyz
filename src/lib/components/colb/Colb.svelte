<script lang="ts">
	import { Executor, InstuctionDefinition } from './_colb';

	const executor = new Executor().AddInstructionDef(
		new InstuctionDefinition('add', [Number, Number], ([a, b]) => console.log(a + b))
	);
	executor.instructions = [
		{
			name: 'add',
			args: [1, 2]
		}
	];
</script>
