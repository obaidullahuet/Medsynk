<script>
	export let doctors;
	import { env } from '$env/dynamic/public';
    const BASE_URL = env.PUBLIC_API_BASE_URL || 'http://127.0.0.1:8000';
	// Doctor data
// const doctors = [
// 	{
// 		name: 'Dr. Nora Patel',
// 		specialty: 'Neurologist',
// 		image: 'https://images.unsplash.com/photo-1607746882042-944635dfe10e?w=100&h=100&fit=crop&crop=face'
// 	},
// 	{
// 		name: 'Dr. Ethan Nguyen',
// 		specialty: 'Orthopedic Surgeon',
// 		image: 'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=100&h=100&fit=crop&crop=face'
// 	},
// 	{
// 		name: 'Dr. Clara Fischer',
// 		specialty: 'Pediatrician',
// 		image: 'https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?w=100&h=100&fit=crop&crop=face'
// 	}
// ];

</script>

<div class="py-10">
	<h2 class="mb-6 text-2xl font-semibold text-gray-900">Meet our specialist</h2>

	<div class="grid grid-cols-1 gap-4 sm:grid-cols-3  ">
		{#each doctors as doctor}
			<div class="flex sm:flex-col items-center  gap-4 rounded-2xl bg-[#faf6f5]  p-4 sm:py-10   xl:py-16 ">
				<!-- Avatar -->
				<div class="h-15 w-15 lg:h-20 lg:w-20 xl:h-25 xl:w-25 flex-shrink-0 overflow-hidden rounded-xl bg-pink-100">
					<img
						src={`${BASE_URL}/${doctor.profilePhoto}`}
						alt={doctor.name}
						class="h-full w-full object-cover"
					/>
				</div>

				<!-- Info -->
				<div class="flex flex-col">
					<h3 class="text-sm lg:text-xl font-semibold text-gray-900">{doctor.name}</h3>
					<p class="text-xs lg:text-lg text-gray-600">{doctor.specialty}</p>
				</div>
			</div>
		{/each}
	</div>
</div>


<style>
</style>
