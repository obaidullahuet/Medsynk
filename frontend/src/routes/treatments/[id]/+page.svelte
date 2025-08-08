<!-- <script lang="ts" >
	export let params;
	import { treatments } from '$lib/treatmentsData/treatments';
	import TreatmentInfo from '../../../components/dashboards/treatmentInfo.svelte';

	let treatmentId = params.id;
	let treatment = treatments.find((d) => d.id === treatmentId);
 

</script>


<TreatmentInfo {treatment} {treatements} /> -->

<!-- ParentComponent -->
<script lang="ts">
	export let params;
	import { treatments } from '$lib/treatmentsData/treatments';
	import TreatmentInfo from '../../../components/dashboards/treatmentInfo.svelte';

	let treatmentId = params.id;
	let treatment = treatments.find((d) => d.id === treatmentId);
	let treatmentTitles = treatments.map((t) => t.title);
	console.log(treatmentTitles )
	
</script>

<TreatmentInfo {treatment} treatmentTitles={treatments}/>
