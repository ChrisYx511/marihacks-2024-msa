<script lang="ts">
	import type { PageData } from './$types';
	
	export let data: PageData;
</script>

<h1 class="text-6xl">{data.questions.length}</h1>
<div>if you see this ur gay</div>

<form method="POST">
	<label>
		something
		<input name="a" type="text">
	</label>
	<label>
		something else
		<input name="b" type="text">
	</label>
	<button>Submit</button>
</form>