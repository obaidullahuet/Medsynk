export async function fetchDoctors() {
	const response = await fetch('http://localhost:8000/api/doctors'); //backend URL

	if (!response.ok) {
		throw new Error('Failed to fetch doctors');
	}

	const data = await response.json();
	return data;
}
